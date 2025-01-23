import Image from "next/image";

export const Loader = () => {
  return (
    <div className="fixed left-0 top-0 h-full w-full bg-transparent">
      <div className="absolute left-1/2 top-1/2 mx-auto -translate-x-1/2 -translate-y-1/2 bg-transparent">
        <Image src="/loading.gif" priority width={80} height={80} alt="loading..." />
      </div>
    </div>
  );
};

export const PageLoader = () => {
  return (
    <div className="absolute left-0 top-0 h-screen w-full bg-transparent">
      <div className="absolute left-1/2 top-1/2 mx-auto -translate-x-1/2 -translate-y-1/2 bg-transparent">
        <Image src="/page_loading.gif" priority width={200} height={200} alt="loading..." />
      </div>
    </div>
  );
};
