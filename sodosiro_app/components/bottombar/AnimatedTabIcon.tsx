import useSelectedAnimation from "@/hooks/useSelcetedAnimation";
import { useEffect } from "react";

type Props = {
  focused: boolean;
  Icon: React.ComponentType<AnimatedIconProps>;
};

const COLOR: [string, string] = ["#888888", "#1a1a1a"];

export default function AnimatedTabIcon({ focused, Icon }: Props) {
  const { strokeStyle } = useSelectedAnimation(focused, {
    color: COLOR,
  });
  useEffect(() => console.log("mounted"), []);

  return <Icon width={24} height={24} animatedProps={strokeStyle} />;
}
