import { useState } from "react";
import Button from "../common/Button";
import Input from "../common/Input";
import { accountApi } from "@/app/api";

const InfoStep = ({
  formData,
  setFormData,
  isSocial,
  nextStep,
}: {
  formData: {
    email: string;
    password: string;
    passwordCheck: string;
    nickname: string;
    birthdate: string;
    gender: string;
  };
  isSocial: any;
  setFormData: any;
  nextStep: () => void;
}) => {
  const [validationState, setValidationState] = useState({
    nickname: {
      valid: true,
      msg: "",
    },
    password: {
      valid: true,
      msg: "",
    },
    passwordCheck: {
      valid: true,
      msg: "",
    },
    birthdate: {
      valid: true,
      msg: "",
    },
    gender: {
      valid: true,
      msg: "",
    },
  });

  // 유효성 검사 함수
  const handleValidate = (name: string, value: string) => {
    if (isSocial && (name == "password" || name === "passwordCheck")) return { valid: true, msg: "" };
    switch (name) {
      case "nickname":
        const regexNickName = /^[a-zA-Z0-9가-힣]{2,}$/;
        return {
          valid: regexNickName.test(value),
          msg: "한글/영문/숫자 혼합 2자 이상",
        };
      case "password":
        const regexPassword = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
        return {
          valid: regexPassword.test(value),
          msg: "영문/숫자/특수문자 혼합 8자 이상",
        };
      case "passwordCheck":
        return {
          valid: formData.password === value,
          msg: "패스워드가 일치하지 않습니다.",
        };
      case "birthdate":
        const regexBirthDate = /^\d{6}$/;
        return {
          valid: regexBirthDate.test(value),
          msg: "생년월일은 YYMMDD 형식의 6자리 숫자여야 합니다.",
        };

      case "gender":
        const regexGenders = /^[1-4]{1}$/;
        return {
          valid: regexGenders.test(value),
          msg: "성별은 1,3(남성) 또는 2,4(여성) 중 하나여야 합니다.",
        };
      default:
        return { valid: true, msg: "" }; // 기본값
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // 유효성 검사
    const { valid, msg } = handleValidate(name, value);
    setValidationState((prev) => ({
      ...prev,
      [name]: { valid: valid, msg: msg },
    }));
  };

  const handleNextStep = async (e) => {
    e.preventDefault();
    try {
      const { statusCode } = await accountApi.confirmNickname(formData.nickname);
      if (statusCode !== 200) return;
      // 유효성 검사
      let isInvalid = false;
      for (const key in validationState) {
        if (!validationState[key].valid) {
          isInvalid = true;
        }
      }
      // 유효성 검사 결과 처리
      if (!isInvalid) {
        nextStep();
      } else {
        alert("유효성검사 실패");
      }
    } catch (error) {
      setValidationState((prev) => ({
        ...prev,
        nickname: { valid: false, msg: error.message },
      }));
    }
  };

  return (
    <>
      <img src="/account/iconamoon_edit-bold.png" />
      <h1 className="text-2xl font-bold">
        혼자보다 함께!
        <br />
        회원가입 후 모임을 찾아봐요.
      </h1>
      <form className="mt-10 flex h-[calc(100vh-24rem)] flex-col gap-5 scroll-smooth">
        <div>
          <Input type="email" label="이메일 주소" disabled value={formData.email} />
        </div>
        <div>
          <Input
            type="text"
            label="닉네임"
            name="nickname"
            value={formData.nickname}
            placeholder="한글/영문/숫자 혼합 2자 이상"
            error={!validationState.nickname.valid}
            errorText={validationState.nickname.msg}
            onChange={handleChange}
          />
        </div>
        {!isSocial && (
          <>
            <div>
              <Input
                type="password"
                name="password"
                label="비밀번호"
                placeholder="영문/숫자/특수문자 혼합 8자 이상"
                error={!validationState.password.valid}
                errorText={validationState.password.msg}
                onChange={handleChange}
              />
            </div>
            <div>
              <Input
                type="password"
                name="passwordCheck"
                label="비밀번호 확인"
                placeholder="영문/숫자/특수문자 혼합 8자 이상"
                onChange={handleChange}
                error={!validationState.passwordCheck.valid}
                errorText={validationState.passwordCheck.msg}
              />
            </div>
          </>
        )}
        <div className="flex flex-1 flex-col gap-2">
          <span className="text-lg font-bold">생년월일</span>
          {/* style로 되어있는 부분들 모두 tailwinds로 수정바람(참고: 위 className) */}
          <div className="flex items-center gap-2">
            <Input
              type="text"
              name="birthdate"
              value={formData.birthdate}
              maxLength={6}
              onChange={handleChange}
              style={{ letterSpacing: "0.7rem" }}
              disabled={isSocial}
              error={!validationState.birthdate.valid}
              errorText={validationState.birthdate.msg}
            />
            <span style={{ alignContent: "center" }}>-</span>
            <Input
              type="text"
              name="gender"
              maxLength={1}
              onChange={handleChange}
              error={!validationState.gender.valid}
              errorText={validationState.gender.msg}
            />
            <span className="text-lg tracking-[1rem]">******</span>
          </div>
        </div>
        <Button custom="full" title="다음" onClick={handleNextStep}></Button>
      </form>
    </>
  );
};

export default InfoStep;
