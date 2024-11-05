import Link from "next/link";
import { Dispatch, SetStateAction } from "react";

interface TabData {
  label: string;
  value: string;
}

interface TabsProps {
  data: TabData[];
  type: "default" | "sub" | "xs";
  link?: boolean;
  value: TabData | undefined;
  setValue: Dispatch<SetStateAction<{ label: string; value: string }>>;
}

const Tabs = ({ data, type, link, value, setValue }: TabsProps) => {
  const tabTypeClass = () => {
    switch (type) {
      case "default":
        return "min-w-16 flex flex-1 items-center justify-center p-3 text-center";
    }
  };

  const tabTextTypeClass = (label: string) => {
    switch (type) {
      case "default":
        return value?.label === label ? "font-bold" : "text-[var(--textDisabled)]";
    }
  };

  const handleTabActive = (tab: TabData) => {
    setValue(tab);
  };

  if (link) {
    return (
      <ul className="flex">
        {data.map((v, i) => (
          <li key={i} className="">
            <Link href={v.value}>{v.label}</Link>
          </li>
        ))}
      </ul>
    );
  }
  return (
    <div>
      <ul className="flex">
        {data.map((v, i) => (
          <li key={i} className={`${tabTypeClass()} cursor-pointer`} onClick={() => handleTabActive(v)}>
            <span className={tabTextTypeClass(v.label)}>{v.label}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Tabs;
