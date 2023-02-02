import React, { Component } from "react";
import SessionContext from "../util/SessionContext";
import axios from "axios";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Typography,
} from "@mui/material";
import RouterLink from "./RouterLink.react";
import AxiosErrors from "../util/AxiosErrors";
import { Navigate } from "react-router-dom";
import { Page } from "../constants/Page";

class ReportOneDate extends Component {
  constructor(props) {
    super(props);
    this.state = { data: [], notfound: false };
  }
  static contextType = SessionContext;

  getTodayLocalDateOnly = () => {
    // Comments show conversion of example date from UTC to Pacific Daylight Time
    const todayUtc = new Date(); // 2020-03-26T00:34:03.194Z (local time is 3/25 17:34, so we need to fix the date)
    const offset = todayUtc.getTimezoneOffset(); // 420
    const minutesAdjusted = todayUtc.setMinutes(todayUtc.getMinutes() - offset); //1585157643194
    return new Date(minutesAdjusted).toISOString().substring(0, 10); // 2020-03-25T17:34:03.194Z => "2020-03-25"
  };

  todayString = this.getTodayLocalDateOnly(); // local date in string formatted as YYYY-MM-DD
  reportDateString =
    this.props.date === "today" ? this.todayString : this.props.date;

  componentDidMount() {
    const { userId } = this.context.session;
    const timezone = encodeURIComponent(
      Intl.DateTimeFormat().resolvedOptions().timeZone
    );
    const endpoint = `${process.env.REACT_APP_API_ENDPOINT}/reports/onedate/${this.reportDateString}/${timezone}/${userId}`;

    axios
      .get(endpoint)
      .then((res) => {
        //console.log(res.data);
        if (res.data.length === 0) {
          console.log(
            "No exercises found for " +
              this.reportDateString +
              ". Redirecting to all dates."
          );
        }
        this.setState({ data: res.data, notfound: res.data.length === 0 });
      })
      .catch((err) => AxiosErrors(err));
  }

  render() {
    const { data, notfound } = this.state;
    if (notfound) {
      return <Navigate to={Page.reports.link_path} />;
    }
    const isToday = this.reportDateString === this.todayString;
    //converting from format YYYY-MM-DD results in the GMT date, not local date.
    //to prevent this, we have to convert the format to YYYY/MM/DD. see this post:
    //https://stackoverflow.com/questions/7556591/is-the-javascript-date-object-always-one-day-off
    const friendlyDate = new Date(
      this.reportDateString.replace(/-/g, "/")
    ).toDateString();
    return (
      <>
        <h3>{isToday ? "Today's Activity" : "Activity for " + friendlyDate}</h3>
        {!isToday && (
          <Typography>
            Editing is only possible for exercises performed on today's date.
          </Typography>
        )}
        <RouterLink to={Page.reports.link_path}>
          View activity for another date
        </RouterLink>
        <Table style={{ maxWidth: 600, margin: "0 auto" }} size="small">
          <TableHead>
            <TableRow>
              <TableCell>Category</TableCell>
              <TableCell>Words</TableCell>
              {isToday && <TableCell>Actions</TableCell>}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((d, i) => {
              return (
                <TableRow key={i} style={{ verticalAlign: "top" }}>
                  <TableCell>
                    {d.category}
                    <br />
                  </TableCell>
                  <TableCell>
                    <u>{d.words.length} words</u>:{" "}
                    <span>{d.words.join(", ")}</span>
                  </TableCell>
                  {isToday && (
                    <TableCell>
                      <RouterLink to={Page.editexercise.link_path + d._id}>
                        Edit
                      </RouterLink>
                    </TableCell>
                  )}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </>
    );
  }
}

export default ReportOneDate;
