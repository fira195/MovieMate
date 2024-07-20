import { useState } from "react";

function FeaturesCard({ title, detail, action }) {
  return (
    <div className="bg-yellow-50 relative text-black w-1/3 p-8 pb-28 hover:-rotate-3 hover:scale-105 transition-all duration-300 ">
      <div className="bg-red-400 w-10 h-10 mb-4"></div>
      <h1 className="font-bold text-lg mb-4">{title}</h1>
      <h1 className="">{detail}</h1>
      <p className="absolute bottom-8 cursor-pointer hover:bg-yellow-300 px-4 p-1 w-1/2 rounded-lg">{action}</p>
    </div>
  );
}

function Landing() {
    const features=[
        {
            title:"Discover Movies",
            detail:"Read and write reviews, track your favorite movies. Read and write reviews, track your favorite movies",
            action:"explore ->"
        },
        {
            title:"Explore and Review Popular Movies: Share Your Thoughts and Feelings",
            detail:"Share your thoughts, recommendations, and movie experiences ",
            action:"Join us ->"
        },
        {
            title:"Connect with Movie Enthusiasts",
            detail:"Share your thoughts, recommendations, and movie experiences",
            action:"Sign up ->"
        },

    ]
  return (
    <div className="bg-red-900 text-yellow-50">
      <div className="h-screen flex justify-center font-bold relative">
        <img
          className="w-full h-full object-cover absolute "
          src="../../public/2049.jpg"
          alt=""
        />

        <div className="mt-[29rem] text-center w-1/2 z-10">
          <h1 className="text-3xl">
            Your Essential Movie Companion for Effortless Tracking, Discovery,
            and Sharing
          </h1>
          <button className="m-6 p-2 px-4 bg-red-500 shadow-2xl shadow-black">
            Get Started
          </button>
        </div>
      </div>

      <div className="flex gap-10 px-40 p-10">
        <div className="w-96 h-96 bg-yellow-50"></div>
        <div className="w-1/2 mt-4">
          <h1 className="font-bold text-3xl mb-4">
            Discover movies you'll love with personalized recommendations and
            engage with a vibrant community.
          </h1>
          <p className="text-lg mb-4">
            Our platform offers personalized movie recommendations tailored to
            your tastes, ensuring you find the perfect film for every mood. Join
            our community of movie enthusiasts and share your thoughts and
            reviews with like-minded individuals.
          </p>
          <button className="mr-4 p-2 px-4 bg-red-500 shadow-2xl shadow-black">
            Get Started
          </button>
          <button className=" p-2 px-4 bg-yellow-50 shadow-2xl text-black shadow-black">
            Learn More
          </button>
        </div>
      </div>
      <div>
        <h1 className="font-bold text-3xl text-center mt-6">
          Find, Track, Share Movie
        </h1>
        <div className="pt-10 p-40 flex gap-36" >
          {
            features.map(item=> <FeaturesCard
                title={item.title}
                detail={item.detail}
                action={item.action}
              />)
          }        
        </div>
      </div>
    </div>
  );
}

export default Landing;
