const Loader = () => {
  return (
    <div className="absolute left-0 top-0 h-full w-full">
      <div className="absolute left-1/2 top-1/2 mx-auto -translate-x-1/2 -translate-y-1/2">
        <div className="loader animate-shadowRolling my-15 relative left-[-100px] block h-3 w-3 rounded-full"></div>
      </div>
    </div>
  );
};

export default Loader;
