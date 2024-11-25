import ChatContainer from "@/components/meeting/chat/ChatContainer";

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
