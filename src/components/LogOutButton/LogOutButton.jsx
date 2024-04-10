import React from 'react';
import { useDispatch } from 'react-redux';
import LogoutIcon from '@mui/icons-material/Logout';
import Button from '@mui/material/Button';
import { pink, purple } from '@mui/material/colors';

function LogOutButton(props) {
  const dispatch = useDispatch();

  return (
    <Button
      // This button shows up in multiple locations and is styled differently
      // because it's styled differently depending on where it is used, the className
      // is passed to it from it's parents through React props
      className={props.className}
      onClick={() => dispatch({ type: 'LOGOUT' })}>
      <LogoutIcon className="navLink" fontSize="large" />
    </Button>
  );
}

export default LogOutButton;
