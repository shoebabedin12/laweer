import { layerData } from "@/data/lawyer-data";
import Banner from "./Banner";
import Lawyers from "../../components/Lawyers";
import Counter from "../../components/Counter";

export default function Home() {
  return (
    <div className="container">
      <Banner />
      <Lawyers layerData={layerData} showingOption={6}></Lawyers>
      <Counter/>
    </div>
  );
}
