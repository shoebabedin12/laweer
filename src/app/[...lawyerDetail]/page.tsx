"use client";
import { use } from "react";
import { CiWarning } from "react-icons/ci";
// import toast from "react-hot-toast";

const LawyersProfile = ({
  params,
}: {
  params: Promise<{ slug: string }>
}) => {
  const { slug } = use(params);
  console.log(params);
  
  // const weekday = [
  //   "Sunday",
  //   "Monday",
  //   "Tuesday",
  //   "Wednesday",
  //   "Thursday",
  //   "Friday",
  //   "Saturday",
  // ];
  // const d = new Date();
  // let day = weekday[d.getDay()];

  // const lawyerId = parseInt(id);
  // const lawyerDetails = useLoaderData();

  // const lawyer = lawyerDetails.find((lawyers) => lawyers.id === lawyerId);
  // const {
  //   image,
  //   name,
  //   experience,
  //   specialization,
  //   license,
  //   availability,
  //   consultationFee,
  // } = lawyer || {};

  // const today = availability.find((data) => data == day);

  // const handleAppointment = () => {
  //   const data = addAppointment(lawyer);
  //   if (data) {
  //     navigate(`/lawyerDetail/${id}`);
  //   } else {
  //     navigate("/booking");
  //     toast.success(`Appointment Schedule Successfully for ${name}`);
  //   }
  // };

  return (
    <>
      <div className="hero bg-base-200 my-8 rounded-2xl md:p-[72px]">
        <div className="hero-content text-center">
          <div className="">
            <h1 className="text-5xl font-bold">Lawyer’s Profile Details</h1>
            <p className="py-6">
              Lorem ipsum dolor sit amet consectetur. Sit enim blandit orci
              tortor amet ut. Suscipit sed est fermentum magna. Quis vitae
              tempus facilisis <br /> turpis imperdiet mattis donec dignissim
              volutpat.
            </p>
          </div>
        </div>
      </div>
      <div className="card lg:card-side bg-base-100 shadow-sm">
        <figure className="w-3/12 p-6">
          {/* <Image className="rounded-2xl" src={image} alt="Album" /> */}
        </figure>
        <div className="card-body  justify-center">
          <div className="flex flex-col gap-4">
            <div className="">
              <h2 className=" bg-blue-50 text-blue-600 py-[5px] px-3.5 rounded-full inline">
                {/* {experience} */}
              </h2>
            </div>
            {/* <h1 className="text-2xl font-extrabold">{name}</h1> */}
            <div className="flex w-5/12">
              {/* <p>{specialization}</p> */}
              {/* <p className="">&reg; License No:{license}</p> */}
            </div>
            <p className="font-bold">
              Availability{" "}
              {/* {availability.map((available, index) => (
                <span
                  key={index}
                  className="bg-yellow-100 text-[#FFA000] ml-4 py-1.5 px-2.5 rounded-full"
                >
                  {available}
                </span>
              ))} */}
            </p>
            <p className="font-bold">
              Consultation Fee:{" "}
              <span className="text-green-500 ml-4">
                {/* TK : {consultationFee} */}
              </span>
            </p>
          </div>
        </div>
      </div>

      <div className=" lg:card-side bg-base-100 shadow-sm rounded-2xl mt-8 p-8 mb-24">
        <h2 className="text-center text-2xl font-bold mb-4">
          Book an Appointment
        </h2>
        <div className="border-b-2 border-dashed border-gray-300"></div>
        <div className="flex justify-between my-4">
          <h3 className="font-bold">Availability</h3>
          <h3 className="">
            {/* {today == day ? (
              <span className="bg-green-50 text-green-600 py-[5px] px-3.5 rounded-full">
                Lawyer Available Today
              </span>
            ) : (
              <span className="bg-red-50 text-red-600 py-[5px] px-3.5 rounded-full">
                Lawyer Not Available For Today
              </span>
            )} */}
          </h3>
        </div>
        <div className="border-b-2 border-gray-300 mb-6"></div>

        <div className="bg-[#ffa20028] text-[#FFA000] py-2 px-4 rounded-full inline-flex items-center gap-2">
          <CiWarning className="text-2xl" />
          <p>
            Due to high patient volume, we are currently accepting appointments
            for today only. We appreciate your understanding and cooperation.
          </p>
        </div>
        <button
          // onClick={handleAppointment}
          className="btn rounded-full font-bold bg-[#0EA106] text-white py-[22px] px-[30px] text-[18px] flex mt-10 mb-10"
        >
          Book Appointment Now
        </button>
      </div>
    </>
  );
};

export default LawyersProfile;
