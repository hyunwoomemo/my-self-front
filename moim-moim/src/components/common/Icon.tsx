import React from "react";
// 아이콘 세트를 import
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as MdIcons from "react-icons/md";
import * as IoIcons from "react-icons/io";
import * as GiIcons from "react-icons/gi";
import * as TiIcons from "react-icons/ti";
import * as CiIcons from "react-icons/ci";

interface IconProps {
  iconName: string;
  size?: number;
  color?: string;
}

const Icon: React.FC<IconProps> = ({ iconName, size = 24, color = "black" }) => {
  const iconSets = {
    fa: FaIcons,
    ai: AiIcons,
    md: MdIcons,
    io: IoIcons,
    gi: GiIcons,
    ti: TiIcons,
    ci: CiIcons,
  };

  // 아이콘 이름을 분석하여, 해당 세트를 찾고, 아이콘을 가져옵니다.
  const [setName, iconKey] = iconName.split("/");

  // 해당 세트에서 아이콘 컴포넌트를 가져옵니다.
  const IconComponent = iconSets[setName as keyof typeof iconSets]?.[iconKey as keyof typeof FaIcons];

  // 아이콘이 없으면 기본 아이콘을 렌더링
  if (!IconComponent) {
    return <FaIcons.FaQuestionCircle size={size} color={color} />;
  }

  return <IconComponent size={size} color={color} />;
};

export default Icon;
