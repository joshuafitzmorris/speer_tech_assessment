import * as React from "react";
import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import ArchiveIcon from "@mui/icons-material/Archive";
import Paper from "@mui/material/Paper";
import DialpadIcon from "@mui/icons-material/Dialpad";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import Badge from "@mui/material/Badge";
import Fab from "@mui/material/Fab";
import { styled } from "@mui/material/styles";
import { useHistory } from "react-router-dom";

const StyledFab = styled(Fab)({
  position: "absolute",
  zIndex: 1,
  top: -25,
  left: 0,
  right: 0,
  margin: "0 auto",
});

const Footer = (props) => {
  const history = useHistory();

  const routeChange = (path) => {
    history.push(path);
    switch (path) {
      case "/":
        setValue(0);
        return;
      case "/dialpad":
        setValue(1);
        return;
      case "/archive":
        setValue(2);
        return;
    }
  };

  const getTabValueFromHistory = () => {
    console.log(history.pathname);
    switch (history.pathname) {
      case "/":
        return 0;
      case "/dialpad":
        return 1;
      case "/archive":
        return 2;
    }
  };
  const [value, setValue] = React.useState(getTabValueFromHistory);
  const ref = React.useRef(null);

  React.useEffect(() => {
    ref.current.ownerDocument.body.scrollTop = 0;
  }, [value]);

  return (
    <Box sx={{ pb: 7 }} ref={ref}>
      <Paper
        sx={{ position: "fixed", bottom: 0, width: "376px" }}
        elevation={3}
      >
        <BottomNavigation
          showLabels
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
        >
          <BottomNavigationAction
            label="Calls"
            icon={
              <Badge badgeContent={props.notifications} overlap="circular">
                <LocalPhoneIcon />
              </Badge>
            }
            onClick={() => routeChange("/")}
          />

          <BottomNavigationAction
            icon={
              <StyledFab color="inherit">
                <DialpadIcon color="success" fontSize="large" />
              </StyledFab>
            }
            onClick={() => routeChange("/dialpad")}
          />
          <BottomNavigationAction
            label="Archive"
            icon={<ArchiveIcon />}
            onClick={() => routeChange("/archive")}
          />
        </BottomNavigation>
      </Paper>
    </Box>
  );
};

export default Footer;
