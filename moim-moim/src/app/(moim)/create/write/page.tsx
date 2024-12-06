import PageHeader from "@/components/common/PageHeader";
import CreateContainer from "@/components/meeting/create/CreateContainer";

export default async function Page() {
  return (
    <>
      <PageHeader title="모임 만들기" hr />
      <CreateContainer />
    </>
  );
}
