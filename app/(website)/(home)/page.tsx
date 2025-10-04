import Banner from "./Banner";
import Counter from "@/app/components/Counter";
import Lawyers from "@/app/components/Lawyers";

export default function Home() {

  

  return (
    <div className="container">
      <Banner />
      <Lawyers showingOption={6}/>
      <Counter/>
    </div>
  );
}
