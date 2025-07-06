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
};
export type LawyeerDetailsPropTypes = {
  data: LawyerDataType;
};