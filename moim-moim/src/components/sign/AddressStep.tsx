const EmailStep = ({
  formData,
  setFormData,
  nextStep,
}: {
  formData: { addresses: [] };
  setFormData: any;
  nextStep: () => void;
}) => {

    console.log('formData', formData);
  return (
    <div>
      <h1>주소</h1>
      <button onClick={nextStep}>회원가입</button>
    </div>
  );
};

export default EmailStep;
