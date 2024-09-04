import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { btnClassName } from '../utils/css';
import { useSelector } from 'react-redux';
function Header() {
  // State for color change on scroll
  const [color, setColor] = useState(false);
  // State for dropdown menu visibility
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Function to change color on scroll
  const changeColor = () => {
    if (window.scrollY > 150) setColor(true);
    else setColor(false);
  };

  useEffect(() => {
    window.addEventListener('scroll', changeColor);
    return () => {
      window.removeEventListener('scroll', changeColor);
    };
  }, []);

  // Toggle dropdown menu visibility
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  const user=useSelector(state=>state.user)
  return (
    <header className={`w-full fixed top-0 p-4 px-8 lg:px-20 flex justify-between items-center transition duration-200 ${color ? 'bg-main shadow-md' : ''} z-30`}>
      <div className="size-7 rotate-45 rounded-sm bg-accent"></div>

      <nav >
        <ul className="  gap-8 items-center hidden md:flex font-semibold">
          <li className="hover:border-b-2 border-accent"><Link to="/">Home</Link></li>
          <li className="hover:border-b-2 border-accent"><Link to="/search">Search</Link></li>
          <li className="hover:border-b-2 border-accent"><Link to="/collection">Collection</Link></li>
          <li className="hover:border-b-2 border-accent"><Link to="/discover">Discover</Link></li>
          <li className={btnClassName}><Link to="/profile">{user.username?user.username:"Profile"}</Link></li>
        </ul>
      </nav>

      {/* Hamburger icon for small screens */}
      <div className="md:hidden">
        <button onClick={toggleDropdown} className="flex items-center p-2">
          <span className="material-icons">menu</span>
        </button>
      </div>

      {/* Dropdown menu for small screens */}
      {isDropdownOpen && (
        <div className="absolute top-16 right-10   bg-main shadow-md md:hidden">
          <ul className="flex flex-col gap-4 p-4 font-semibold">
            <li className="hover:border-b-2 border-accent"><Link to="/">Home</Link></li>
            <li className="hover:border-b-2 border-accent"><Link to="/search">Search</Link></li>
            <li className="hover:border-b-2 border-accent"><Link to="/collection">Collection</Link></li>
            <li className="hover:border-b-2 border-accent"><Link to="/discover">Discover</Link></li>
            <li className={btnClassName}><Link to="/profile">{user.username?user.username:"Profile"}</Link></li>
            </ul>
        </div>
      )}
    </header>
  );
}
export default Header