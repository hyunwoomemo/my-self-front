interface DotProps {
  color: string;
}

const Dot = ({ color }: DotProps) => {
  return <div className={`font-thin text-[${color}]`}>·</div>;
};

export default Dot;
