const VideoPlayer = ({ videoUrl }) => {
  return (
    <div className="flex flex-col gap-3 p-5">
      <h2 className="text-gray-400 mb-3">Course Preview</h2>

      <video className="w-full" controls controlsList="nodownload">
        <source src={videoUrl} type="video/mp4" />
      </video>
    </div>
  );
};

export default VideoPlayer;
