import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import TextField from "@material-ui/core/TextField";

export default function CalculatorOptions(props) {
  const handleChange = name => event => {
    /* console.log(name);
    console.log(event.target.id);
    console.log(event.target.value); */

      const id = event.target.id;
    const value = event.target.value
    props.handleTimeChange(id, name, value);
  };

  return (
    <React.Fragment>
      {/* <Table>
        <TableBody> */}
          {/* <TableBody style={{ width: "100%" }}> */}
          {props.options
            .filter(o => o.id != props.choice)
            .map(op => {
              return (
                // Hours
                <TableRow>
                  <TableCell component="th" scope="row">
                    {op.option}
                  </TableCell>
                  <TableCell>
                    <TextField
                      variant="outlined"
                      id={op.id}
                      label="Hour"
                      value={op.hour}
                      onChange={handleChange("hour")}
                      type="number"
                      /* className={classes.textField} */
                      InputLabelProps={{
                        shrink: true
                      }}
                      margin="normal"
                    />
                  </TableCell>

                  <TableCell>
                    <TextField
                      variant="outlined"
                      id={op.id}
                      label="minute"
                      value={op.minute}
                      onChange={handleChange("minute")}
                      type="number"
                      /* className={classes.textField} */
                      InputLabelProps={{
                        shrink: true
                      }}
                      margin="normal"
                    />
                  </TableCell>

                  <TableCell>
                    <TextField
                      variant="outlined"
                      id={op.id}
                      label="sec"
                      value={op.sec}
                      onChange={handleChange("sec")}
                      type="number"
                      /* className={classes.textField} */
                      InputLabelProps={{
                        shrink: true
                      }}
                      margin="normal"
                    />
                  </TableCell>
                </TableRow>
              );
            })}
        {/* </TableBody>
      </Table> */}
      {/* </TableBody> */}
    </React.Fragment>
  );
}
