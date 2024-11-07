import Link from "next/link";
import { FaChevronRight, FaBell, FaMagnifyingGlass, FaRegCalendar } from "react-icons/fa6";

const Header = () => {
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
    </header>
  );
};

export default Header;
