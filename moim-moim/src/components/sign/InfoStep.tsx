import Button from "../common/Button";
import Input from "../common/Input";

const InfoStep = ({
  formData,
  setFormData,
  nextStep,
}: {
  formData: {
    email: string;
    password: string;
    confirmPassword: string;
    nickName: string;
    birthDate: string;
    gender: string;
  };
  setFormData: any;
  nextStep: () => void;
}) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log('name, value', name, value)
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  
  return (
    <form className="sign-form">
      <h1>
        혼자보다 함께!
        <br />
        회원가입 후 모임을 찾아봐요.
      </h1>
      <div>
        <Input type="email" label="이메일 주소" disabled value={formData.email} />
      </div>
      <div>
        <Input
          type="text"
          label="닉네임"
          name="nickName"
          placeholder="한글/영문/숫자 혼합 2자 이상"
          error
          errorText="사용 중인 닉네임입니다."
          onChange={handleChange}
        />
      </div>
      <div>
        <Input
          type="password"
          name="password"
          label="비밀번호"
          placeholder="영문/숫자/특수문자 혼합 8자 이상"
          error
          errorText="패스워드 형식이 맞지않습니다."
          onChange={handleChange}
        />
      </div>
      <div>
        <Input
          type="password"
          name="confirmPassword"
          label="비밀번호 확인"
          placeholder="영문/숫자/특수문자 혼합 8자 이상"
          onChange={handleChange}
          error
          errorText="비밀번호가 일치하지 않습니다."
        />
      </div>
      <div style={{ display: "flex", marginTop: "25px", paddingLeft: "10px", paddingRight: "10px" }}>
        <Input type="text" label="생년월일" name="birthDate" maxLength={6} onChange={handleChange} />
        <span style={{ alignContent: "center" }}>-</span>
        <Input type="text" name="gender" maxLength={1} onChange={handleChange} />
        ******
      </div>
      <Button type="button" custom="full" title="다음" onClick={nextStep}></Button>
    </form>
  );
};

export default InfoStep;
