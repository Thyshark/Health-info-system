import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container">
        <Link className="navbar-brand" to="/">Health System</Link>
        <div className="navbar-nav">
          <Link className="nav-link" to="/clients">Clients</Link>
          <Link className="nav-link" to="/programs">Programs</Link>
          <Link className="nav-link" to="/clientProfile">Profile</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;