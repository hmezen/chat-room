import React from "react";
import { Route, Switch } from "react-router-dom";
import Header from "./components/header/Header";
import Home from "./components/Home";
import GenericNotFoundPage from "./components/GenericNotFoundPage";
import { makeStyles } from "@material-ui/core/styles";
import { useAuth } from "./firebase/firebaseProvider";
import PrivateRoute from "./components/PrivateRoute";
import LoginRequiredPage from "./components/LoginRequiredPage";
import PrivatePage from "./components/PrivatePage";
import AccessDenied from "./components/AccessDenied";
import ChatRooms from "./components/chatRoom/ChatRoomPage";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    padding: theme.spacing(2),
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
  },
}));

function App() {
  const classes = useStyles();
  const { loading } = useAuth();

  if (loading) {
    return <div>loading ...</div>;
  }
  return (
    <>
      <div className={classes.root}>
        <Header />
        <main className={classes.content}>
          <div className={classes.appBarSpacer} />
          <Switch>
            <Route path="/" component={Home} exact />
            <Route path="/loginRequired" component={LoginRequiredPage} exact />
            <PrivateRoute path="/chatRoom" component={ChatRooms} exact />
            <Route path="/accessDenied" component={AccessDenied} exact />
            <Route component={GenericNotFoundPage} exact />
          </Switch>
        </main>
      </div>
    </>
  );
}

export default App;
