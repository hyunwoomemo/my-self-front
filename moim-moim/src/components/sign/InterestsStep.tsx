import { useEffect, useState } from "react";
import Button from "../common/Button";
import { accountApi } from "@/app/nextApi";
interface Interests {
  id: number;
  interest: string;
  icon?: string;
}
const InterestsStep = ({ setFormData, nextStep }: { setFormData: any; nextStep: () => void }) => {
  const [interestsList, setInterestsList] = useState<Interests[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const [selectedInterests, setSelectedInterests] = useState<number[]>([]); // 선택된 관심사

  useEffect(() => {
    const fetchInterests = async () => {
      try {
        const { data } = await accountApi.interests();
        setInterestsList(data);
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
    e.preventDefault();
    if (selectedInterests.length > 0) {
      setFormData((prev: any) => {
        return { ...prev, interests: selectedInterests };
      });
      nextStep();
    } else {
      alert("최소1개는 선택해야합니다.");
    }
  };
  return (
    <>
      <img src="/account/mynaui_star-solid.png" />
      <h1 className="mt-2 text-2xl font-bold">
        관심사를 선택하면
        <br /> 나와 취향이 맞는 사람들을 만나요.
      </h1>
      <span>3개까지 중복 선택 가능해요.</span>
      <form className="mt-10 flex h-[calc(100vh-24rem)] flex-col gap-5">
        <div className="flex-1">
          <ul className="flex flex-col items-center justify-center gap-3">
            {isLoading && <div>Loading...</div>}
            {interestsList.map((interest: any) => (
              <li
                key={interest.id}
                onClick={() => handleInterestClick(interest.id)}
                className={`w-full cursor-pointer rounded-lg border border-solid border-border p-2 ${selectedInterests.includes(interest.id) ? "bg-semiPrimary" : ""}`}
              >
                <span className="text-center text-lg">{interest.interest}</span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <Button type="button" custom="full" title="다음" onClick={handleNextStep}></Button>
        </div>
      </form>
    </>
  );
};

export default InterestsStep;
