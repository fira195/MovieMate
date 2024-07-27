import { useEffect, useReducer, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Header() {

  //color chang when scroll
  const [color,setColor]=useState(false)
  const Ref=useRef()
  const navigate=useNavigate()

  const changeColor=()=>{
      if (window.scrollY>150) setColor(true)
      else setColor(false)
    }
  /* const inputListenter=(e)=>{
    if (e.key === 'Enter'){
      navigate(`/search/${Ref.current.value}`)
    }
  } */
  useEffect(() => {
    window.addEventListener('scroll', changeColor);
    return () => {
      window.removeEventListener('scroll', changeColor);
    };
  }, []);


  return (
    <header className={`w-full fixed top-0 p-4 px-10 flex gap-4 justify-between transition duration-200 ${color && "bg-main shadow-md"} z-30`}>
      
      <div className={`w-10 h-10 rotate-45 rounded-sm ${!color ? "bg-accent" :"bg-accent"}`}></div>
      
      <div className='flex gap-10 justify-end items-center w-1/2'>
        
{/*         <input ref={Ref} className='w-1/2 px-3 p-2 rounded-2xl border-2 border-red-300 outline-none' placeholder='Search Movie' type="text" />
 */}        
        <nav>
          <ul className='flex gap-8 font-semibold items-center'>
            <li className='hover:border-b-2 border-accent'><Link to="/">Home</Link></li>
            <li className='hover:border-b-2 border-accent'><Link to="/search">Search</Link></li>
            <li className='hover:border-b-2 border-accent'><Link to="/collection"> Collection</Link></li>
            <li className='hover:border-b-2 border-accent'><Link to="/discover">Discover</Link></li>
            <li className={`bg-accent ${color && "text-thrid"} text-thrid p-2 px-3 rounded-md transition hover:scale-105 active:scale-95`}><Link to="/profile">Profile</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
