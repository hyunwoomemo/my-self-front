"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { BiHomeSmile, BiMap, BiUser } from "react-icons/bi";
import { RiChatSmile2Line } from "react-icons/ri";

const NavLink = [
  {
    label: "홈",
    href: "/",
    icon: BiHomeSmile,
  },
  {
    label: "위치",
    href: "/location",
    icon: BiMap,
  },
  {
    label: "마이 모임",
    href: "/mymoim",
    icon: RiChatSmile2Line,
  },
  {
    label: "마이페이지",
    href: "/mypage",
    icon: BiUser,
  },
];

const Nav = () => {
  const [active, setActive] = useState(NavLink[0].href);
  const pathname = usePathname();
  console.log("pathname", pathname);

  const handleClick = (url: string) => {
    setActive(url);
  };

  if (
    (pathname?.includes("/moim/") && pathname?.endsWith("/intro")) ||
    pathname?.endsWith("/chat") ||
    pathname?.includes("/sign")
  ) {
    return null;
  }
  return (
    <nav className="relative z-40">
      <div style={{ height: "calc(4.625rem + 21px)" }}>
        <div
          id="gnb"
          className="fixed bottom-0 left-0 right-0 mx-auto flex w-full max-w-[600px] border-t border-solid border-border bg-bg py-4"
        >
          {NavLink.map((v, i) => (
            <Link
              key={i}
              href={v.href}
              className="flex flex-1 flex-col items-center gap-1 px-2 py-1"
              onClick={() => handleClick(v.href)}
            >
              <v.icon className={`text-3xl ${active === v.href ? "text-primary" : "text-textGray"}`} />
              <span className={`${active === v.href ? "font-bold text-primary" : "text-textGray"} `}>{v.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Nav;
