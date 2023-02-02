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

class ReportAllDates extends Component {
  constructor(props) {
    super(props);
    this.state = { data: [] };
  }
  static contextType = SessionContext;
  componentDidMount() {
    const { session } = this.context;
    const timezone = encodeURIComponent(
      Intl.DateTimeFormat().resolvedOptions().timeZone
    );
    const endpoint = `${process.env.REACT_APP_API_ENDPOINT}/reports/alldates/${timezone}/${session.userId}`;
    axios
      .get(endpoint)
      .then((res) => {
        //console.log(res.data);
        this.setState({ data: res.data });
        //setLoaded(true);
      })
      .catch((err) => {
        AxiosErrors(err);
      });
  }
  render() {
    const { data } = this.state;
    return (
      <>
        {data.length === 0 && (
          <>
            <h3>No Exercises Found</h3>
            <p>
              No exercises were found for this user in the database.
              <br />
              Make sure you are logged in and have completed at least one
              exercise.
            </p>
          </>
        )}

        {data.length > 0 && (
          <>
            <h3>Summary: Activity by Date</h3>
            <Table style={{ maxWidth: 400, margin: "0 auto" }} size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Date</TableCell>
                  <TableCell>Exercises</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((d, i) => {
                  return (
                    <TableRow key={i}>
                      <TableCell>{d._id}</TableCell>
                      <TableCell>{d.sum}</TableCell>
                      <TableCell>
                        <RouterLink to={"/reports/onedate/" + d._id}>
                          View Exercises
                        </RouterLink>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </>
        )}
      </>
    );
  }
}

export default ReportAllDates;
