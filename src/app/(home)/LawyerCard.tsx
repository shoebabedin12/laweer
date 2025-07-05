import Image from "next/image";
import Link from "next/link";
import React from "react";

const LawyerCard = ({ lawyers:any }) => {
  const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
  const d = new Date();
  let day = weekday[d.getDay()];

  const {id, image, name, experience, specialization, license, availability } =
    lawyers || "";

    const today = availability.find(data => data == day)

  return (
    <div>
      <div className="card bg-base-100 shadow-sm md:mx-0 mx-auto flex-row p-6 gap-16">
        <figure className="rounded-2xl max-w-[159px] h-[158px]">
          <Image
            className="max-w-[250px] h-[158px] rounded-2xl"
            src={image}
            alt="Shoes"
          />
        </figure>
        <div className="card-body p-0">
          <div className="flex gap-5">
            {today == day ? (
              <h2 className="bg-green-50 text-green-600 py-[5px] px-3.5 rounded-full">
                Available
              </h2>
            ) : (
              <h2 className="bg-red-50 text-red-600 py-[5px] px-3.5 rounded-full">
                Not Available
              </h2>
            )}

            <h2 className="bg-blue-50 text-blue-600 py-[5px] px-3.5 rounded-full">
              {experience}
            </h2>
          </div>
          <h1 className="text-2xl font-extrabold">{name}</h1>
          <div className="text-gray-500">
            <p>{specialization}</p>
            <p>&reg; License No:{license}</p>
          </div>
          <div className="inline-grid">
            <Link href={`/lawyerDetail/${id}`} className="btn border-gray-200 border py-2 rounded-full cursor-pointer font-bold">View Details</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LawyerCard;
