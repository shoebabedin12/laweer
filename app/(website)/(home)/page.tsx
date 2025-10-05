import Banner from './Banner';
import Counter from '@/app/components/Counter';
import Lawyers from '@/app/components/Lawyers';
import { unstable_ViewTransition as ViewTransition } from "react"

export default function Home() {
  return (
    <ViewTransition
      name="home"
      enter="page-enter"
      exit="page-exit duration-100"
    >
      <div className="container">
        <Banner />
        <Lawyers showingOption={6} />
        <Counter />
      </div>
    </ViewTransition>
  );
}
