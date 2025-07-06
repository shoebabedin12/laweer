import { layerData } from "@/data/lawyer-data";
import Banner from "./Banner";
import Lawyers from "./Lawyers";

export default function Home() {
  return (
    <div className="container">
      <Banner />
      <Lawyers layerData={layerData}></Lawyers>
    </div>
  );
}
