"use server";
import { Webhook } from "svix";
import { headers } from "next/headers";
import { WebhookEvent, clerkClient } from "@clerk/nextjs/server";
import User from "@/lib/models/userModel";
import connectToDb from "@/lib/mongoDB/connectToDb";
import { updateUser } from "@/lib/actions/user.actions";
import { NextResponse } from "next/server";

export async function POST(req) {
  // You can find this in the Clerk Dashboard -> Webhooks -> choose the webhook
  const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    throw new Error(
      "Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local",
    );
  }

  // Get the headershttps://courses.codex.fosspage.com/
  const headerPayload = headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response("Error occurred -- no svix headers", {
      status: 400,
    });
  }

  // Get the body
  const payload = await req.json();
  const body = JSON.stringify(payload);

  // Create a new Svix instance with your secret.
  const wh = new Webhook(WEBHOOK_SECRET);

  let evt;

  // Verify the payload with the headers
  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    });
  } catch (err) {
    console.error("Error verifying webhook:", err);
    return new Response("Error occured", {
      status: 400,
    });
  }

  // Get the ID and type
  const { id } = evt.data;
  const eventType = evt.type;

  // Create user in mongodb  wiht User model

  if (eventType === "user.created") {
    const { id, email_addresses, image_url, firstName, lastName, username } =
      evt.data;

    const user = {
      id,
      name: firstName + " " + lastName,
      email: email_addresses[0].email_address,
      image: image_url,
    };
    console.log(user);
    await connectToDb();

    const NewUser = await User.create(user);

    if (NewUser) {
      await clerkClient.users.updateUserMetadata(id, {
        publicMetadata: {
          userId: NewUser._id,
        },
      });
      console.log("User created in MongoDB");
    }
    return NextResponse.json({
      message: "User created",
      status: 200,
      user: NewUser,
    });
  }

  console.log(`Webhook with and ID of ${id} and type of ${eventType}`);
  console.log("Webhook body:", body);

  return new Response("This webhook worked successfully ", { status: 200 });
}
