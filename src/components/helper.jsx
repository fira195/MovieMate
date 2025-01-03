import { useEffect, useState } from "react";

function Accordion() {
  const [open, setOpen] = useState(false);
  const contentRef = useRef(null);
  const [height, setHeight] = useState("0px");

  useEffect(() => {
    if (contentRef.current) {
      //added 32 to account for the p-4 of the div
      const newHeight = open
        ? `${contentRef.current.scrollHeight + 32}px`
        : "0px";
      setHeight(newHeight);
    }
  }, [open]);

  return (
    <div className="w-full mt-8 border-2 border-black">
      <h1
        onClick={() => setOpen((prev) => !prev)}
        className="text-xl font-bold cursor-pointer p-4 border  2 border-black"
      >
        My Account
      </h1>
      <div
        ref={contentRef}
        style={{ height }}
        className={` gap-3 font-bold flex flex-col overflow-hidden transition-all duration-300 ${
          open ? "p-4" : "p-0"
        }`}
      >
        <div className="p-4 border-2 hover:scale-[101%] transition duration-300 cursor-pointer">
          Change Password
        </div>
        <div className="p-4 border-2 border-black hover:scale-[101%] transition duration-300 cursor-pointer">
          Delete Account
        </div>
        <div className="p-4 border-2 border-black hover:scale-[101%] transition duration-300 cursor-pointer">
          Logout
        </div>
      </div>
    </div>
  );
}

function Scroller({ containerRef }) {
  const [state, setState] = useState({left: null, right: null});

  useEffect(() => {
    const container = containerRef.current;

    if (!containerRef || !containerRef.current) {
      console.error(
        "Scroller: containerRef is required and should point to a DOM element."
      );
      return null;
    }

    const canScroll = container.scrollWidth > container.clientWidth;
    if (!canScroll) {
      setState({
        left: false, right: false
      }); 
      return;
    }

    const scrollHandler = () => {
        setState(prev=>{return {...prev,right:container.scrollLeft !== container.scrollWidth - container.clientWidth}});
        setState(prev=>{return {...prev,left: container.scrollLeft !== 0}});
      
    };

    scrollHandler();

    container.addEventListener("scroll", scrollHandler);

    return () => container.removeEventListener("scroll", scrollHandler);
  }, [containerRef]);

  const scrollLeft = () => {
    const container = containerRef.current;
    
    setTimeout(() => {
      container.scrollTo({
        left: container.scrollLeft - container.clientWidth,
        behavior: "smooth",
      })
    }, 300);
  }
  const scrollRight=()=> {
     const container = containerRef.current;
     setTimeout(() => {
      container.scrollTo({
        left: container.scrollLeft + container.clientWidth,
        behavior: "smooth",
      })
    }, 300);
    }
  return (
    <div>
      {state.right && (
        <div
          onClick={scrollRight}
          className={`size-12 active:scale-90 transition duration-300 bg-thrid rounded-[50%] absolute right-0 z-10 top-1/2 -translate-y-full cursor-pointer font-bold text-accent items-center flex justify-center `}
        >
          <img src="../public/arrow.png" alt="next" />
        </div>
      )}
      {state.left && (
        <div
          onClick={scrollLeft}
          className={`size-12 active:scale-90 transition duration-300 bg-thrid rounded-[50%] absolute left-0 z-10 top-1/2 -translate-y-full cursor-pointer font-bold text-accent items-center flex justify-center `}
        >
         <img className="rotate-180" src="../public/arrow.png" alt="next" />

        </div>
      )}
    </div>
  );
}

function Loading() {
  return (
    <div className="border-4 size-full border-t-accent rounded-[50%] animate-spin m-auto"></div>
  );
}

function Pagination({ currentPage, resultPageNumber, setCurrentPage }) {
  const [visible, setVisible] = useState([]);
  useEffect(() => {
    let start = Math.max(1, currentPage - 2);
    let end = Math.min(resultPageNumber, currentPage + 2);

    const visible_arr = [];
    for (let i = start; i <= end; i++) {
      visible_arr.push(i);
    }
    setVisible(visible_arr);
  }, [currentPage, resultPageNumber]);
  return (
    <div className="p-2 px-4 flex transform bg-main -translate-x-1/2 absolute left-1/2 mx-auto bottom-10 justify-center gap-2">
      {currentPage != 1 && (
        <button
          onClick={() => setCurrentPage(1)}
          className="bg-main hover:bg-accent hover:text-thrid active:scale-95 border-2 border-black text- p-2 px-3 rounded"
        >
          First
        </button>
      )}
      {visible.map((item) => (
        <div
          key={item}
          onClick={() => setCurrentPage(item)}
          className={`${
            currentPage === item ? "bg-accent text-thrid": 'bg-main text-accent'
          } size-10 hover:bg-accent hover:text-thrid cursor-pointer border-2 border-accent items-center flex place-content-center`}
        >
          {item}
        </div>
      ))}
      {currentPage != resultPageNumber && (
        <button
          onClick={() => setCurrentPage(resultPageNumber)}
          className="bg-main hover:bg-accent hover:text-thrid active:scale-95 border-2 border-black p-2 px-3 rounded"
        >
          Last
        </button>
      )}
    </div>
  );
}
export { Pagination, Scroller };
export default Loading;
