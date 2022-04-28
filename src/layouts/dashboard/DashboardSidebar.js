import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { Box, Drawer, Link, Typography, Avatar } from '@mui/material';
import Logo from '../../components/general/Logo';
import NavSection from '../../components/general/NavSection';
import { MHidden } from '../../components/@material-extend';
import sidebarConfig from './SidebarConfig';
import account from '../../_mocks_/account';
import { useStore } from '../../stores/RootStore';
import { observer } from 'mobx-react-lite';

const DRAWER_WIDTH = 280;

const RootStyle = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('lg')]: {
    flexShrink: 0,
    width: DRAWER_WIDTH,
  },
}));

const AccountStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(2, 2.5),
  borderRadius: theme.shape.borderRadiusSm,
  backgroundColor: theme.palette.grey[200],
}));

DashboardSidebar.propTypes = {
  isOpenSidebar: PropTypes.bool,
  onCloseSidebar: PropTypes.func,
};

function DashboardSidebar({ isOpenSidebar, onCloseSidebar }) {
  const { pathname } = useLocation();
  const {
    userStore: { currentUser },
  } = useStore();

  useEffect(() => {
    if (isOpenSidebar) {
      onCloseSidebar();
    }
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const renderContent = (
    <>
      <Box sx={{ px: 2.5, py: 3 }}>
        <Box
          component={RouterLink}
          to="/dashboard/app"
          sx={{ display: 'inline-flex' }}
        >
          <Logo />
        </Box>
      </Box>

      <Box sx={{ mb: 5, mx: 2.5 }}>
        <Link underline="none" component={RouterLink} to="#">
          {currentUser ? (
            <AccountStyle>
              <Avatar src={account.photoURL} alt="photoURL" />
              <Box sx={{ ml: 2 }}>
                <Typography variant="subtitle2" sx={{ color: 'text.primary' }}>
                  {`${currentUser.firstName} ${currentUser.lastName}`}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  {account.role}
                </Typography>
              </Box>
            </AccountStyle>
          ) : null}
        </Link>
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

export default observer(DashboardSidebar);
