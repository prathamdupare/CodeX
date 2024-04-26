"use server";

import Stripe from "stripe";
import { NextResponse, NextRequest } from "next/server";
import { enrollCourse, publishCourse } from "@/app/services";
import { redirect } from "next/navigation";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
export async function POST(req) {
  const payload = await req.text();
  const res = JSON.parse(payload);

  const sig = req.headers.get("Stripe-Signature");

  const dateTime = new Date(res?.created * 1000).toLocaleDateString();
  const timeString = new Date(res?.created * 1000).toLocaleDateString();

  try {
    let event = stripe.webhooks.constructEvent(
      payload,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET,
    );

    console.log("Event", event?.type);
    // charge.succeeded
    // payment_intent.succeeded
    // payment_intent.created

    console.log(
      res?.data?.object?.billing_details?.email, // email
    );

    console.log("====Payment successfull====");
    console.log(
      "User Email",
      res?.data?.object?.billing_details?.email, // email
    );

    /*
    {

     try {
      await enrollCourse(
        "clvfhvuug0kzq07pkoecnrfto",
        res?.data?.object?.billing_details?.email || "",
      ).then(async (resp) => {
        console.log("Enroll response : ", resp);
        if (resp) {
          await publishCourse(resp?.createUserEnrollSchema?.id).then(
            (result) => {
              console.log(result);
            },
          );
        }
      });
    } catch (error) {
      console.log("Error", error);
    }

    }

*/
    return NextResponse.json({
      status: "sucess",
      event: event.type,
      response: res,
    });
  } catch (error) {
    return NextResponse.json({ status: "Failed", error });
  }
}
