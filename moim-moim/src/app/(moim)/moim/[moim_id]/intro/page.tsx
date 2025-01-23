import IntroContainer from "@/components/meeting/intro/IntroContainer";

const Intro = async ({ params }: { params: { moim_id: string } }) => {
  const { moim_id } = await params;
  return <IntroContainer id={moim_id} />;
};
export default Intro;
