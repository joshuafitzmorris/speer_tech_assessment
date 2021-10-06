import axios from "axios";
const baseURL = "https://aircall-job.herokuapp.com/activities";

const getCalls = () => {
  return axios.get(baseURL);
};

export default getCalls;
