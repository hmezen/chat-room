import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Paper } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  paper: {
    width: "100%",
  },
  content: {
    padding: theme.spacing(2),
  },
}));

function Home() {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Paper className={classes.paper}>
        <div className={classes.content}>
          <Typography variant="h4" color="primary" gutterBottom>
            Home
          </Typography>

          <Typography variant="h5" color="inherit" paragraph>
            Welcome to my Chat room proof-of-concept app. <br />
            This is a responsive react application that uses Firebase for user
            authetication. a user can create an account, sign in and update
            profile. Also logged in users can connect to chat rooms and make
            conversations.
          </Typography>
        </div>
      </Paper>
    </React.Fragment>
  );
}

export default Home;
