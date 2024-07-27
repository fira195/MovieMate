import { useState } from "react";

function FeaturesCard({ title, detail, action }) {
  return (
    <div className="bg-thrid relative p-8 hover:bg-accent hover:border-2 border-main hover:text-thrid transition-all duration-300 ">
      <div className="bg-main size-10 mb-4"></div>
      <h1 className="font-bold text-lg mb-4">{title}</h1>
      <h1>{detail}</h1>
      <p className="mt-20 cursor-pointer hover:border-2 border-main px-4 p-1">
        {action}
      </p>
    </div>
  );
}

function Landing() {
  const features = [
    {
      title: "Discover Movies",
      detail:
        "Explore the latest releases, popular hits, and hidden gems tailored to your tastes.",
      action: "explore ->",
    },
    {
      title:
        "Write and Share Your Thoughts",
      detail: "Share your opinions on movies you've watched and connect with fellow movie enthusiasts.",
      action: "Join us ->",
    },
    {
      title: "Join Our Family",
      detail: "Join a our community of fellow movie enthusiasts and be a part of the world of film.",
      action: "Sign up ->",
    },
  ];
  const imgs = [
    "../public/oppen.jpg",
    "../public/BR.jpg",
    "../public/oppen.jpg",
  ];
  const [active, setActive] = useState(0);
  const btnClass = `z-20 size-fit bg-accent text-thrid px-4 p-2 hover:shadow-2xl transition duration-200`;
  
  return (

    <div className="bg-main ">
      <div className=" h-screen flex items-center justify-between px-32">
        <div className="w-1/2 space-y-6 ">
          <h1 className="font-bold text-3xl">
            Your Companion for Effortless Tracking, Discovery, and Sharing{" "}
            <span className="text-accent">Movies</span>
          </h1>
          <p className="">
            Discover a seamless way to track what you've watched, uncover new
            favorites, and share your movie experiences with a vibrant community
            of film enthusiasts. Dive into the world of movies.
          </p>
          <button className={btnClass}>Get Started</button>
        </div>
        <div className="w-1/3 h-1/2 relative items-center flex flex-shrink-0 ">
          {imgs.map((item, index) => {
            return (
              <div
                key={index}
                className={`${
                  index === active && 'flex-shrink-0'
                } transition-all bg-accent duration-300 cursor-pointer  `}
              >
                <img src={item} width={350} />
              </div>
            );
          })}

          <button onClick={()=>setActive(prev=>prev>=2?0:prev+1)} className={btnClass + ' absolute z-10'}>{">"}</button>
        </div>
      </div>

      <div className="bg-accent h-screen px-32 flex flex-col items-center gap-8 pt-20">
        <h1 className="font-bold text-3xl text-thrid">Features</h1>
        <h1 className="font-bold text-xl text-thrid">Find, Track, Share Movies</h1>
          <div className="flex  gap-10">
          {
            features.map((item,key)=> <FeaturesCard title={item.title} action={item.action} detail={item.detail}/>)
          }
          </div>
      </div>

      <div className="h-screen flex items-center justify-between px-32 gap-10">
          <img src="../public/fan.jpg" width={500} alt="" />
          <div className="space-y-4">
            <h1 className="font-bold text-3xl">Discover movies you'll love with personalized recommendations and engage with a vibrant community.</h1>
            <p className="">Our platform offers personalized movie recommendations tailored to your tastes, ensuring you find the perfect film for every mood. Join our community of movie enthusiasts and share your thoughts and reviews with like-minded individuals.</p>
            <div className="space-x-4">
              <button className={btnClass + 'border-2 border-black'}>Get Started</button>
              <button className={'bg-main size-fit border-2 border-black px-4 p-2 hover:shadow-2xl transition duration-200'}>Learn More</button>
            </div>
          </div>
      </div>
    </div>
  );
}

export default Landing;
