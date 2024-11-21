import Contents from "@/components/meeting/chat/Contents";
import InputBar from "@/components/meeting/chat/InputBar";
import { useSocket } from "@/hooks/useSocket";

const Chat = async ({ params }: { params: { moim_id: string } }) => {
  const { moim_id } = await params;

  console.log("sdf");

  return (
    <>
      <div>{moim_id} 채팅방 입장!!!!</div>
      <Contents id={moim_id} />
      <InputBar id={moim_id} />
    </>
  );
};

export default Chat;
