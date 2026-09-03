import { SODOSI_LIST } from "@/constants/Sodosi";

export const getSigunguName = (sigunguCode: string) => {
  return SODOSI_LIST.find((item) => item.sigunguCode === sigunguCode)?.name;
};

export const getSigunguId = (sigunguName: string) => {
  return SODOSI_LIST.find((item) => item.name === sigunguName)?.sigunguId;
};

export const formatRegionName = (name: string) => {
  return name.replace(/(시|군|구)$/, "");
};
