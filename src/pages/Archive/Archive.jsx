import React from "react";
import Footer from "../../components/Footer/Footer.jsx";
import Header from "../../components/Header/Header.jsx";
import ArchiveFeed from "./components/ArchiveFeed.jsx";
import axios from "axios";
const baseURL = "https://aircall-job.herokuapp.com/activities";

const Archive = () => {
  const [calls, setCalls] = React.useState([]);

  React.useEffect(() => {
    axios.get(baseURL).then((response) => {
      setCalls(response.data);
    });
  });

  return (
    <div className="container">
      <Header />
      <ArchiveFeed calls={calls} />
      <Footer
        notifications={
          calls.filter((call) => call.call_type == "missed").length
        }
      />
    </div>
  );
};

export default Archive;
