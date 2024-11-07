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
  tabValue: TabData | undefined;
  setTabValue: Dispatch<SetStateAction<{ label: string; value: string }>>;
}

const Tabs = ({ data, type, link, tabValue, setTabValue }: TabsProps) => {
  const tabTypeClass = (v: string) => {
    switch (type) {
      case "default":
        return `bg-bg min-w-16 flex flex-1 items-center justify-center p-3 text-center border-solid ${tabValue?.value === v ? "border-b-4 border-primary" : "border-b border-surface"}`;
    }
  };

  const tabTextTypeClass = (v: string) => {
    switch (type) {
      case "default":
        return tabValue?.value === v ? "font-bold" : "text-[var(--textDisabled)]";
    }
  };

  const handleTabActive = (tab: TabData) => {
    setTabValue(tab);
  };

  if (link) {
    return (
      <ul className="flex">
        {data.map((v, i) => (
          <li key={i}>
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
          <li key={i} className={`${tabTypeClass(v.value)} cursor-pointer`} onClick={() => handleTabActive(v)}>
            <span className={tabTextTypeClass(v.value)}>{v.label}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Tabs;
