import React from "react";
import logo01 from "../../../public/assets/success-doctor.png";
import logo02 from "../../../public/assets/success-review.png";
import logo03 from "../../../public/assets/success-patients.png";
import logo04 from "../../../public/assets/success-staffs.png";
import CountUp from 'react-countup';

const Counter = () => {
  return (
    <div className="pt-[100px]">
      <div className="text-center">
        <h1 className="text-[40px] font-extrabold">
          We Provide Best Law Services
        </h1>
        <p>
          Our platform connects you with verified, experienced Lawyers across
          various specialities — all at your convenience.
        </p>
      </div>
      <div className="lg:grid lg:grid-cols-4 gap-6 py-8">
        <div className="bg-gray-100 py-10 px-12 rounded-2xl">
          <div className="">
            <img src={logo01} alt="" />
            <h1 className="text-5xl font-extrabold py-4">
              <CountUp start={0} end={199}></CountUp>+
            </h1>
            <p className="text-xl font-medium text-gray-500">Total Lawyer</p>
          </div>
        </div>
        <div className="bg-gray-100 py-10 px-12 rounded-2xl">
          <div>
            <img src={logo02} alt="" />
            <h1 className="text-5xl font-extrabold py-4">
            <CountUp start={0} end={467}></CountUp>+
                </h1>
            <p className="text-xl font-medium text-gray-500">Total Reviews</p>
          </div>
        </div>
        <div className="bg-gray-100 py-10 px-12 rounded-2xl">
          <div>
            <img src={logo03} alt="" />
            <h1 className="text-5xl font-extrabold py-4">
            <CountUp start={0} end={1900}></CountUp>+
            </h1>
            <p className="text-xl font-medium text-gray-500">Cases Initiated</p>
          </div>
        </div>
        <div className="bg-gray-100 py-10 px-12 rounded-2xl">
          <div>
            <img src={logo04} alt="" />
            <h1 className="text-5xl font-extrabold py-4">
            <CountUp start={0} end={300}></CountUp>+
            </h1>
            <p className="text-xl font-medium text-gray-500">Total Stuffs</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Counter;
