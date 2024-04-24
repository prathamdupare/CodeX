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
          width="1000"
          height="250"
          controls
          controlsList="nodownload"
          key={activeChapter?.video?.url} // Ensure key is unique
        >
          <source src={activeChapter?.video?.url} type="video/mp4" />
        </video>
      </div>
      <div>
        <h2>{activeChapter?.name}</h2>
      </div>
    </>
  );
};

export default FullVideoPlayer;
