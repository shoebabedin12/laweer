"use client";

import React from "react";
// import logo01 from "./../public/assets/success-doctor.png";
// import logo03 from "./../public/assets/success-patients.png";
// import logo04 from "./../public/assets/success-staffs.png";
// import CountUp from "react-countup";
// import Image from "next/image";
// import { useInView } from "react-intersection-observer";

const Counter = () => {
  // const { ref, inView } = useInView({
  //   triggerOnce: true, // only trigger once
  //   threshold: 0.3,     // 30% visible to trigger
  // });
  // const data = [
  //   {
  //     id: 0,
  //     img: logo01,
  //     count: 199,
  //     title: 'Total Lawyers'
  //   },{
  //     id: 1,
  //     img: logo03,
  //     count: 1900,
  //     title: 'Cases Initiated'
  //   },{
  //     id: 2,
  //     img: logo04,
  //     count: 300,
  //     title: 'Total Staffs'
  //   },
  // ]

  return (
    <>
    Counter component
    {/* <div className="mb-[100px]" ref={ref}>
      <div className="text-center">
        <h1 className="text-[40px] font-extrabold">We Provide Best Law Services</h1>
        <p>
          Our platform connects you with verified, experienced Lawyers across
          various specialties — all at your convenience.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 py-8">
        {data.map(item=>
        <div key={item.id} className="bg-(--color-text)/5 hover:bg-(--color-text)/10 border border-(--color-text)/15 py-4 lg:py-6 xl:py-10 px-4 lg:px-6 xl:px-12 rounded-2xl transition-all duration-300 ease-linear">
          <Image src={item.img} alt={item.title} />
          <h1 className="text-3xl xl:text-5xl font-extrabold py-4">
            {inView && <CountUp start={0} end={item.count} />}+
          </h1>
          <p className="text-xl font-medium text-gray-500">{item.title}</p>
        </div>)}
      </div>
    </div> */}
    </>
  );
};

export default Counter;
