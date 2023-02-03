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

import AxiosErrors from "../util/AxiosErrors";
// import PageviewIcon from "@mui/icons-material/Pageview";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { Link as RLink } from "react-router-dom";
import { Page, ReportParam } from "../constants/Page";

class ReportAllDates extends Component {
  constructor(props) {
    super(props);
    this.state = { data: null };
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
        this.setState({
          data: res.data.sort((a, b) =>
            a._id > b._id ? -1 : b._id > a._id ? 1 : 0
          ),
        });
      })
      .catch((err) => {
        AxiosErrors(err);
      });
  }
  render() {
    const { data } = this.state;
    if (!data) {
      return;
    }
    return (
      <>
        {data.length === 0 && (
          <>
            <Typography variant="h6">No Exercises Found</Typography>
            <Typography>
              No exercises were found for this user in the database.
            </Typography>
            <Typography>
              Make sure you are logged in and have completed at least one
              exercise.
            </Typography>
          </>
        )}

        {data.length > 0 && (
          <>
            <Typography variant="h6">Summary: Activity by Date</Typography>
            <Table sx={{ maxWidth: "sm", mx: "auto", mt: 2 }} size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Date</TableCell>
                  <TableCell sx={{ pl: 0 }}>Exercises</TableCell>
                  <TableCell sx={{ px: 0 }}>View Detail</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((d, i) => {
                  return (
                    <TableRow key={i}>
                      <TableCell>{d._id}</TableCell>
                      <TableCell>{d.sum}</TableCell>
                      <TableCell sx={{ px: 0 }}>
                        <RLink
                          to={
                            Page.report.link_path + ReportParam.onedate + d._id
                          }
                        >
                          {/* <PageviewIcon color="primary" fontSize="large" /> */}
                          <VisibilityIcon color="primary" fontSize="large" />
                        </RLink>
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
