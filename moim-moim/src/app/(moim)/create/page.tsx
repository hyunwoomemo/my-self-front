import { getToken } from "@/actions/user/getToekn";
import { Loader } from "@/components/common/Loader";
import PageHeader from "@/components/common/PageHeader";
import Category from "@/components/meeting/create/Category";

export default async function Page() {
  try {
    const token = await getToken();
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/moim/category`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });

    console.log("🚀", res);
    if (!res.ok) {
      throw Error("에러남", res.status);
    }

    const categories = await res.json();
    return (
      <>
        <PageHeader title="모임 만들기" hr />
        <Category dataCategory1={categories.data.category1} dataCategory2={categories.data.category2} />
      </>
    );
  } catch (err) {
    console.error("오류남", err);
    return <Loader />;
  }
}
