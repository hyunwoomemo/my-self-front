import IntroContainer from "@/components/meeting/intro/IntroContainer";

const IntroData = {
  category1: "취미",
  category2: "반려동물",
  title: "고양이 집사 모여라!",
  host_nick: "미미짱",
  host_level: "우수 회원",
  like: 7,
  member_current: 3,
  member_max: 7,
  restriction: ["여자만", "블랙제한"],
  location: "강남구",
  date: "2024년 10월 24일",
  time: "오후 7시 30분",
  desc: "😻고양이 관련 대화나누고, 팁 공유하고 싶어요. 예비 집사도 환영합니다! ###가입 조건## 대상 : 냥집사, 예비 냥집 나이 : 무 탈퇴 및 강퇴 시 재 입장 불가 ❌❌ 운영규칙 필독!!! ⭐",
};

export default function Page() {
  return <IntroContainer data={IntroData} />;
}
