import React, { useState } from "react";
import { Link } from "react-router-dom";

import {
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import { signOutUser } from "../../utils/firebase/firebase.utils";
import { makeStyles } from '@mui/styles';

const DrawerNav = ({ ...props }) => {
  
  const useStyles = makeStyles({
    SignOutBtnStyle: {
      color: "rgba(0, 0, 0, 0.54)"
      //接著做把 signout btn default style 給去除掉
    },
  });
  const classes = useStyles();

  const [drawerOpen, setDrawerOpen] = useState(false);
  let useLoginStatus = props.userLoginStatus; // check user is login status
  

  return (
    <>
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
        {/* https://stackoverflow.com/questions/58585373/integrates-react-route-links-into-material-ui-list */}
        <List>
          <ListItem component={Link} to="/">
            <ListItemIcon>
              <ListItemText>Home</ListItemText>
            </ListItemIcon>
          </ListItem>
          <ListItem component={Link} to="/shop">
            <ListItemIcon>
              <ListItemText>Shop</ListItemText>
            </ListItemIcon>
          </ListItem>
          {/* 判斷 user 是否有登入, 有才顯示購物車 */}
          {useLoginStatus ? (
            <>
              <ListItem component={Link} to="/">
                <ListItemText component="button" onClick={signOutUser} className={classes.SignOutBtnStyle}>
                  Sign Out
                </ListItemText>
              </ListItem>
              <ListItem component={Link} to="/checkout">
                <ListItemIcon>
                  <ShoppingCartCheckoutIcon />
                </ListItemIcon>
              </ListItem>
            </>
          ) : (
            <ListItem component={Link} to="/auth">
              <ListItemIcon>
                <ListItemText>Sign In</ListItemText>
              </ListItemIcon>
            </ListItem>
          )}
        </List>
      </Drawer>

      <IconButton
        size="small"
        edge="start"
        color="inherit"
        aria-label="menu"
        sx={{ marginLeft: "auto", color: "white" }}
        onClick={() => setDrawerOpen(!drawerOpen)}
      >
        <MenuIcon />
      </IconButton>
    </>
  );
};

export default DrawerNav;
