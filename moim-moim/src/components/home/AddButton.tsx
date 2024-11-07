import { LuPlus } from "react-icons/lu";

type CreateButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

const CreateButton = ({ ...rest }: CreateButtonProps) => {
  return (
    <button
      className="flex h-20 w-20 items-center justify-center rounded-full bg-primary text-5xl text-white"
      {...rest}
    >
      <LuPlus />
    </button>
  );
};

export default CreateButton;
