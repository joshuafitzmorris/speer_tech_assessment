import * as React from "react";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

export default function CallTabs({ tab, setTab }) {
  const handleChange = (event, newValue) => {
    setTab(newValue);
  };

  return (
    <Box sx={{ width: "100%", bgcolor: "background.paper" }}>
      <Tabs value={tab} onChange={handleChange} centered>
        <Tab label="Inbox" value="Inbox" />
        <Tab label="All Calls" value="All Calls" />
      </Tabs>
    </Box>
  );
}
