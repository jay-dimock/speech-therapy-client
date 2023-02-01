import React, { Component } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import SessionContext from "./util/SessionContext";
import { getSessionCookie, setSessionCookie } from "./util/SessionCookie";
import { Page } from "./constants/Page";
import Main from "./views/Main.react";
import Login from "./views/Login.react";
import Register from "./views/Register.react";
import Logout from "./views/Logout.react";
import Exercise from "./views/Exercise.react";
import StartExercise from "./views/StartExercise.react";
import EditExercise from "./views/EditExercise.react";
import Reports from "./views/Reports.react";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      session: getSessionCookie(),
      setSession: (value) => {
        this.setState({ session: value });
        setSessionCookie(value);
      },
    };
  }

  theme = createTheme({
    palette: {
      primary: { main: "#28a745" },
      secondary: { main: "#000000" },
    },
  });

  render() {
    return (
      <ThemeProvider theme={this.theme}>
        <SessionContext.Provider value={this.state}>
          <CssBaseline />
          <Router>
            <Routes>
              <Route path={Page.home.route_path} element={<Main />} />
              <Route path={Page.login.route_path} element={<Login />} />
              <Route path={Page.register.route_path} element={<Register />} />
              <Route path={Page.logout.route_path} element={<Logout />} />
              <Route path={Page.exercise.route_path} element={<Exercise />} />
              <Route
                path={Page.startexercise.route_path}
                element={<StartExercise />}
              />
              <Route
                path={Page.editexercise.route_path}
                element={<EditExercise />}
              />
              <Route path={Page.reports.route_path} element={<Reports />} />

              {/* <EditExercise path="editexercise/:id" />              
              <Reports path="reports/:report/:param" />  
              <Reports path="reports" />   */}
            </Routes>
          </Router>
        </SessionContext.Provider>
      </ThemeProvider>
    );
  }
}
//export default App;
