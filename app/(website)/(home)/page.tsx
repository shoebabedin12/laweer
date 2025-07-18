import Banner from "./Banner";
import Counter from "@/components/Counter";
import Lawyers from "@/components/Lawyers";

export default function Home() {

  return (
    <div className="container">
      <Banner />
      <Lawyers showingOption={6}/>
      <Counter/>
    </div>
  );
}
