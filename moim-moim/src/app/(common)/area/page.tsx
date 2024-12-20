import { Loader } from "@/components/common/Loader";
import { Container } from "./Container";
import { getUserInfo } from "@/actions/user/getUserInfo";

export default async function Page() {
  const myInfo = await getUserInfo();

  if (!myInfo) return <Loader />;
  return <Container myInfo={myInfo?.data} />;
}
