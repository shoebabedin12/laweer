import { StaticImport } from "next/dist/shared/lib/get-img-props";
import { Dispatch, SetStateAction } from "react";

export type LawyerDataType = {
  uid?: string;
  name?: string;
  email?: string;
  specialization?: string;
  role?: string;
  experience?: string;
  description?: string;
  availableDays?: string[];
  availableTimeSlots?: string[];
  profileImage?: string; 
  createdAt?: string;
};

export type LawyeersPropTypes = {
  data: LawyerDataType[];
  showingOption?:number;
  loading?:Boolean;
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
