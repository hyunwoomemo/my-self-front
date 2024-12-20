import { getUserInfo } from "@/actions/user/getUserInfo";
import ChatContainer from "@/components/meeting/chat/ChatContainer";

const Chat = async ({ params }: { params: { moim_id: string } }) => {
  const { moim_id } = await params;
  const userInfo = await getUserInfo();

  return (
    <div className="flex h-screen flex-col">
      <ChatContainer id={Number(moim_id)} userInfo={userInfo?.data} />
    </div>
  );
};

export default Chat;
