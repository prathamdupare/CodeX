import React, { useEffect } from "react";

const FullVideoPlayer = ({ activeChapter }) => {
  useEffect(() => {
    console.log("Active chapter changed:", activeChapter);
  }, [activeChapter]); // Re-run effect whenever activeChapter changes

  return (
    <>
      <div className="w-full mx-2 rounded border">
        <video
          className="w-full"
          controls
          controlsList="nodownload"
          key={activeChapter?.video?.url} // Ensure key is unique
        >
          <source src={activeChapter?.video?.url} type="video/mp4" />
        </video>
      </div>
      <div>
        <h2 className="p-4 font-bold text-lg">{activeChapter?.name}</h2>
      </div>
    </>
  );
};

export default FullVideoPlayer;
