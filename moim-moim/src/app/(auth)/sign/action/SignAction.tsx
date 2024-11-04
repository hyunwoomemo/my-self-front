import { FormData } from "../types"; // FormData 타입을 import

export async function signUpWithProvider(data: FormData) {
  try {
    // API 호출로 회원가입 처리
    console.log("회원가입 데이터:", data);

    // 예시: API 호출 코드 (axios, fetch 등 사용 가능)
    // const response = await axios.post('/api/auth/signup', data);

    // 회원가입 성공 시 처리 로직
    console.log("회원가입 성공");
  } catch (error) {
    console.error("회원가입 실패:", error);
  }
}
