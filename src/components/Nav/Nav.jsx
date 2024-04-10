import React from 'react';
import { Link } from 'react-router-dom';
import LogOutButton from '../LogOutButton/LogOutButton';
import './Nav.css';
import { useSelector } from 'react-redux';
import Stack from '@mui/material/Stack';
import { pink, purple } from '@mui/material/colors';
import SvgIcon from '@mui/material/SvgIcon';
import ListIcon from '@mui/icons-material/List';
import LogoutIcon from '@mui/icons-material/Logout';

function Nav() {
  const user = useSelector((store) => store.user);

  function HomeIcon(props) {
    return (
      <SvgIcon {...props}>
        <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
      </SvgIcon>
    );
  }

  return (
    <div className="nav">
      <Link to="/home">
        <h2 className="nav-title">AnimeNerdStation</h2>
      </Link>
      <div>
        {/* If no user is logged in, show these links */}
        {!user.id && (
          // If there's no user, show login/registration links
          <Link className="navLink" to="/registration">
            Register
          </Link>
        )}

        {/* If a user is logged in, show these links */}
        {user.id && (
          <>
            <Stack direction="row" spacing={1}>
              <Link to="/user">
                <HomeIcon
                  className="navLink"
                  fontSize="large"
                  sx={{ color: purple[200] }}
                />
              </Link>

              {/* <Link className="navLink" to="/info">
              Info Page
            </Link> */}

              <Link to="/watchlist">
                <ListIcon
                  className="navLink"
                  fontSize="large"
                  sx={{ color: purple[200] }}
                />
              </Link>
              <LogOutButton />
            </Stack>
          </>
        )}
        {/* about page not needed right now. possible STRETCH */}
        {/* <Link className="navLink" to="/about">
          About
        </Link> */}
      </div>
    </div>
  );
}

export default Nav;
