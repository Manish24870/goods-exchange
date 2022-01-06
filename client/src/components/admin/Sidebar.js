import React from "react";
import {
  Box,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
} from "@mui/material";

import { ManageAccounts, InboxSharp } from "@mui/icons-material";

const Sidebar = (props) => {
  return (
    <Box sx={{ width: "100%", maxWidth: 220, bgcolor: "background.paper" }}>
      <List component="nav" aria-label="main mailbox folders">
        <ListItemButton
          selected={props.selectedIndex === 0}
          onClick={(e) => props.handleListItemClick(e, 0)}
        >
          <ListItemIcon>
            <ManageAccounts />
          </ListItemIcon>
          <ListItemText primary="Users" />
        </ListItemButton>
        <ListItemButton
          selected={props.selectedIndex === 1}
          onClick={(e) => props.handleListItemClick(e, 1)}
        >
          <ListItemIcon>
            <InboxSharp />
          </ListItemIcon>
          <ListItemText primary="Products" />
        </ListItemButton>
      </List>
    </Box>
  );
};

export default Sidebar;
