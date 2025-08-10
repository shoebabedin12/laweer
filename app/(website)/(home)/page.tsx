import { auth } from "@/auth";
import Banner from "./Banner";
import Counter from "@/components/Counter";
import Lawyers from "@/components/Lawyers";
import Image from "next/image";

export default async function Home() {
 const session = await auth();
  return (
    <div className="container">
      <Banner />
      <Image src={session.user.image} height={100}
  width={100} alt="User Avatar" />
      <Lawyers showingOption={6}/>
      <Counter/>
    </div>
  );
}
