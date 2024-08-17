import { useEffect, useReducer, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { btnClassName } from '../utils/css';

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
    <header className={`w-full fixed top-0 p-4 px-10 flex gap-4 justify-between items-center transition duration-200 ${color && "bg-main shadow-md"} z-30`}>
      
      <div className={`size-7 rotate-45 rounded-sm bg-accent`}></div>
      
      <div className='flex gap-10 justify-end items-center w-1/2'>        
        <nav>
          <ul className='flex gap-8 font-semibold items-center'>
            <li className='hover:border-b-2 border-accent'><Link to="/">Home</Link></li>
            <li className='hover:border-b-2 border-accent'><Link to="/search">Search</Link></li>
            <li className='hover:border-b-2 border-accent'><Link to="/collection"> Collection</Link></li>
            <li className='hover:border-b-2 border-accent'><Link to="/discover">Discover</Link></li>
            <li className={btnClassName}><Link to="/profile">Profile</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
