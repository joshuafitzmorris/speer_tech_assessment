import React from "react";
import Footer from "../../components/Footer/Footer.jsx";
import Header from "../../components/Header/Header.jsx";
import ActivityFeed from "./components/ActivityFeed.jsx";
import axios from "axios";
import { Divider } from "@mui/material";
const baseURL = "https://aircall-job.herokuapp.com/activities";

const CallFeed = () => {
  const [calls, setCalls] = React.useState([]);
  const [didArchive, setDidArchive] = React.useState([]);
  React.useEffect(() => {
    axios.get(baseURL).then((response) => {
      setCalls(response.data.filter((call) => !call.is_archived));
    });
  }, [didArchive]);

  return (
    <div className="container">
      <Header />
      <Divider />
      <ActivityFeed calls={calls} setDidArchive={setDidArchive} />
      <Footer
        notifications={
          calls.filter((call) => call.call_type == "missed").length
        }
      />
    </div>
  );
};

export default CallFeed;
