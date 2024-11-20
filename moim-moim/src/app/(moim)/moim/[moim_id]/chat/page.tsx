// import { useEffect } from "react";

const Chat = async ({ params }: { params: { moim_id: string } }) => {
  const { moim_id } = await params;

  // useEffect(() => {});
  return (
    <>
      <div>{moim_id} 채팅방 입장!!!!</div>
    </>
  );
};

export default Chat;
