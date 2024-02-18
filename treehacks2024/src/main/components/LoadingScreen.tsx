const Loading = () => {
  return (
    <div>
      <LoadingScreen
        height="450px"
        background="black"
        // NOTE: Using GIFs for the background looks super cool :)
        imgUrl="https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExb3NreWdyOWo1ZDR6eWx5em9ubDYxZnF1anNhMGNvcTA5eTg3bDc2cSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/QZybSuE93shkzkMaTc/giphy.gif"
      />
    </div>
  );
};

const LoadingScreen = ({
  height,
  background,
  imgUrl,
}: {
  height: string;
  background: string;
  imgUrl: string;
}) => {
  return (
    <div className="relative" style={{ height }}>
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${imgUrl})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      />
      <div
        style={{ background }}
        className="absolute inset-0 animate-pulse z-10"
      />
      <span
        className="font-black absolute inset-0 z-20 text-center bg-clip-text text-transparent pointer-events-none"
        style={{
          backgroundImage: `url(${imgUrl})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          fontSize: "clamp(3rem, 12vw, 10rem)",
          lineHeight: height,
        }}
      >
        Loading...
      </span>
    </div>
  );
};

export default Loading;
