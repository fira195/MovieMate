import { Link } from "react-router-dom";
import { btnClassName } from "../utils/css";

function Footer() {
  return (
    <footer className="bg-gradient p-10 lg:p-20 flex justify-between relative text-sm flex-col items-center gap-8">
      <div className="flex items-center gap-6">
        <div className="w-10 h-10 rotate-45 bg-main border-2 border-accent"></div>

        <nav className="hidden lg:block">
          <ul className="flex gap-8 text-thrid items-center">
            <li className="hover:border-b-2 transtion duration-400">
              <Link to="/">Home</Link>
            </li>
            <li className="hover:border-b-2 transtion duration-400">
              <Link to="/collection">Collection</Link>
            </li>
            <li className="hover:border-b-2 transtion duration-400">
              <Link to="/discover">Discover</Link>
            </li>
            <li className="hover:border-b-2 transtion duration-400">
              <Link to="/profile">Profile</Link>
            </li>
            <li className={btnClassName}>
              <Link to="/about">Get in Touch</Link>
            </li>
          </ul>
        </nav>
      </div>

      <div className="flex justify-center items-center gap-4 mt-6">
        <a
          href="https://www.linkedin.com/in/your-profile"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src="/linkedin.png"
            alt="LinkedIn"
            className="size-10 hover:scale-105 transition"
          />
        </a>
        <a
          href="https://github.com/your-profile"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src="/github.png"
            alt="GitHub"
            className="size-10 hover:scale-105 transition"
          />
        </a>
        <a href="mailto:your-email@example.com">
          <img
            src="/gmail.png"
            alt="Email"
            className="size-10 hover:scale-105 transition"
          />
        </a>
      </div>

      <p className="absolute bottom-0 w-full text-center text-thrid text-xs">
        © 2024 Movie Tracker. All rights reserved.
      </p>
    </footer>
  );
}

export default Footer;
