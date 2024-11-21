const EmailStep = ({ nextStep }: { nextStep: () => void }) => {
    return (
      <div>
        <h1>주소</h1>
        <button onClick={nextStep}>회원가입</button>
      </div>
    );
  };
  
  export default EmailStep;
  