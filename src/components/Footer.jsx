import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-red-950 p-10 px-20 flex justify-between text-yellow-50 relative">
      <div className="flex items-center gap-6">
        <div className='w-10 h-10 rotate-45 rounded-2xl bg-red-500'></div>
        <div className="h-20 w-1 bg-yellow-50"></div>

        <nav>
            <ul className='flex gap-8 font- items-center'>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/watchlist">Watchlist</Link></li>
              <li><Link to="/discover">Discover</Link></li>
              <li><Link to="/discover">Profile</Link></li>
              <li className='bg-red-500 text-yellow-100 p-2 px-3 rounded-xl'><Link to="/about">Get in Touch</Link></li>
            </ul>
        </nav>
      </div>

      <div className='grid grid-cols-3 gap-8 items-center'>
            <div className="bg-yellow-50 rounded-3xl cursor-pointer w-10 h-10"></div>
            <div className="bg-yellow-50 rounded-3xl cursor-pointer w-10 h-10"></div>
            <div className="bg-yellow-50 rounded-3xl cursor-pointer w-10 h-10"></div>
      </div>

      <p className="absolute bottom-0 left-96 text-sm">© 2024 Movie Tracker. All rights reserved.</p>
    </footer>
  );
}

export default Footer;
