import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import moment from "moment";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

export default function SunPositionOverlay(props) {

  const useStyles = makeStyles(theme => ({
    root: {
      /* width: "100%" */
    },
    heading: {
      /* fontSize: theme.typography.pxToRem(15),
      fontWeight: theme.typography.fontWeightRegular */
    }
  }));
  
  const sunPaperStyle = {
    /* width: "15%", */
    float: "left",
    /* position: "relative", */
    marginLeft: '1%',
    marginTop: '20%',
    bottom: "20px",
    right: "20px",
    minWidth: "250px"
  };
  
  const classes = useStyles();
  return (
    <div className={classes.root}>
        <Paper style={sunPaperStyle}>
      <ExpansionPanel >
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.heading}>Sun position</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Typography>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>{moment(props.date).format("MMM Do")}</TableCell>
                    <TableCell align="right">Time</TableCell>
                    
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell component="th" scope="row">
                      Dawn
                    </TableCell>
                    <TableCell align="right">
                      {moment(props.suncalc.dawn).format("HH:mm")}
                    </TableCell>
                  </TableRow>
                </TableBody>
                <TableBody>
                  <TableRow>
                    <TableCell component="th" scope="row">
                      Sunrise
                    </TableCell>
                    <TableCell align="right">
                      {moment(props.suncalc.sunrise).format("HH:mm")}
                    </TableCell>
                  </TableRow>
                </TableBody>
                <TableBody>
                  <TableRow>
                    <TableCell component="th" scope="row">
                      GoldenHourEnd
                    </TableCell>
                    <TableCell align="right">
                      {moment(props.suncalc.goldenHourEnd).format("HH:mm")}
                    </TableCell>
                  </TableRow>
                </TableBody>
                <TableBody>
                  <TableRow>
                    <TableCell component="th" scope="row">
                      Goldenhour
                    </TableCell>
                    <TableCell align="right">
                      {moment(props.suncalc.goldenHour).format("HH:mm")}
                    </TableCell>
                  </TableRow>
                </TableBody>
                <TableBody>
                  <TableRow>
                    <TableCell component="th" scope="row">
                      Sunset
                    </TableCell>
                    <TableCell align="right">
                      {moment(props.suncalc.sunset).format("HH:mm")}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
          </Typography>
        </ExpansionPanelDetails>
      </ExpansionPanel>
            </Paper>

     {/*  <Paper style={sunPaperStyle}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>{moment(props.date).format("MMM Do")}</TableCell>
              <TableCell align="right">Time</TableCell>
            
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell component="th" scope="row">
                Dawn
              </TableCell>
              <TableCell align="right">
                {moment(props.suncalc.dawn).format("HH:mm")}
              </TableCell>
            </TableRow>
          </TableBody>
          <TableBody>
            <TableRow>
              <TableCell component="th" scope="row">
                Sunrise
              </TableCell>
              <TableCell align="right">
                {moment(props.suncalc.sunrise).format("HH:mm")}
              </TableCell>
            </TableRow>
          </TableBody>
          <TableBody>
            <TableRow>
              <TableCell component="th" scope="row">
                GoldenHourEnd
              </TableCell>
              <TableCell align="right">
                {moment(props.suncalc.goldenHourEnd).format("HH:mm")}
              </TableCell>
            </TableRow>
          </TableBody>
          <TableBody>
            <TableRow>
              <TableCell component="th" scope="row">
                Goldenhour
              </TableCell>
              <TableCell align="right">
                {moment(props.suncalc.goldenHour).format("HH:mm")}
              </TableCell>
            </TableRow>
          </TableBody>
          <TableBody>
            <TableRow>
              <TableCell component="th" scope="row">
                Sunset
              </TableCell>
              <TableCell align="right">
                {moment(props.suncalc.sunset).format("HH:mm")}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Paper> */}
    </div>
  );
}
