import { useEffect, useState } from "react";
import { btnClassName, btnClassName2 } from "../utils/css";
import { useNavigate } from "react-router-dom";

function FeaturesCard({ title, detail, action, onClick }) {
  return (
    <div className="bg-thrid relative p-8 hover:bg-accent border-2 hover:border-main border-accent   hover:text-thrid transition-all duration-300 ">
      <div className="bg-main size-10 mb-4"></div>
      <h1 className="font-bold text-lg mb-4">{title}</h1>
      <h1>{detail}</h1>
      <button
        onClick={onClick}
        className="mt-20 cursor-pointer  hover:border-main px-4 p-1 border-2 border-thrid"
      >
        {action}
      </button>
    </div>
  );
}

function ImageSlider() {
  const [active, setActive] = useState(0);
  const imgs = [
    { src: "/Baby.jpg", alt: "Baby Driver" },
    { src: "/Inception.jpg", alt: "Inception" },
    { src: "/Boom.jpg", alt: "Oppenheimer" },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActive((prev) => (prev >= imgs.length - 1 ? 0 : prev + 1));
    }, 5000);

    return () => clearInterval(interval);
  }, [imgs.length]);

  const getNextIndex = (current, offset) => {
    return (current + offset) % imgs.length;
  };

  return (
    <div className="w-[31%] relative h-1/2 transition-all duration-500">
      <div
        className={`flex-shrink-0 w-fit flex items-center border-2 border-accent justify-center z-10 absolute top-0 transition-all duration-300`}
      >
        <img src={imgs[active].src} alt={imgs[active].alt} width={350} />
      </div>
      <div
        className={`flex-shrink-0 w-fit flex items-center border-2 border-accent justify-center transition-all duration-300 absolute top-1/3 z-0 -rotate-[30deg]`}
      >
        <img
          src={imgs[getNextIndex(active, 1)].src}
          alt={imgs[getNextIndex(active, 1)].alt}
          width={350}
        />
      </div>
      <div
        className={`flex-shrink-0 w-fit flex items-center border-2 border-accent justify-center transition-all duration-300 absolute z-0 rotate-[20deg] -top-1/3`}
      >
        <img
          src={imgs[getNextIndex(active, 2)].src}
          alt={imgs[getNextIndex(active, 2)].alt}
          width={350}
        />
      </div>

      <div
        onClick={() =>
          setActive((prev) => (prev >= imgs.length - 1 ? 0 : prev + 1))
        }
        className="absolute rounded-[50%] right-0 size-10 cursor-pointer bottom-0 opacity-80 shadow-xl hover:opacity-95"
      >
        <img src="/arrow.png" alt="Next" />
      </div>
    </div>
  );
}


function Landing() {
  const navigate = useNavigate();

  const features = [
    {
      title: "Discover Movies",
      detail:
        "Explore the latest releases, popular hits, and hidden gems tailored to your tastes.",
      action: "explore",
      onClick: () => navigate("/discover"),
    },
    {
      title: "Write and Share Your Thoughts",
      detail:
        "Share your opinions on movies you've watched and connect with fellow movie enthusiasts.",
      action: "Join us",
      onClick: () => navigate("/login"),
    },
    {
      title: "Join Our Family",
      detail:
        "Join a our community of fellow movie enthusiasts and be a part of the world of film.",
      action: "Sign up",
      onClick: () => navigate("/login"),
    },
  ];

  return (
    <div className="bg-main">
      <div className=" h-screen flex items-center justify-between px-32">
        <div className="w-1/2 space-y-6">
          <h1 className="font-bold text-3xl">
            Your Companion for Effortless Tracking, Discovery, and Sharing
            <span className="text-accent"> Movies</span>
          </h1>
          <p className="">
            Discover a seamless way to track what you've watched, uncover new
            favorites, and share your movie experiences with a vibrant community
            of film enthusiasts. Dive into the world of movies.
          </p>
          <button onClick={() => navigate("/login")} className={btnClassName}>
            Get Started
          </button>
        </div>
        <ImageSlider />
      </div>

      <div className="bg-accent h-screen px-32 flex flex-col items-center gap-8 pt-20">
        <h1 className="font-bold text-3xl text-thrid">Features</h1>
        <h1 className="font-bold text-xl text-thrid">
          Find, Track, Share Movies
        </h1>
        <div className="flex  gap-10">
          {features.map((item, key) => (
            <FeaturesCard key={key} {...item} />
          ))}
        </div>
      </div>

      <div className="h-screen flex items-center justify-between px-32 gap-10">
        <img src="../public/fan.jpg" width={500} alt="" />
        <div className="space-y-4">
          <h1 className="font-bold text-3xl">
            Discover movies you'll love with personalized recommendations and
            engage with a vibrant community.
          </h1>
          <p className="">
            Our platform offers personalized movie recommendations tailored to
            your tastes, ensuring you find the perfect film for every mood. Join
            our community of movie enthusiasts and share your thoughts and
            reviews with like-minded individuals.
          </p>
          <div className="space-x-4">
            <button onClick={() => navigate("/login")} className={btnClassName}>
              Get Started
            </button>
            <button
              onClick={() => navigate("/about")}
              className={btnClassName2}
            >
              Learn More
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Landing;
