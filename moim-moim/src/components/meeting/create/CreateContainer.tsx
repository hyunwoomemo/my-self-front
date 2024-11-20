"use client";

import Button from "@/components/common/Button";
import Input from "@/components/common/Input";
import Loader from "@/components/common/Loader";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { CiCalendar, CiTimer } from "react-icons/ci";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import { PiUsersLight } from "react-icons/pi";
import Checkbox from "@/components/common/Checkbox";
import { ko } from "date-fns/locale";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import Textarea from "@/components/common/Textarea";
import { useAtomValue } from "jotai";
import { selectedCategoryAtom } from "@/store/meeting/category/atom";
import Region, { Address } from "@/components/common/Region";
import { useSocket } from "@/hooks/useSocket";

interface Values {
  category1: string | undefined;
  category2: string | undefined;
  title: string;
  date: string;
  time: string;
  members: string;
  nolimitMembers: boolean;
  details: string;
  conditions: {
    onlyMan: boolean;
    onlyWoman: boolean;
    withoutBlack: boolean;
  };
}

const CreateContainer = () => {
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const [address, setAddress] = useState<Address[]>([]); // 검색한 지역 목록들
  const [selectedArea, setSelectedArea] = useState<string>(""); // 선택한 지역
  const [addressKeyword, setAddressKeyword] = useState<string>(""); // 입력한 키워드

  const selectedCategory = useAtomValue(selectedCategoryAtom);
  const [values, setValues] = useState<Values>({
    category1: selectedCategory?.c1_name,
    category2: selectedCategory?.c2_name,
    title: "",
    date: "",
    time: "",
    members: "",
    nolimitMembers: false,
    details: "",
    conditions: {
      onlyMan: false,
      onlyWoman: false,
      withoutBlack: true,
    },
  });
  const [errorMsg, setErrorMsg] = useState({
    title: "",
    details: "",
  });
  const { generateMeeting } = useSocket();

  useEffect(() => {
    window.addEventListener("click", () => {
      setAddress([]);
    });
  }, []);

  useEffect(() => {
    setLoading(false);
  }, []);

  useEffect(() => {
    (() => {
      window.addEventListener("beforeunload", preventClose);
    })();
    return () => {
      window.removeEventListener("beforeunload", preventClose);
    };
  }, []);

  const preventClose = (e: BeforeUnloadEvent) => {
    e.preventDefault();
    e.returnValue = "";
  };

  // const validate = () => {
  //   const min =
  // }

  const handleClick = () => {
    generateMeeting({
      name: values.title,
      region_code: "A02",
      maxMembers: Number(values.members),
      description: values.details,
      users_id: 125,
      type: 3,
      category1: selectedCategory?.c1_id,
      category2: selectedCategory?.c2_id,
    });
    router.push("/");
  };

  const handleChange = (type: string, v?: string | number | boolean | Date | null) => {
    if (type === "details" && typeof v === "string") {
      setValues((prev) => {
        return {
          ...prev,
          [type]: v,
        };
      });
      setErrorMsg((prev) => ({
        ...prev,
        [type]:
          v.length < 20 ? "최소 20자 이상을 권하고 있어요." : v.length > 500 ? "500자 미만으로 제한하고 있어요." : "",
      }));
    } else if (type === "title" && typeof v === "string") {
      setValues((prev) => {
        return {
          ...prev,
          [type]: v,
        };
      });
      setErrorMsg((prev) => {
        return {
          ...prev,
          [type]:
            v.length < 5 ? "최소 5자 이상을 권하고 있어요." : v.length > 40 ? "40자 미만으로 제한하고 있어요." : "",
        };
      });
    } else if (
      type === "conditions" &&
      v &&
      typeof v === "string" &&
      (v === "onlyMan" || v === "onlyWoman" || v === "withoutBlack")
    ) {
      setValues((prev) => ({
        ...prev,
        [type]: {
          ...prev.conditions,
          [v]: !prev.conditions[v],
        },
      }));
    } else if (type === "members" && typeof v === "string") {
      const regex = /^(?:[1-9][0-9]*)?$/; // 숫자만 체크
      if (regex.test(v)) {
        setValues((prev) => ({
          ...prev,
          [type]: v,
        }));
      }
    } else if (type === "nolimitMembers") {
      setValues((prev) => ({
        ...prev,
        members: "",
        [type]: !prev.nolimitMembers,
      }));
    } else {
      setValues((prev) => ({
        ...prev,
        [type]: v,
      }));
    }
  };

  if (loading) {
    return <Loader />;
  }

  console.log("🔔🔔🔔", selectedArea, values);
  return (
    <div className="p-6">
      <div className="flex flex-col gap-5">
        <Region
          address={address}
          setAddress={setAddress}
          addressKeyword={addressKeyword}
          setAddressKeyword={setAddressKeyword}
          // selectedArea={selectedArea}
          setSelectedArea={setSelectedArea}
        />

        <div className="flex flex-col gap-2">
          <div className="text-lg font-bold">주제</div>
          <div className="flex gap-2">
            <Input placeholder="대분류" value={values.category1} disabled type="main" />
            <Input placeholder="소분류" value={values.category2} disabled type="main" />
            <Button title="변경" onClick={() => router.back()} />
          </div>
        </div>
        <Input
          label="모임 제목"
          placeholder="어떤 모임인지 한문장으로 표현해봐요."
          type="main"
          onChange={(v) => handleChange("title", v.target.value)}
          error={values.title.length > 40 || values.title.length < 5}
          errorText={errorMsg.title}
        />
        <div className="flex flex-col gap-2">
          <div className="text-lg font-bold">일시</div>
          <div className="flex gap-2 w_sm:flex-col">
            <div className="input-datepicker flex-1 focus-within:border-primary">
              <DatePicker
                locale={ko}
                dateFormat="yyyy년 MM월 dd일"
                showIcon
                icon={<CiCalendar />}
                selected={values.date}
                onChange={(date) => handleChange("date", date)}
                placeholderText="날짜 선택"
                calendarClassName="custom-calendar"
                showPopperArrow={false}
                renderCustomHeader={({ date, decreaseMonth, increaseMonth }) => (
                  <div className="flex items-center justify-between pb-3">
                    <button className="rounded-lg border border-solid border-border p-1" onClick={decreaseMonth}>
                      <MdKeyboardArrowLeft size={20} />
                    </button>
                    <span className="flex-1 font-bold">{`${date.getFullYear()}년 ${date.getMonth() + 1}월`}</span>

                    <button className="rounded-lg border border-solid border-border p-1" onClick={increaseMonth}>
                      <MdKeyboardArrowRight size={20} />
                    </button>
                  </div>
                )}
              />
            </div>
            <div className="input-datepicker flex-1">
              <DatePicker
                locale={ko}
                showIcon
                icon={<CiTimer />}
                selected={values.time}
                onChange={(time) => handleChange("time", time)}
                showTimeSelect
                showTimeSelectOnly
                timeIntervals={30}
                dateFormat="hh:mm"
                placeholderText="시간 선택"
                showTimeCaption={false}
                calendarClassName="custom-calendar"
                showPopperArrow={false}
              />
            </div>
          </div>
        </div>
        <div className="flex gap-4">
          <div className="w-1/2">
            <Input
              icon={<PiUsersLight />}
              placeholder="모집 인원 수"
              label="인원"
              type="text"
              align="center"
              onChange={(v) => handleChange("members", v.target.value)}
              disabled={values.nolimitMembers}
              value={values.members}
            />
          </div>
          <Checkbox
            label="제한없음"
            checked={values.nolimitMembers}
            setChecked={() => handleChange("nolimitMembers")}
          />
        </div>
        <Textarea
          label="모집 내용"
          placeholder="모집하는 모임에 대한 설명이나 조건 등을 자유롭게 적어봐요."
          onChange={(v) => handleChange("details", v.target.value)}
          error={values.details.length < 20 || values.details.length > 500}
          errorText={errorMsg.details}
        />

        <div className="flex flex-col gap-2">
          <div className="text-lg font-bold">입장 조건</div>
          <div className="flex gap-2">
            <Button
              on={values.conditions.onlyMan}
              title="남자만"
              custom="label"
              onClick={() => handleChange("conditions", "onlyMan")}
            />
            <Button
              on={values.conditions.onlyWoman}
              title="여자만"
              custom="label"
              onClick={() => handleChange("conditions", "onlyWoman")}
            />
            <Button
              on={values.conditions.withoutBlack}
              title="블랙 제한"
              custom="label"
              onClick={() => handleChange("conditions", "withoutBlack")}
            />
          </div>
        </div>
        <div className="mt-8">
          <Button
            custom="full"
            onClick={handleClick}
            disabled={
              !values.title ||
              !selectedArea ||
              !values.date ||
              !values.time ||
              !values.details ||
              (Number(values.members) === 0 && !values.nolimitMembers)
            }
            title="방 만들기"
          />
        </div>
      </div>
    </div>
  );
};

export default CreateContainer;
