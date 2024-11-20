import { redirect } from "next/navigation";

export default async function Page({ params }: { params: { moim_id: string } }) {
  const { moim_id } = await params;

  const entered = false;

  // console.log(params);
  // if (!entered) {
  //   redirect(`/moim/${moim_id}/chat`);
  // } else {
  //   redirect(`/moim/${moim_id}`);
  // }

  return <></>;
}
