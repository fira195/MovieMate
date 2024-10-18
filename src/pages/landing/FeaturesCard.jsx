
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
export default FeaturesCard