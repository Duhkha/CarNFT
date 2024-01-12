import { Link } from 'react-router-dom';
import './navbar.css'; // Import the custom styles
import { useState, useEffect } from 'react';

type Props = {};

const Navbar = (props: Props) => {

    const [stickyClass, setStickyClass] = useState('');

  useEffect(() => {
    const stickNavbar = () => {
      let windowHeight = window.scrollY;
      // window height changed for the demo
      windowHeight > 150 ? setStickyClass('sticky-nav') : setStickyClass('');
    };

    window.addEventListener('scroll', stickNavbar);

    // Cleanup the event listener on component unmount
    return () => window.removeEventListener('scroll', stickNavbar);
  }, []);

  return (
    <nav className={`navbar ${stickyClass} navbar-expand-lg navbar-dark`} style={{ backgroundColor: "#011223" }}>
      <div className="container">
        <Link className="navbar-brand" to="/">
          Turbo Trade
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" to="/home">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/about">
                About
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
