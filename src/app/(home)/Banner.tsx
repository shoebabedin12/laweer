const Banner = () => {
  return (
    <div className="mt-[30.5px] group">
      <div
        className={`bg-center bg-cover w-full h-[730px] lg:rounded-3xl flex items-center justify-center 
      `}
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.2)), url('/assets/banner-img-1.png')`,
          backgroundBlendMode: "overlay",
        }}
      >
        <div className="text-white text-center ">
          <h1 className="lg:text-5xl lg:font-extrabold text-3xl font-bold leading-14">
            It avoids subjective claims or <br /> exaggeration that might raise
            red <br />
            flags legally
          </h1>
          <p className="leading-6 py-4">
            Our platform connects you with verified, experienced doctors across
            various specialties — all at your convenience. Whether it&apos;s a <br />
            routine checkup or urgent consultation, book appointments in minutes
            and receive quality care you can trust.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Banner;
