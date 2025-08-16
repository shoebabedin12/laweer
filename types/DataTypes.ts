import { Dispatch, SetStateAction } from "react";

export type LawyerDataType = {
  id?: string;
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
  data?: LawyerDataType[];
  showingOption?: number;
};
export type LawyeerDetailsPropTypes = {
  data: LawyerDataType;
};

export type UserData = {
  id: string;
  name: string;
  email: string;
  role: string;
  blocked?: boolean;
  profileImage?: string;
};

export type SidebarProps = {
  showSideNav: boolean;
  setShowSideNav?: Dispatch<SetStateAction<boolean>>;
  role?: string | null;
}

export interface MessageType {
  id?: string;
  senderId: string;
  receiverId: string;
  text: string;
  timestamp: Date;
}


export interface AppointmentType {
  id: string;
  lawyerId: string;
  userId: string;
  date: string;
  time: string;
  status: "pending" | "approved" | "rejected";
  clientName: string;
  clientImage: string | null;
};


export interface FirestoreAppointment {
  lawyerId: string;
  userId: string;
  date: string;
  time: string;
  status: "pending" | "approved" | "rejected";
};

export interface FirestoreUser {
  name: string;
  profileImage?: string;
};

export interface FormProps {
  name: string;
  email: string;
  password: string;
  confirm_password: string;
  role: string;
}

export interface MessageState {
  type: "error" | "success";
  text: string;
}