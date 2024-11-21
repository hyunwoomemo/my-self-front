const EmailStep = ({ nextStep }: { nextStep: () => void }) => {
    return (
      <div>
        <h1>개인정보</h1>
        <button onClick={nextStep}>다음 단계</button>
      </div>
    );
  };
  
  export default EmailStep;
  