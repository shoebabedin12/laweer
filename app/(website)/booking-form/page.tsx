// "use client";
// import { BookingFormProps } from "@/app/types/FormTypes";
// import { useFormik } from "formik";
// import { FiLoader } from "react-icons/fi";
// import * as Yup from "yup";

const BookingForm = () => {
  // const formik = useFormik<BookingFormProps>({
  //   initialValues: {
  //     name: "",
  //     email: "",
  //     preferredDate: "",
  //     timeSlot: "",
  //     additionalNotes: "",
  //   },
  //   validationSchema: Yup.object({
  //     name: Yup.string().required("Name is required"),
  //     email: Yup.string().required("Email is required"),
  //     preferredDate: Yup.string().required("Preferred Date is required"),
  //     timeSlot: Yup.string().required("Time Slot is required"),
  //     additionalNotes: Yup.string().required("Additional Notes is required"),
  //   }),
  //   onSubmit: async (values) => {
  //     alert(JSON.stringify(values, null, 2));
  //   },
  // });
  return (
    <div className="my-[100px]">
      <div className="container">
        <div className="shadow-2xl max-w-[600px] mx-auto rounded-2xl py-5 px-8">
          {/* <form onSubmit={formik.handleSubmit} className="grid grid-cols-12 gap-4">
            <div className="col-span-12 mb-4">
              <label className="block mb-2 font-medium text-base md:text-xl leading-6 text-(--color-text)/70">
                Name <span className="text-red-500">*</span>
              </label>
              <input
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.name}
                type="text"
                id="name"
                name="name"
                placeholder="First name"
                className="w-full bg-transparent text-(--color-text)/70 placeholder-gray-400 p-3 rounded-md border border-(--color-text)/70 focus:outline-none mb-1"
              />
              {formik.touched.name && formik.errors.name ? (
                <div className="text-red-600">{formik.errors.name}</div>
              ) : null}
            </div>
            <div className="col-span-12 mb-4">
              <label className="block mb-2 font-medium text-base md:text-xl leading-6 text-(--color-text)/70">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.email}
                type="text"
                id="email"
                name="email"
                placeholder="Enter your email"
                className="w-full bg-transparent text-(--color-text)/70 placeholder-gray-400 p-3 rounded-md border border-(--color-text)/70 focus:outline-none mb-1"
              />
              {formik.touched.email && formik.errors.email ? (
                <div className="text-red-600">{formik.errors.email}</div>
              ) : null}
            </div>
            <div className="col-span-12 mb-4">
              <label className="block mb-2 font-medium text-base md:text-xl leading-6 text-(--color-text)/70">
                Preferred Date <span className="text-red-500">*</span>
              </label>
              <input
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.preferredDate}
                type="text"
                id="preferredDate"
                name="preferredDate"
                placeholder="First name"
                className="w-full bg-transparent text-(--color-text)/70 placeholder-gray-400 p-3 rounded-md border border-(--color-text)/70 focus:outline-none mb-1"
              />
              {formik.touched.preferredDate && formik.errors.preferredDate ? (
                <div className="text-red-600">{formik.errors.preferredDate}</div>
              ) : null}
            </div>
            <div className="col-span-12 mb-4">
              <label className="block mb-2 font-medium text-base md:text-xl leading-6 text-(--color-text)/70">
                Time Slot <span className="text-red-500">*</span>
              </label>
              <input
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.timeSlot}
                type="text"
                id="timeSlot"
                name="timeSlot"
                placeholder="First name"
                className="w-full bg-transparent text-(--color-text)/70 placeholder-gray-400 p-3 rounded-md border border-(--color-text)/70 focus:outline-none mb-1"
              />
              {formik.touched.timeSlot && formik.errors.timeSlot ? (
                <div className="text-red-600">{formik.errors.timeSlot}</div>
              ) : null}
            </div>
            <div className="col-span-12 mb-4">
              <label className="block mb-2 font-medium text-base md:text-xl leading-6 text-(--color-text)/70">
               Additional Notes <span className="text-red-500">*</span>
              </label>
              <input
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.additionalNotes}
                type="text"
                id="additionalNotes"
                name="additionalNotes"
                placeholder="First name"
                className="w-full bg-transparent text-(--color-text)/70 placeholder-gray-400 p-3 rounded-md border border-(--color-text)/70 focus:outline-none mb-1"
              />
              {formik.touched.additionalNotes && formik.errors.additionalNotes ? (
                <div className="text-red-600">{formik.errors.additionalNotes}</div>
              ) : null}
            </div>
            <div className="col-span-12">
              <button
                disabled={formik.isSubmitting}
                type="submit"
                className="w-full bg-(--color-primary) text-white font-bold text-base leading-[22px] py-[17px] rounded-[65px] text-center flex items-center justify-center cursor-pointer"
              >
                {formik.isSubmitting ? (
                  <FiLoader className="animate-spin" /> // Loading spinner
                ) : (
                  "SUBMIT"
                )}
              </button>
            </div>
          </form> */}
        </div>
      </div>
    </div>
  );
};

export default BookingForm;
