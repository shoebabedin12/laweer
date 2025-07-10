import { layerData } from "@/data/lawyer-data";
import React from "react";
import Lawyers from "../../../components/Lawyers";

const LawyersProfile = () => {

  return (
    <div className="mt-[100px]">
     <div className="container">
       <Lawyers layerData={layerData}></Lawyers>
     </div>
    </div>
  );
};

export default LawyersProfile;
