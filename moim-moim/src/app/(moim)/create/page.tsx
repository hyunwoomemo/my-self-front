import Loader from "@/components/common/Loader";
import PageHeader from "@/components/common/PageHeader";
import Category from "@/components/meeting/create/Category";
import CreateContainer from "@/components/meeting/create/CreateContainer";

export default async function Page() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/moim/category`);
  const categories = await res.json();

  console.log("category", categories.DATA.category2);
  if (!categories) {
    return <Loader />;
  }

  return (
    <>
      <PageHeader title="모임 만들기" />
      <Category />
    </>
  );
}
