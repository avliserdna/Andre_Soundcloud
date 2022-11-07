// frontend/src/components/Navigation/index.js
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import Upload from '../Upload';
import './Navigation.css';

function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);

  let sessionLinks;
  if (sessionUser?.username) {
    sessionLinks = (
      <ProfileButton user={sessionUser} />
    );
  } else {
    sessionLinks = (
      <>

        <NavLink className="link" to="/login">Log In</NavLink>
        <NavLink className="link" to="/signup">Sign Up</NavLink>
      </>
    );
  }

  return (

    <ul id="navigation">
      <h1 class="title">Life is Sound</h1>
      <NavLink className="link" exact to="/">Home</NavLink>
      <NavLink className="link" to="/upload">Upload</NavLink>
      {isLoaded && sessionLinks}
    </ul>

  );
}

export default Navigation;
