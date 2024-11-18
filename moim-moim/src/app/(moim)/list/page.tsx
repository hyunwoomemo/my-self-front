import MeetingListContainer from "@/components/home/MeetingListContainer";
import { getCookie } from "@/utils/cookie";
import { redirect } from "next/navigation";

export default async function Page() {
  const token = await getCookie("accessToken");

  if (token) {
    return <MeetingListContainer />;
  } else {
    redirect("/login");
  }
}
