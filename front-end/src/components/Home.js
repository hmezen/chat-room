import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Paper, Grid } from "@material-ui/core";
import image from "../assets/group_chat.png";

const useStyles = makeStyles((theme) => ({
  paper: {
    width: "100%",
  },
  content: {
    padding: theme.spacing(2),
  },
  image: {
    margin: "auto",
    height: "auto",
    maxHeight: "100%",
    maxWidth: "100%",
  },
}));

function Home() {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Paper className={classes.paper}>
        <div className={classes.content}>
          <Typography variant="h1" color="primary" gutterBottom>
            Home
          </Typography>

          <Grid container spacing={3}>
            <Grid item sm={12} lg={6} xs={12}>
              <br />

              <Typography variant="h5" color="inherit" paragraph>
                Welcome to my Chat room proof-of-concept app. <br />
                This is a responsive react application where logged in users can
                connect to chat rooms and make conversations.
                <br />
                Current capabilities :
                <ul>
                  <li>Sign in</li>
                  <li>Sign up</li>
                  <li>Update profile</li>
                  <li>
                    Once logged in, the user can access chat rooms and make
                    conversations.
                  </li>
                </ul>
                <br />
                upcoming features :{" "}
                <ul>
                  <li>
                    Design enhancements and new capabilities (sending images,
                    stickers, audio, video chat, save conversations in DB...)
                  </li>
                  <li>Enable adding/deleting/updating chat rooms for admins</li>
                  <li>Private chat rooms</li>
                  <li>Sending invitations to chat rooms</li>
                </ul>
              </Typography>
            </Grid>
            <Grid item sm={12} lg={6} xs={6}>
              <img className={classes.image} src={image} alt={""} />
            </Grid>
          </Grid>
        </div>
      </Paper>
    </React.Fragment>
  );
}

export default Home;
