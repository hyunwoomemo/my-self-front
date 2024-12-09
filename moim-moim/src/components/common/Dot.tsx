interface DotProps {
  color?: string;
}

const Dot = ({ color }: DotProps) => {
  return <div className={`font-thin ${color ? `text-[${color}]` : "text-text"}`}>·</div>;
};

export default Dot;
