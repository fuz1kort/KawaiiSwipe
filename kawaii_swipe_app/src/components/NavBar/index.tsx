import { NavLink } from "react-router-dom";
import { HomeIcon } from "./icons/HomeIcon";
import { ProfileIcon } from "./icons/ProfileIcon";
import { MatchesIcon } from "./icons/MatchesIcon";
import { MessagesIcon } from "./icons/MessagesIcon";
import "./index.css";

export const NavBar = () => {
  return (
    <nav className="bottom-nav">
      <NavLink
        to="/"
        className={({ isActive }) =>
          isActive ? "nav-item active" : "nav-item"
        }
      >
        <HomeIcon />
      </NavLink>

      <NavLink
        to="/matches"
        className={({ isActive }) =>
          isActive ? "nav-item active" : "nav-item"
        }
      >
        <MatchesIcon />
      </NavLink>

      <NavLink
        to="/messages"
        className={({ isActive }) =>
          isActive ? "nav-item active" : "nav-item"
        }
      >
        <MessagesIcon />
      </NavLink>

      <NavLink
        to="/profile"
        className={({ isActive }) =>
          isActive ? "nav-item active" : "nav-item"
        }
      >
        <ProfileIcon />
      </NavLink>
    </nav>
  );
};
