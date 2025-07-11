import { Dispatch, SetStateAction } from "react";

export type LawyerDataType = {
  id: number;
  name: string;
  specialization: string;
  license: string;
  experience: string;
  availability: string[];
  consultationFee: number;
  image: string;
  bio: string;
};

export type LawyeersPropTypes = {
  layerData: LawyerDataType[];
  showingOption?:number;
};
export type LawyeerDetailsPropTypes = {
  data: LawyerDataType;
};

export type UserData = {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin' | 'lawyer';
  blocked?: boolean;
};

export type SidebarProps = {
  showSideNav: boolean;
  setShowSideNav?: Dispatch<SetStateAction<boolean>>;
}