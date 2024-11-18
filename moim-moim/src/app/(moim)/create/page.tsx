import PageHeader from "@/components/common/PageHeader";
import Category from "@/components/meeting/create/Category";

export default async function Page() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/moim/category`);
  const categories = await res.json();

  return (
    <>
      <PageHeader title="모임 만들기" />
      <Category dataCategory1={categories.DATA.category1} dataCategory2={categories.DATA.category2} />
    </>
  );
}
