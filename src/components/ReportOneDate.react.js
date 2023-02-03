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
import { Link as RLink, Navigate } from "react-router-dom";
import { Page } from "../constants/Page";
import EditIcon from "@mui/icons-material/Edit";

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
        <Typography variant="h6">
          {isToday ? "Today's Activity" : "Activity for " + friendlyDate}
        </Typography>
        {!isToday && (
          <Typography mb={1}>
            Editing is only possible for exercises performed on today's date.
          </Typography>
        )}
        <RouterLink to={Page.reports.link_path}>View another date</RouterLink>
        <Table sx={{ maxWidth: "sm", mx: "auto", mt: 2 }} size="small">
          <TableHead>
            <TableRow>
              <TableCell>Category</TableCell>
              {isToday && <TableCell sx={{ px: 0 }}>Edit</TableCell>}
              <TableCell>Words</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((d, i) => {
              return (
                <TableRow key={i} style={{ verticalAlign: "top" }}>
                  <TableCell sx={{ pr: isToday ? 0 : 1 }}>
                    {d.category}
                  </TableCell>
                  {isToday && (
                    <TableCell sx={{ px: 0 }}>
                      <RLink to={Page.editexercise.link_path + d._id}>
                        <EditIcon color="primary" />
                      </RLink>
                    </TableCell>
                  )}
                  <TableCell>
                    <b>
                      {d.words.length} WORD{d.words.length !== 1 && "S"}
                    </b>
                    : <span>{d.words.join(", ")}</span>
                  </TableCell>
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
