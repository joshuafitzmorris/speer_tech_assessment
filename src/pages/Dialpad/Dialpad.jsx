import React from "react";
import Footer from "../../components/Footer/Footer.jsx";
import Header from "../../components/Header/Header.jsx";
import axios from "axios";
const baseURL = "https://aircall-job.herokuapp.com/activities";

const Dialpad = () => {
  const [calls, setCalls] = React.useState([]);

  React.useEffect(() => {
    axios.get(baseURL).then((response) => {
      setCalls(response.data);
    });
  }, []);

  return (
    <div className="container">
      <Header />
      <h1>Dialpad goes here</h1>
      <Footer
        notifications={
          calls.filter((call) => call.call_type == "missed").length
        }
      />
    </div>
  );
};

export default Dialpad;
