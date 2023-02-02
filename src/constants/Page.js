export const ExerciseParam = {
  fresh: "/fresh",
  restart: "/restart",
  notallowed: "/notallowed",
  instructions: "/instructions",
};

export const ReportParam = {
  alldates: "/alldates",
  onedate: "/onedate/",
};

export const Page = {
  home: {
    key: "home",
    link_text: "About",
    route_path: "/",
    link_path: "/",
    menu_param: "",
  },
  login: {
    key: "login",
    link_text: "Log In",
    route_path: "login",
    link_path: "/login",
    menu_param: "",
  },
  register: {
    key: "register",
    link_text: "Register",
    route_path: "register",
    link_path: "/register",
    menu_param: "",
  },
  logout: {
    key: "logout",
    link_text: "Log Out",
    route_path: "logout",
    link_path: "/logout",
    menu_param: "",
  },
  exercise: {
    key: "exercise",
    link_text: "Exercises",
    route_path: "exercise/:param",
    link_path: "/exercise",
    menu_param: ExerciseParam.fresh,
  },
  startexercise: {
    key: "startexercise",
    link_text: "Exercise",
    route_path: "startexercise",
    link_path: "/startexercise",
    menu_param: "",
  },
  editexercise: {
    key: "editexercise",
    link_text: "Results",
    route_path: "editexercise/:id",
    link_path: "/editexercise/",
    menu_param: "",
  },
  reports: {
    key: "reports",
    link_text: "Reports",
    route_path: "reports",
    link_path: "/reports",
    menu_param: "",
  },
  report: {
    key: "report",
    link_text: "Report",
    route_path: "reports/:report/:param",
    link_path: "/report",
    menu_param: "",
  },
};
