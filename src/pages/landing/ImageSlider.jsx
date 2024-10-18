import { useState } from "react";

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
  export default ImageSlider