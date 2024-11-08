const Loader = () => {
  return (
    <div className="fixed left-0 top-0 h-full w-full">
      <div className="absolute left-1/2 top-1/2 mx-auto -translate-x-1/2 -translate-y-1/2">
        {/* <div className="loader my-15 relative left-[-100px] block h-3 w-3 animate-shadowRolling rounded-full"></div> */}
        <div>Loading...</div>
      </div>
    </div>
  );
};

export default Loader;
