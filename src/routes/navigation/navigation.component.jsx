import { Outlet, Link } from "react-router-dom";
import React, { Fragment, useState } from "react";
import { useSelector } from "react-redux";

import "./navigation.styles.jsx";
import { ReactComponent as CrwnLogo } from "../../assets/crown.svg";
import { signOutUser } from "../../utils/firebase/firebase.utils";
import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";
import DrawerNav from "../../components/drawer-nav/drawer-nav.component";
import { setIsCartToggleHidden } from "../../store/cart/cart.selector";
import { selectCurrentUser } from "../../store/user/user.selector";

import {
  AppBar,
  Button,
  Grid,
  Toolbar,
  Typography,
  Box,
  useTheme,
  useMediaQuery,
  Tabs,
  Tab,
  
} from "@mui/material";
import {
  NavigationContainer,
  LogoContainer,
  NavLinks,
  NavLink,
} from "./navigation.styles";
import { makeStyles } from '@mui/styles';

const Navigation = () => {
  const currentUser = useSelector(selectCurrentUser);
  const isCartOpen = useSelector(setIsCartToggleHidden);

  const [selectedTab, setSelectedTab] = useState(0);
  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down("sm"));

  const useStyles = makeStyles({
    BoxStyles: {
      marginTop: "50px"
    },
  });
  const classes = useStyles();

  return (
    <>
      <AppBar className={classes.AppBarStyles}>
        <Toolbar>
          {isMatch ? (
            <>
              <LogoContainer to="/">
                <CrwnLogo className="logo" />
              </LogoContainer>
              <DrawerNav userLoginStatus={currentUser}/>
            </>
          ) : (
            /* https://developer.mozilla.org/en-US/docs/Web/CSS/place-items */
            /* placeItems 會在 grid system / flex system 起作用, 第一個值設定垂直方向, 第二個值設定水平方向 */
            <Grid sx={{ placeItems: "center" }} container>
              <Grid item sm={2}>
                <LogoContainer to="/">
                  <CrwnLogo className="logo" />
                </LogoContainer>
              </Grid>
              <Grid item sm={7}></Grid>
              <Grid item sm={3} sx={{ marginLeft: "auto" }}>
                <Tabs
                  indicatorColor="primary"
                  textColor="inherit"
                  value={selectedTab}
                  onChange={(e, val) => setSelectedTab(val)}
                >
                  <Tab label="Home" component={Link} to="/" />
                  <Tab label="Shop" component={Link} to="/shop" />
                  {currentUser ? (
                    <Tab
                      label="Sign Out"
                      component={Link}
                      to="/"
                      onClick={signOutUser}
                    />
                  ) : (
                    <Tab label="Sign In" component={Link} to="/auth" />
                  )}
                  <CartIcon />
                </Tabs>
              </Grid>
            </Grid>
          )}
        </Toolbar>
        {isCartOpen && <CartDropdown />}
      </AppBar>
      <Box className={classes.BoxStyles}>
        <Outlet />
      </Box>
    </>
  );
};

export default Navigation;
