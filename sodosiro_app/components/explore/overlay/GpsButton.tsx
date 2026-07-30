import GpsIcon from "@/components/icon/GpsIcon";
import useSelectedAnimation from "@/hooks/useSelcetedAnimation";
import { useLocationStore } from "@/stores/useLocationStore";

export default function GpsButton({}) {
  const { isTracking } = useLocationStore();

  const { strokeStyle, fillStyle } = useSelectedAnimation(isTracking, {
    stroke: ["#1a1a1a", "#0066FF"],
    fill: ["#1a1a1a", "#0066FF"],
  });

  return <GpsIcon animatedStroke={strokeStyle} animatedFill={fillStyle} />;
}
