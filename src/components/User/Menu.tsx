import React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";

import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import ExploreIcon from "@mui/icons-material/Explore";
import VideoLibraryIcon from "@mui/icons-material/VideoLibrary";
import MailIcon from "@mui/icons-material/Mail";
import NotificationsIcon from "@mui/icons-material/Notifications";
import AddBoxIcon from "@mui/icons-material/AddBox";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { NavLink } from "react-router-dom";

const MenuUser = () => {
  const activeStyle = {
    color: "pink",
    textDecoration: "none",
  };

  const inactiveStyle = {
    color: "inherit",
    textDecoration: "none",
  };

  return (
    <Box sx={{ width: 250 }} role="presentation">
      <List>
        <NavLink
          to="/trangchu"
          style={({ isActive }) => (isActive ? activeStyle : inactiveStyle)}
        >
          <ListItem button>
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary="Trang chủ" />
          </ListItem>
        </NavLink>
        <NavLink
          to="/admin"
          style={({ isActive }) => (isActive ? activeStyle : inactiveStyle)}
        >
          <ListItem button>
            <ListItemIcon>
              <ExploreIcon />
            </ListItemIcon>
            <ListItemText primary="Bảng tinh" />
          </ListItem>
        </NavLink>
        <NavLink
          to="/frends"
          style={({ isActive }) => (isActive ? activeStyle : inactiveStyle)}
        >
          <ListItem button>
            <ListItemIcon>
              <VideoLibraryIcon />
            </ListItemIcon>
            <ListItemText primary="Bạn Bè" />
          </ListItem>
        </NavLink>
        <NavLink
          to="/messages"
          style={({ isActive }) => (isActive ? activeStyle : inactiveStyle)}
        >
          <ListItem button>
            <ListItemIcon>
              <MailIcon />
            </ListItemIcon>
            <ListItemText primary="Tin nhắn" />
          </ListItem>
        </NavLink>
        <NavLink
          to="/notifications"
          style={({ isActive }) => (isActive ? activeStyle : inactiveStyle)}
        >
          <ListItem button>
            <ListItemIcon>
              <NotificationsIcon />
            </ListItemIcon>
            <ListItemText primary="Thông báo" />
          </ListItem>
        </NavLink>
        <NavLink
          to="/create"
          style={({ isActive }) => (isActive ? activeStyle : inactiveStyle)}
        >
          <ListItem button>
            <ListItemIcon>
              <AddBoxIcon />
            </ListItemIcon>
            <ListItemText primary="Tạo" />
          </ListItem>
        </NavLink>
        <NavLink
          to="/profile"
          style={({ isActive }) => (isActive ? activeStyle : inactiveStyle)}
        >
          <ListItem button>
            <ListItemIcon>
              <AccountCircle />
            </ListItemIcon>
            <ListItemText primary="Trang cá nhân" />
          </ListItem>
        </NavLink>
      </List>
      <Divider />
      <List>
        <ListItem button>
          <ListItemText primary="Xem thêm" />
        </ListItem>
      </List>
    </Box>
  );
};

export default MenuUser;
