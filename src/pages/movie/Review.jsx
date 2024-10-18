function Review() {
    return (
      <div className="shadow-xl p-3">
        <div className="flex gap-4 items-center font-semibold mb-6">
          <div className="bg-accent h-10 w-2 ml-2"></div>
          <h1 className="text-xl">Review</h1>
        </div>
        <div className="w-full p-4 border-2 border-black">
          <textarea className="w-full h-56 bg-thrid p-4 outline-none focus:border-2 border-accent"></textarea>
          <button className="my-4 bg-accent size-fit hover:scale-105 active:scale-90 transition duration-300 text-thrid p-2 px-3 rounded-xl">
            Send Now
          </button>
        </div>
      </div>
    );
  }
  export default Review