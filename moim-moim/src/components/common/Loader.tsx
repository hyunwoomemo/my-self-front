import Image from "next/image";

const Loader = () => {
  return (
    <div className="absolute left-1/2 top-1/2 mx-auto -translate-x-1/2 -translate-y-1/2 bg-transparent">
      {/* <div className="loader my-15 relative left-[-100px] block h-3 w-3 animate-shadowRolling rounded-full"></div> */}
      <Image src="/loading.gif" width={80} height={80} alt="loading..." />
    </div>
  );
};

export default Loader;
