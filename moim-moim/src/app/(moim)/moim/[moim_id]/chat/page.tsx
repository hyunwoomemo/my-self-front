import { getUserInfo } from "@/actions/user/getUserInfo";
import { accountApi } from "@/app/api";
import ChatContainer from "@/components/meeting/chat/ChatContainer";
import InputBar from "@/components/meeting/chat/InputBar";

const Chat = async ({ params }: { params: { moim_id: string } }) => {
  const { moim_id } = await params;
  // const userInfo = await getUserInfo();
  // console.log("🔔🔔🔔", userInfo);

  return (
    <div className="flex h-screen flex-col">
      <ChatContainer id={moim_id} />
    </div>
  );
};

export default Chat;
