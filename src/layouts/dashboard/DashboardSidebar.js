import React from "react";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { Link as RouterLink, useLocation } from "react-router-dom";
// material
import { styled } from "@mui/material/styles";
import { Box, Drawer, Button } from "@mui/material";
// components
import Logo from '../../components/general/Logo';
import NavSection from '../../components/general/NavSection';
import { MHidden } from '../../components/@material-extend';
//
import sidebarConfig from './SidebarConfig';

import axiosInstance from "../../utils/axios";

// ----------------------------------------------------------------------

const DRAWER_WIDTH = 280;

const RootStyle = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('lg')]: {
    flexShrink: 0,
    width: DRAWER_WIDTH,
  },
}));

// ----------------------------------------------------------------------

DashboardSidebar.propTypes = {
  isOpenSidebar: PropTypes.bool,
  onCloseSidebar: PropTypes.func,
};

export default function DashboardSidebar({ isOpenSidebar, onCloseSidebar }) {
  const { pathname } = useLocation();

  useEffect(() => {
    if (isOpenSidebar) {
      onCloseSidebar();
    }
  }, [pathname]);

  const [isAuth, setAuth] = useState(false);

  useEffect(() => {
    setAuth(localStorage.getItem("access_token") !== null);
  }, []);

  const logOut = () => {
    localStorage.clear();
    window.location.replace(process.env.REACT_APP_WEB_URL);
  };

  const [userInfo, setUserInfo] = useState(null);

  const fetchUserInfo = async () => {
    const result = await axiosInstance.get("users/user-info/");
    setUserInfo(result.data);
  }

  useEffect(() => {
    if (isAuth) {
      fetchUserInfo();
    }
  }, [isAuth]);

  const renderContent = (
    <>
      <Box sx={{ px: 2.5, py: 3 }}>
        <Box component={RouterLink} to="/" sx={{ display: 'inline-flex' }}>
          <Logo />
        </Box>
        {userInfo !== null ? 
          <div>
            <p>LOGGED IN AS {userInfo.username}</p>
            <Button onClick={logOut}>LOG OUT</Button>
          </div> 
          : 
          <div>
            <p>NOT LOGGED IN</p>
            <Button
              variant="contained"
              component={RouterLink}
              to="/auth/login"
            >LOG IN</Button>
            <Button
              variant="contained"
              component={RouterLink}
              to="/auth/register"
            >New User</Button>
          </div>
        }
      </Box>

      <NavSection navConfig={sidebarConfig} />

      <Box sx={{ flexGrow: 1 }} />
    </>
  );

  return (
    <RootStyle>
      <MHidden width="lgUp">
        <Drawer
          open={isOpenSidebar}
          onClose={onCloseSidebar}
          PaperProps={{
            sx: { width: DRAWER_WIDTH },
          }}
        >
          {renderContent}
        </Drawer>
      </MHidden>

      <MHidden width="lgDown">
        <Drawer
          open
          variant="persistent"
          PaperProps={{
            sx: {
              width: DRAWER_WIDTH,
              bgcolor: 'background.default',
            },
          }}
        >
          {renderContent}
        </Drawer>
      </MHidden>
    </RootStyle>
  );
}
