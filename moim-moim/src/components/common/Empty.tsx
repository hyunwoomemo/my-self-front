import { IoChatbubbleEllipsesOutline } from "react-icons/io5";

const Empty = ({ text }: { text: string }) => {
  return (
    <div className="flex h-full flex-1 flex-col items-center justify-center gap-4 py-16">
      <IoChatbubbleEllipsesOutline className="text-5xl text-textGray" />
      <span className="whitespace-pre-line text-center">{text}</span>
    </div>
  );
};

export default Empty;
