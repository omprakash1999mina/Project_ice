import React from "react";

const Maintenance = () => {
  return (
    <div>
      <section className="text-black-600 h-screen body-font">
        <div className="container px-5 pt-24 mx-auto flex flex-wrap">
          <div className="lg:w-2/3 mx-auto">
            <div className="flex flex-wrap w-full bg-white py-32 px-10 relative mb-4">
              <div className="text-center relative z-10 w-full">
                <h2 className="text-2xl font-black title-font mb-2">
                  OOPS !!
                </h2>
                <h2 className="text-2xl text-gray-900 font-black title-font mb-2">
                  SORRY FOR INCONVENIENCE
                </h2>
                <p className="leading-relaxed font-white">The server is under maintenance .</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Maintenance;
