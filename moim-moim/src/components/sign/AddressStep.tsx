const EmailStep = ({
  formData,
  setFormData,
  nextStep,
}: {
  formData: { addresses: [] };
  setFormData: any;
  nextStep: () => void;
}) => {
  console.log("formData", formData);
  return (
    <>
      <img src="/account/mingcute_location-line.png" />
      <h1 className="text-2xl font-bold">
        자주 방문하는 지역을 선택하면
        <br />
        가까운 사람들과 연결돼요.
      </h1>
      <button onClick={nextStep}>회원가입</button>
    </>
  );
};

export default EmailStep;
