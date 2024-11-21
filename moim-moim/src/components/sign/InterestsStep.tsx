import { accountApi } from "@/app/api";
import { useEffect, useState } from "react";
interface Interests {
  id: number;
  interest: string;
  icon?: string;
}
const InterestsStep = ({
  formData,
  setFormData,
  nextStep,
}: {
  formData: { interests: [] };
  setFormData: any;
  nextStep: () => void;
}) => {
  const [interestsList, setInterestsList] = useState<Interests[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const [selectedInterests, setSelectedInterests] = useState<number[]>([]); // 선택된 관심사

  useEffect(() => {
    const fetchInterests = async () => {
      try {
        const { data } = await accountApi.interests();
        setInterestsList(data.data);
      } finally {
        setIsLoading(false);
      }
    };
    fetchInterests();
  }, []);

  const handleInterestClick = (id: number) => {
    if (selectedInterests.length >= 3 && !selectedInterests.includes(id)) {
      alert("3개까지만 가능합니다.");
      return;
    }
    setSelectedInterests((prev) => {
      if (prev.includes(id)) {
        return prev.filter((interestId) => interestId !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  const handleNextStep = (e) => {
    setFormData((prev: any) => {
      return { ...prev, interests: selectedInterests };
    });
    console.log("setFormData", formData);
    nextStep(e);
  };
  return (
    <form className="sign-form">
      <h1>
        관심사를 선택하면
        <br /> 나와 취향이 맞는 사람들을 만나요.
      </h1>
      <span>3개까지 중복 선택 가능해요.</span>
      <ul>
        {isLoading && <div>Loading...</div>}
        {interestsList.map((interest: any) => (
          <li
            key={interest.id}
            onClick={() => handleInterestClick(interest.id)}
            style={{
              border: selectedInterests.includes(interest.id) ? "2px solid #007BFF" : "1px solid #066d6a", // 선택된 항목에 테두리 추가
              cursor: "pointer",
              padding: "8px",
              marginBottom: "8px",
              borderRadius: "8px",
            }}
          >
            <span>{interest.icon}</span>
            {interest.interest}
          </li>
        ))}
      </ul>
      <button onClick={handleNextStep}>다음</button>
    </form>
  );
};

export default InterestsStep;
