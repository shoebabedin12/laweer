"use client";
import React from "react";
import logo01 from "../../public/assets/success-doctor.png";
import logo02 from "../../public/assets/success-review.png";
import logo03 from "../../public/assets/success-patients.png";
import logo04 from "../../public/assets/success-staffs.png";
import CountUp from "react-countup";
import Image from "next/image";
import { useInView } from "react-intersection-observer";

const Counter = () => {
  const { ref, inView } = useInView({
    triggerOnce: true, // only trigger once
    threshold: 0.3,     // 30% visible to trigger
  });

  return (
    <div className="mb-[100px]" ref={ref}>
      <div className="text-center">
        <h1 className="text-[40px] font-extrabold">We Provide Best Law Services</h1>
        <p>
          Our platform connects you with verified, experienced Lawyers across
          various specialties — all at your convenience.
        </p>
      </div>
      <div className="lg:grid lg:grid-cols-4 gap-6 py-8">
        <div className="bg-(--color-text)/5 hover:bg-(--color-text)/10 border border-(--color-text)/15 py-10 px-12 rounded-2xl transition-all duration-300 ease-linear">
          <Image src={logo01} alt="" />
          <h1 className="text-5xl font-extrabold py-4">
            {inView && <CountUp start={0} end={199} />}+
          </h1>
          <p className="text-xl font-medium text-gray-500">Total Lawyers</p>
        </div>
        <div className="bg-(--color-text)/5 hover:bg-(--color-text)/10 border border-(--color-text)/15 py-10 px-12 rounded-2xl transition-all duration-300 ease-linear">
          <Image src={logo02} alt="" />
          <h1 className="text-5xl font-extrabold py-4">
            {inView && <CountUp start={0} end={467} />}+
          </h1>
          <p className="text-xl font-medium text-gray-500">Total Reviews</p>
        </div>
        <div className="bg-(--color-text)/5 hover:bg-(--color-text)/10 border border-(--color-text)/15 py-10 px-12 rounded-2xl transition-all duration-300 ease-linear">
          <Image src={logo03} alt="" />
          <h1 className="text-5xl font-extrabold py-4">
            {inView && <CountUp start={0} end={1900} />}+
          </h1>
          <p className="text-xl font-medium text-gray-500">Cases Initiated</p>
        </div>
        <div className="bg-(--color-text)/5 hover:bg-(--color-text)/10 border border-(--color-text)/15 py-10 px-12 rounded-2xl transition-all duration-300 ease-linear">
          <Image src={logo04} alt="" />
          <h1 className="text-5xl font-extrabold py-4">
            {inView && <CountUp start={0} end={300} />}+
          </h1>
          <p className="text-xl font-medium text-gray-500">Total Staffs</p>
        </div>
      </div>
    </div>
  );
};

export default Counter;
