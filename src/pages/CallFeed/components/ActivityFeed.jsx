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
import ActivityDetail from "./ActivityDetail.jsx";
import CallTabs from "./CallTabs.jsx";
import VoicemailIcon from "@mui/icons-material/Voicemail";
import axios from "axios";
const ActivityFeed = (props) => {
  const [calls, setCalls] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const [callId, setCallId] = React.useState(null);
  const [tab, setTab] = React.useState("Inbox");
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
    setOpen(true);
    setCallId(call.id);
  };

  React.useEffect(() => {
    if (props != null) {
      setCalls(props.calls.filter((call) => call.call_type == "missed"));
    }
  }, [props]);

  React.useEffect(() => {
    if (tab == "Inbox") {
      setCalls(props.calls.filter((call) => call.call_type == "missed"));
    } else {
      setCalls(props.calls);
    }
  }, [tab]);

  const switchPhoneIcon = (callType) => {
    switch (callType) {
      case "missed":
        return <PhoneMissedIcon color="error" />;
      case "answered":
        return <PhoneInTalkIcon color="success" />;
      case "voicemail":
        return <VoicemailIcon color="error" />;
    }
  };

  const archiveAllCalls = () => {
    const promiseArray = calls.map((call) =>
      axios
        .post(`https://aircall-job.herokuapp.com/activities/${call.id}`, {
          is_archived: true,
        })
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        })
    );

    Promise.all(promiseArray).then((res) => {
      props.setDidArchive("all");
      console.log(res);
    });
  };
  return (
    <Box>
      <CallTabs tab={tab} setTab={setTab} />
      <Divider />
      <ActivityDetail
        open={open}
        setOpen={setOpen}
        callId={callId}
        setDidArchive={props.setDidArchive}
      />
      <List sx={{ height: "85%" }}>
        <ListItem button onClick={archiveAllCalls}>
          <ListItemIcon>
            <ArchiveIcon />
          </ListItemIcon>
          <ListItemText primary="Archive all calls" />
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
                  {switchPhoneIcon(call.call_type)}
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

export default ActivityFeed;
