import { SODOSI_LIST } from "@/constants/Sodosi";

export const getSigunguName = (sigunguCode: string) => {
  return SODOSI_LIST.find((item) => item.sigunguCode === sigunguCode)?.name;
};
