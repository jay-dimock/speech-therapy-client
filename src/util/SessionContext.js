import React from "react";

const SessionContext = React.createContext({
  session: {},
  setSession: () => {},
});

export default SessionContext;
