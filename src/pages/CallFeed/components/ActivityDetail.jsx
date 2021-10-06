import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";

const baseURL = "https://aircall-job.herokuapp.com/activities/";
const style = {
  position: "absolute",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 250,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

export default function ActivityDetail({
  setOpen,
  open,
  callId,
  setDidArchive,
}) {
  const handleClose = () => setOpen(false);
  const [call, setCall] = React.useState(null);

  React.useEffect(() => {
    if (callId != null) {
      axios
        .get(`${baseURL}${callId}`)
        .then((response) => {
          setCall(response.data);
        })
        .catch((error) => console.log(error));
    }
  }, [callId]);

  const archiveCall = () => {
    axios
      .post(`${baseURL}${callId}`, {
        is_archived: true,
      })
      .then(function (response) {
        console.log(response);
        setOpen(false);
        setDidArchive(callId);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Typography
              align="center"
              id="transition-modal-title"
              variant="h6"
              component="h2"
            >
              {call != null ? call.from : <CircularProgress />}
            </Typography>
            <Button onClick={archiveCall}>Archive Call</Button>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
