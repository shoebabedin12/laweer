import Banner from "./Banner";
import Lawyers from "./Lawyers";

export default function Home() {
  return (
    <>
      <Banner />
      <Lawyers data={data}></Lawyers>
    </>
  );
}
