import React from "react";
import Img1 from "/img1.png";

const Home = () => {
  return (
    <div className="px-6 lg:px-20 mt-20 md:mt-20 mb-20">
      {/*Section 1 */}
      <div className="flex flex-col-reverse gap-14 lg:gap-0 lg:flex-row lg:justify-between lg:items-center">
        <div className="flex flex-col gap-10 text-center lg:text-start lg:w-[600px]">
          <h1 className="text-4xl md:text-5xl text-bold">
            Chat And Connect With Your{" "}
            <span className="text-red-400">Loved Ones Easily</span>
          </h1>
          <p className="text-xl">
            Sign in right now to get started and get all the greatest perks!
          </p>

          <div className="flex flex-col mt-10 md:flex-row gap-2">
            <button className="btn btn-error">Sign In</button>
            <button className="btn btn-outline btn-error">
              Sign Up For Free
            </button>
          </div>
        </div>
        <div>
          <img src={Img1} className="rounded-full md:h-[500px] md:w-[500px]" />
        </div>
      </div>

      {/*Section 3 */}
      <div className="flex flex-col items-center gap-4 mt-10">
        <h1 className="text-orange-400 text-lg">Our services</h1>
        <p className="text-4xl">We Provide Various kind of Service for you</p>

        <div className="flex flex-col lg:flex-row gap-4 mt-8">
          <div className="card bg-base-100 w-50 shadow-xl">
            <div className="card-body">
              <h2 className="card-title text-red-400">Easy Connection</h2>
              <p>
                EasyConnection is a connectivity solution between the automative
              </p>
              <div className="card-actions justify-end"></div>
            </div>
          </div>

          <div className="card bg-base-100 w-50 shadow-xl">
            <div className="card-body">
              <h2 className="card-title text-red-400">Fully Secured</h2>
              <p>
                Here is our take on the best secure messaging app on the market
              </p>
              <div className="card-actions justify-end"></div>
            </div>
          </div>

          <div className="card bg-base-100 w-50 shadow-xl">
            <div className="card-body">
              <h2 className="card-title text-red-400">Free Membership</h2>
              <p>Transform the way you with one place for everyone.</p>
              <div className="card-actions justify-end"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
