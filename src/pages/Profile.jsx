import MovieHolder from "../components/MovieHolder";

import React, { useState } from "react";

function Accordion({ onclick }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      onClick={() => setOpen((prev) => !prev)}
      className={`w-full  mx-auto my-8 ${!open && "di"}`}
    >
      <h1 className="text-2xl font-bold p-4 bg-gray-200">My Account</h1>
      <div className="bg-gray-400">
        <div className="p-4 bg-orange-500 cursor-pointer">Change Password</div>
        <div className="p-4 bg-gray-200 cursor-pointer">Delete Account</div>
        <div className="p-4 bg-gray-200 cursor-pointer">Logout</div>
      </div>
    </div>
  );
}

function Profile() {
  const movies = [
    "Avatar (2003)",
    "interstellar (2004)",
    "interstellar (2004)",
    "interstellar (2004)",
    "interstellar (2004)",
    "interstellar (2004)",
    "interstellar (2004)",
    "interstellar (2004)",
  ];

  return (
    <div className=" bg-red-950 relative">
      <div className="bg-gradient-to-b from-gray-500 to-gray-400 h-52 absolute w-full z-0"></div>

      <div className="relative z-10 pt-36 flex ml-28">
        <div className="rounded-[100%] bg-gray-900 w-44 h-44"></div>
        <div className="fle pt-20 text-yellow-50 ml-8">
          <p className="font-bold text-xl mb-2">Username</p>
          <p>This is where the bio goes</p>
        </div>
        <button className="bg-red-500 absolute font-bold text-yellow-50 p-2 px-3 rounded-xl right-20 top-60">
          Edit
        </button>
      </div>

      <div className="flex flex-col gap-8 mx-4 mt-8">
        <MovieHolder title={"My Reviews"} movies={movies} />
        <MovieHolder title={"Watchlist"} movies={movies} />
        <MovieHolder title={"Watched"} movies={movies} />
      </div>
      <Accordion />
    </div>
  );
}

export default Profile;
