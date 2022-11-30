function TimeWarning({ onClick }) {
  return (
    <div
      className="fixed top-0 bottom-0 left-0 right-0 bg-black/90 -z-100 flex flex-col justify-center items-center px-3"
      onClick={onClick}
    >
      <div className=" w-56">
        <img
          alt="gif"
          src="https://res.cloudinary.com/dhhkjmfze/image/upload/v1669695129/menhera-sleeping_bcnwoc.gif"
          className=" object-cover"
        />
      </div>
      <div className="flex flex-col items-center ">
        <h1 className=" text-white mt-5 text-2xl font-semibold font-mono text-center">
          Bạn đã truy cập Website liên tục hơn 180 phút. Hãy nghỉ ngơi để bảo vệ
          sức khỏe!
        </h1>
        <div className="flex">
          <h1 className="mx-2 px-4 py-1 bg-red-500 inline-block mt-5 text-white font-semibold rounded hover:cursor-pointer hover:bg-red-600">
            Biết rồi
          </h1>
        </div>
      </div>
    </div>
  );
}
export default TimeWarning;
