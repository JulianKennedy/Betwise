import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Switch,
} from "@mui/material";
import React from "react";
import AddBoxIcon from "@mui/icons-material/AddBox";
import BackspaceIcon from "@mui/icons-material/Backspace";
import SystemUpdateAltIcon from "@mui/icons-material/SystemUpdateAlt";
import GradingIcon from "@mui/icons-material/Grading";
import RuleIcon from "@mui/icons-material/Rule";
import AddLinkIcon from "@mui/icons-material/AddLink";
import GroupsIcon from "@mui/icons-material/Groups";
import ReadMoreIcon from "@mui/icons-material/ReadMore";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import SafetyDividerIcon from "@mui/icons-material/SafetyDivider";
import DarkModeIcon from "@mui/icons-material/DarkMode";

const Sidebar = () => {
  return (
    <Box flex={2} p={2}>
      <List>
      <ListItem disablePadding>
          <ListItemButton component="a" href="mainpage">
            <ListItemIcon>
              <AddBoxIcon />
            </ListItemIcon>
            <ListItemText primary="Create All Tables" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton component="a" href="insert">
            <ListItemIcon>
              <AddBoxIcon />
            </ListItemIcon>
            <ListItemText primary="INSERT to Bets" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton component="a" href="delete">
            <ListItemIcon>
              <BackspaceIcon />
            </ListItemIcon>
            <ListItemText primary="DELETE from Bettors" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton component="a" href="update">
            <ListItemIcon>
              <SystemUpdateAltIcon />
            </ListItemIcon>
            <ListItemText primary="UPDATE Bettors" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton component="a" href="select">
            <ListItemIcon>
              <GradingIcon />
            </ListItemIcon>
            <ListItemText primary="SELECT Bettors" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton component="a" href="projection">
            <ListItemIcon>
              <RuleIcon />
            </ListItemIcon>
            <ListItemText primary="Table Projection" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton component="a" href="join">
            <ListItemIcon>
              <AddLinkIcon />
            </ListItemIcon>
            <ListItemText primary="JOIN Bettors and Bets" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton component="a" href="group_bettor">
            <ListItemIcon>
              <GroupsIcon />
            </ListItemIcon>
            <ListItemText primary="GROUP BY Maximum Bet of Each Bettor" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton component="a" href="having">
            <ListItemIcon>
              <ReadMoreIcon />
            </ListItemIcon>
            <ListItemText primary="Bettors HAVING a Bet > $100" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton component="a" href="group_avg">
            <ListItemIcon>
              <TrendingUpIcon />
            </ListItemIcon>
            <ListItemText primary="GROUP BY Bettors With More Bets Than Average" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton component="a" href="division">
            <ListItemIcon>
              <SafetyDividerIcon />
            </ListItemIcon>
            <ListItemText primary="All Bettors that have Bet on all Teams" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton component="a" href="home">
            <ListItemIcon>
              <DarkModeIcon />
            </ListItemIcon>
            <Switch />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );
};

export default Sidebar;
