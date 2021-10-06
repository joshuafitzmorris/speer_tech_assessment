import React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import PhoneMissedIcon from "@mui/icons-material/PhoneMissed";
import PhoneInTalkIcon from "@mui/icons-material/PhoneInTalk";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import { DateTime } from "luxon";
import { ListItemIcon } from "@mui/material";
import Fade from "@mui/material/Fade";
import ArchiveIcon from "@mui/icons-material/Archive";
import ArchiveDetail from "./ArchiveDetail.jsx";
import axios from "axios";

const baseURL = "https://aircall-job.herokuapp.com/reset";

const ArchiveFeed = (props) => {
  const [calls, setCalls] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const [callId, setCallId] = React.useState(null);
  const diffBetweenDates = (start, end) => {
    if (end == null) {
      return true;
    }
    return (
      DateTime.fromISO(start.created_at).toISODate() <
      DateTime.fromISO(end.created_at).toISODate()
    );
  };

  const handleModal = (call) => {
    console.log(call);
    setOpen(true);
    setCallId(call.id);
  };

  React.useEffect(() => {
    if (props != null) {
      setCalls(props.calls.filter((call) => call.is_archived));
    }
  }, [props]);

  const unarchiveCalls = () => {
    axios
      .get(`${baseURL}`)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  return (
    <Box>
      <ArchiveDetail open={open} setOpen={setOpen} callId={callId} />
      <List sx={{ height: "85%" }}>
        <ListItem button onClick={unarchiveCalls}>
          <ListItemIcon>
            <ArchiveIcon />
          </ListItemIcon>
          <ListItemText primary="Un-Archive all calls" />
        </ListItem>
        {calls.map((call, index) => (
          <Box>
            {diffBetweenDates(call, props.calls[index - 1]) && (
              <Divider light={true}>
                {DateTime.fromISO(call.created_at).toFormat("LLLL, d y")}
              </Divider>
            )}
            <Fade in={call != null} timeout={index * 200}>
              <ListItem
                sx={{
                  width: "100%",
                  margin: "auto",
                  paddingTop: "5px",
                  borderRadius: "25px",
                }}
                button
                key={call.id}
                id={call.id}
                onClick={() => handleModal(call)}
              >
                <ListItemAvatar>
                  {call.call_type == "missed" ? (
                    <PhoneMissedIcon color="error" />
                  ) : (
                    <PhoneInTalkIcon color="success" />
                  )}
                </ListItemAvatar>
                {call.direction == "outbound" ? (
                  <ListItemText
                    primary={call.to == null ? call.to : call.from}
                    secondary={
                      call.call_type == "missed"
                        ? `Tried to call from ${call.via}`
                        : `Called from ${call.via}`
                    }
                  />
                ) : (
                  <ListItemText
                    primary={call.to == null ? call.from : call.to}
                    secondary={
                      call.call_type == "missed"
                        ? `Tried to call from ${call.via}`
                        : `Called from ${call.via}`
                    }
                  />
                )}
                <ListItemText
                  sx={{ textAlign: "right" }}
                  primary={DateTime.fromISO(call.created_at).toFormat("t")}
                />
              </ListItem>
            </Fade>
          </Box>
        ))}
      </List>
    </Box>
  );
};

export default ArchiveFeed;
