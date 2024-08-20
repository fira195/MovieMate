import { useEffect, useState } from "react";
import { btnClassName, btnClassName2 } from "../utils/css";
import { useNavigate } from "react-router-dom";

function FeaturesCard({ title, detail, action, onClick }) {
  return (
    <div className="bg-thrid relative p-8 col-span-4 hover:bg-accent border-2 hover:border-main border-accent hover:text-thrid transition-all duration-300 ">
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
    { src: "/Baby.jpg", alt: "Baby Driver" },//0
    { src: "/Inception.jpg", alt: "Inception" },//1
    { src: "/Boom.jpg", alt: "Oppenheimer" },//2
    { src: "/Interstellar.jpg", alt: "Interstellar" },//3
    { src: "/it.jpg", alt: "It" },//4
    { src: "/Memento.jpg", alt: "Memento" },//5
  ];

  const getNextIndex = (current, offset, base) => {
    return (current + offset) % base;
  };
  const states=[
    {top: "0", zIndex:'10'},{top: '10%', zIndex:0, rotate: "-10deg"},{top: '-10%', zIndex:0, rotate: "-20deg"}
  ]
  const [see,setSee]=useState(0)
  return (
    <div className="lg:col-span-6 md:col-span-8 relative lg:h-1/2 h-full transition-all duration-500 flex justify-center items-center">
      <div
        className={`flex-shrink-0 w-fit flex items-center border-2 border-accent justify-center   absolute *:transition-all duration-300`}
        style={states[getNextIndex(see, 0, states.length)]}
      >
        <img src={imgs[active].src} alt={imgs[active].alt} width={350} />
      </div>
      <div
        className={`flex-shrink-0 w-fit flex items-center border-2 border-accent justify-center transition-all duration-300 absolute`}
        style={states[getNextIndex(see, 1, states.length)]}
      >
        <img
          src={imgs[getNextIndex(active, 1, imgs.length)].src}
          alt={imgs[getNextIndex(active, 1, imgs.length)].alt}
          width={350}
        />
      </div>
      <div
        className={`flex-shrink-0 w-fit flex items-center border-2 border-accent justify-center transition-all duration-300 absolute`}
        style={states[getNextIndex(see, 2, states.length)]}

      >
        <img
          src={imgs[getNextIndex(active, 2, imgs.length)].src}
          alt={imgs[getNextIndex(active, 2, imgs.length)].alt}
          width={350}
        />
      </div>

      <div
        onClick={() =>{
          setActive((prev) => (prev >= imgs.length - 1 ? 0 : prev + 1))
          setSee(prev=>prev>=2?0:prev+1)}
        }
        className="absolute rounded-[50%] right-0 z-20 size-10 cursor-pointer bottom-0 opacity-80 shadow-xl hover:opacity-95"
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
    <div className="bg-main overflow-hidden">
      <div className="h-screen grid lg:grid-cols-12 items-center px-10 sm:px-20 md:grid-cols-8">
        <div className="space-y-6 lg:col-span-6 md:col-span-8 text-center lg:text-left">
          <h1 className="font-bold text-xl sm:text-3xl">
            Your Companion for Effortless Tracking, Discovery, and Sharing
            <span className="text-accent"> Movies</span>
          </h1>
          <p className="sm:block hidden">
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

      <div className="bg-accent lg:h-screen p-10 sm:p-20 space-y-8 mt-56 lg:m-0">
        <div className="space-y-4">
        <h1 className="font-bold text-xl sm:text-3xl text-thrid text-center">Features</h1>
        <h1 className="font-bold text-lg sm:text-xl  text-thrid text-center">
          Find, Track, Share Movies
        </h1>
        </div> 
        <div className="grid lg:grid-cols-12 gap-4 md:grid-cols-8 justify-center items-center">
          {features.map((item, key) => (
            <FeaturesCard key={key} {...item} />
          ))}
        </div>
      </div>

      <div className="lg:h-screen grid lg:grid-cols-12 lg:text-left text-center p-10 sm:p-20 gap-8">
        <img src="../public/fan.jpg" alt="" className="lg:col-span-6 mx-auto"/>
        <div className="space-y-4 lg:col-span-6  justify-center flex flex-col">
          <h1 className="font-bold text-xl sm:text-3xl">
            Discover movies you'll love with personalized recommendations and
            engage with a vibrant community.
          </h1>
          <p className="sm:block hidden">
            Our platform offers personalized movie recommendations tailored to
            your tastes, ensuring you find the perfect film for every mood. Join
            our community of movie enthusiasts and share your thoughts and
            reviews with like-minded individuals.
          </p>
          <div className="space-x-4 text-sm sm:text-xl">
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
