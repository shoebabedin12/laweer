import { Dispatch, SetStateAction } from "react";

export type LawyerDataType = {
  uid: string;
  name: string;
  email: string;
  role: "lawyer";
  specialization: string;
  experience: string; // or number if you want to cast
  description: string;
  availableDays: string[];
  availableTimeSlots: string[];
  profileImage: string; // base64 or URL
  createdAt?: string;
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
  role?: "admin" | "lawyer" | "user";
}

export interface MessageType {
  id?: string;
  senderId: string;
  receiverId: string;
  text: string;
  timestamp: Date;
}
