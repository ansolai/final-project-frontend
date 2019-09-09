import React, { useState} from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles(theme => ({
  main: {},
  root: {
    backgroundColor: "ghostwhite",
    color: "black",
    borderRadius: "borderRadius",
    margin: "2%",
    flexGrow: 1,
    padding: "2%",
    marginTop: theme.spacing(3)
  },
  table: {},
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120
  }
}));

export default function Fov() {
  const classes = useStyles();

  const [state, setState] = useState({
    sensor: 40,
      focal: 50,
  });

  const handleChange = name => event => {
    setState({
      ...state,
      [name]: event.target.value
    });
    };

  return (
    <div>
      <div className={classes.root}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>
                <Typography variant="h4"> Calculate Field of View</Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell component="th" scope="row">
                <Typography variant="h6">Sensor width</Typography>
              </TableCell>
              <TableCell>
                <TextField
                  variant="outlined"
                  style={{ width: "200px", marginRight: "10%" }}
                  id="sensor-select"
                  label="Objective"
                  value={state.sensor}
                  onChange={handleChange("sensor")}
                  type="number"
                  /* className={classes.textField} */
                  InputLabelProps={
                    {
                      /* shrink: true */
                    }
                  }
                  margin="normal"
                />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell component="th" scope="row">
                <Typography variant="h6">Focal length</Typography>
              </TableCell>
              <TableCell>
                <TextField
                  variant="outlined"
                  style={{ width: "200px", marginRight: "10%" }}
                  id="focal-select"
                  label="Focal length"
                  value={state.focal}
                  onChange={handleChange("focal")}
                  type="number"
                  /* className={classes.textField} */
                  InputLabelProps={
                    {
                      /* shrink: true */
                    }
                  }
                  margin="normal"
                />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
        <TableRow>
          <TableCell component="th" scope="row">
            <Typography variant="h4">
              Field of View: {Math.round(Math.atan2((state.sensor / 2), state.focal) * 100)}
            </Typography>
          </TableCell>
        </TableRow>
      </div>
    </div>
  );
}
