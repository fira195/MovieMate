import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Header() {

  //color chang when scroll
  const [color,setColor]=useState(false)
  const changeColor=()=>{
      if (window.scrollY>150) setColor(true)
      else setColor(false)
    }
  useEffect(() => {
    window.addEventListener('scroll', changeColor);

    return () => {
      window.removeEventListener('scroll', changeColor);
    };
  }, []);

  return (
    <header className={`w-full fixed top-0 p-4 px-10 flex gap-4 justify-between ${color && "bg-yellow-50"} z-20`}>
      
      <div className={`w-10 h-10 rotate-45 rounded-2xl ${!color ? "bg-yellow-50" :"bg-red-500"}`}></div>
      
      <div className='flex gap-10  items-center w-1/2'>
        
        <input className='w-1/2 px-3 p-2 rounded-2xl border-2 border-red-300 outline-none' placeholder='Search Movie' type="text" />
        
        <nav>
          <ul className='flex gap-8 font-semibold items-center'>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/watchlist">Watchlist</Link></li>
            <li><Link to="/discover">Discover</Link></li>
            <li className={`bg-red-500 ${color && "text-yellow-100"} p-2 px-3 rounded-xl`}><Link to="/profile">Profile</Link></li>
          </ul>
        
        </nav>
      </div>
    </header>
  );
}

export default Header;
