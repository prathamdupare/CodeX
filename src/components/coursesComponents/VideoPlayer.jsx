const VideoPlayer = ({ videoUrl }) => {
  return (
    <div className="flex flex-col gap-3 md:px-5">
      <video className="h-screen-1/2" controls controlsList="nodownload">
        <source src={videoUrl} type="video/mp4" />
      </video>
    </div>
  );
};

export default VideoPlayer;
