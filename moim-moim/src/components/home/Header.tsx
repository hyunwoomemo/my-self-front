"use client";

import Link from "next/link";
import { FaChevronRight, FaBell, FaMagnifyingGlass, FaRegCalendar } from "react-icons/fa6";
import Tabs from "./Tabs";
import { useState } from "react";
import Hr from "../common/Hr";

const List = [
  {
    label: "#전체",
    value: "all",
  },
  {
    label: "친목",
    value: "friendship",
  },
  {
    label: "취미",
    value: "interest",
  },
  {
    label: "직업",
    value: "job",
  },
];

const Header = () => {
  const [value, setValue] = useState(List[0]);

  return (
    <header>
      <div className="flex justify-between p-6 pb-4">
        <Link href={"/postcode"} className="flex items-center gap-1">
          <span className="text-xl font-bold">논현 1동</span>
          <FaChevronRight />
        </Link>
        <div className="flex items-center gap-6 text-2xl">
          <FaMagnifyingGlass />
          <FaBell />
          <FaRegCalendar />
        </div>
      </div>
      <Tabs data={List} type="default" value={value} setValue={setValue} />
      <Hr />
    </header>
  );
};

export default Header;
