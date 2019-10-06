import React from 'react';
import { NavLink } from 'react-router-dom';

const App = () => {
  return (
    <div>
      <header>
        <h1>Test Task</h1>
        <nav>
          <ul>
            <li>
              <NavLink activeClassName={'active'} to="/home">
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/news">News</NavLink>
            </li>
            <li>
              <NavLink to="/login">Login</NavLink>
            </li>
            <li>
              <NavLink to="/profile">Profile</NavLink>
            </li>
          </ul>
        </nav>
      </header>
    </div>
  );
};

export default App;
