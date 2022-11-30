function Avatar({ url, className, userData }) {
  return (
    <div className="flex-1 flex flex-col items-center">
      <div>
        <img src={url} className={className} />
      </div>
      <h1 className="mt-3 font-bold text-xl">{userData && userData}</h1>
    </div>
  );
}
export default Avatar;
