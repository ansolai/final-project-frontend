import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import MenuItem from "@material-ui/core/MenuItem";
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

export default function Cropfactor() {
  const classes = useStyles();

  const [state, setState] = useState({
    frame: 1,
    objective: 40
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
                <Typography variant="h4"> Calculate Crop Factor</Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell component="th" scope="row">
                <Typography variant="h6">Frame</Typography>
              </TableCell>
              <TableCell>
                <FormControl style={{ width: "200px",/*  marginRight: "10%" */ }}>
                  <InputLabel htmlFor="select-calculate"></InputLabel>
                  <Select
                    value={state.frame}
                    onChange={handleChange("frame")}
                    input={
                      <OutlinedInput name="choice" id="filled-age-simple" />
                    }
                  >
                    <MenuItem value="1">Full Frame</MenuItem>
                    <MenuItem value="1.5">APS-C (1.5)</MenuItem>
                    <MenuItem value="1.6">APS-C (1.6)</MenuItem>
                    <MenuItem value="2">Four Thirds</MenuItem>
                    <MenuItem value="2.7">1" type</MenuItem>
                  </Select>
                </FormControl>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell component="th" scope="row">
                <Typography variant="h6">Objective</Typography>
              </TableCell>
              <TableCell >
                  <TextField
                    variant="outlined"
                    style={{ width: "200px", marginRight: "10%" }}
                    id="objective-select"
                    label="Objective"
                    value={state.objective}
                    onChange={handleChange("objective")}
                    type="number"
                    /* className={classes.textField} */
                    InputLabelProps={{
                      /* shrink: true */
                    }}
                    margin="normal"
                  />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
        <TableRow>
          <TableCell component="th" scope="row">
            <Typography variant="h4">
              Crop Factor: {Math.round(state.objective * state.frame)}mm
            </Typography>
          </TableCell>
        </TableRow>
      </div>
    </div>
  );
}
