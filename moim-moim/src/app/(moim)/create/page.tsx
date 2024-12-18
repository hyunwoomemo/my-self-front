import { Loader } from "@/components/common/Loader";
import PageHeader from "@/components/common/PageHeader";
import Category from "@/components/meeting/create/Category";
import { cookies } from "next/headers";

export default async function Page() {
  const token = (await cookies()).get("accessToken"); //서버 컴포넌트에서 토큰 불러오기
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/moim/category`, {
    headers: {
      authorization: `Bearer ${token?.value}`,
    },
  });
  const categories = await res.json();
  if (!categories) {
    return <Loader />;
  }
  return (
    <>
      <PageHeader title="모임 만들기" hr />
      <Category dataCategory1={categories.data.category1} dataCategory2={categories.data.category2} />
    </>
  );
}
