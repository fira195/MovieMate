import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-gradient p-20 flex justify-between relative">
      <div className="flex items-center gap-6">
        <div className='w-10 h-10 rotate-45 bg-main border-2 border-accent'></div>

        <nav>
            <ul className='flex gap-8 text-thrid items-center'>
              <li className="hover:border-b-2 transtion duration-400"><Link to="/">Home</Link></li>
              <li className="hover:border-b-2 transtion duration-400"><Link to="/collection">Collection</Link></li>
              <li className="hover:border-b-2 transtion duration-400"><Link to="/discover">Discover</Link></li>
              <li className="hover:border-b-2 transtion duration-400"><Link to="/profile">Profile</Link></li>
              <li className='bg-accent border-2 border-black hover:scale-105 active:scale-90 transition duration-300 p-2 px-3 rounded-md'><Link to="/about">Get in Touch</Link></li>
            </ul>
        </nav>
      </div>

      <div className='grid grid-cols-3 gap-8 items-center'>
            <div className="bg-accent border-2 border-main rounded-3xl cursor-pointer size-7"></div>
            <div className="bg-accent border-2 border-main rounded-3xl cursor-pointer size-7"></div>
            <div className="bg-accent border-2 border-main rounded-3xl cursor-pointer size-7"></div>
      </div>

      <p className="absolute bottom-0 left-1/2 transform -translate-x-28 text-thrid text-sm">© 2024 Movie Tracker. All rights reserved.</p>
    </footer>
  );
}

export default Footer;
