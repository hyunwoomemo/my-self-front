"use client";

import Link from "next/link";
import { FaChevronRight, FaBell, FaMagnifyingGlass, FaRegCalendar } from "react-icons/fa6";

const Home = () => {
  return (
    <div className="commonLayoutContainer">
      <header className="p-4">
        <div className="flex justify-between">
          <Link href={"/postcode"} className="flex items-center gap-1">
            <span className="text-xl font-bold">논현 1동</span>
            <FaChevronRight />
          </Link>
          <div className="flex items-center gap-4 text-2xl">
            <FaMagnifyingGlass />
            <FaBell />
            <FaRegCalendar />
          </div>
        </div>
      </header>
    </div>
  );
};

export default Home;
