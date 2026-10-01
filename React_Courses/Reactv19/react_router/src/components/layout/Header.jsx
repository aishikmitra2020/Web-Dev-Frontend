import React from 'react'
import { NavLink } from 'react-router-dom'

const getNavLinkStyle = ({ isActive }) => {
    return {
        color: isActive ? "green" : "black",
    }
}

const Header = () => {
  return (
    <header>
      <nav>
        <ul>
            <li>
                {/*
                - 'NavLink' also provides a 'active' class by default (default behaviour).

                - But if we use className like this, that active class is not added killing its default beaviour
                */}
                <NavLink to="/" className={({ isActive }) => 
                        isActive ? "nav-link active" : "nav-link"
                }>
                    Home
                </NavLink>
            </li>
            <li>
                <NavLink to="/about">
                    About
                </NavLink>
            </li>
            <li>
                {/* Here , the active class is added */}
                <NavLink 
                    to="/movie"
                    style={({isActive}) => {
                        return {
                            color: isActive ? "red" : "black",
                        }
                    }}
                >
                    Movie
                </NavLink>
            </li>
            <li>
                <NavLink to="/contact"  style={getNavLinkStyle}>
                    Contact
                </NavLink>
            </li>
        </ul>
      </nav>
    </header>
  )
}

export default Header
