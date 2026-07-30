import useSelectedAnimation from "@/hooks/useSelcetedAnimation";

type Props = {
  focused: boolean;
  Icon: React.ComponentType<AnimatedIconProps>;
};

const COLOR: [string, string] = ["#888888", "#1a1a1a"];

export default function AnimatedTabIcon({ focused, Icon }: Props) {
  const { strokeStyle } = useSelectedAnimation(focused, {
    stroke: COLOR,
  });

  return <Icon width={24} height={24} animatedStroke={strokeStyle} />;
}
