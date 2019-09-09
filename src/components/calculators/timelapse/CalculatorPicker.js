import React from 'react'
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import { Typography } from "@material-ui/core";

export default function CalculatorPicker(props) {

    const handleChange = e => {
        props.handleChange(e)
    }
    return (
      <div>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <Typography variant="h4"> Calculate</Typography>
              </TableCell>
              

              <TableCell>
                <FormControl style={{ width: "60%", marginRight: "0%" }}>
                  <InputLabel htmlFor="select-calculate"></InputLabel>
                  <Select
                    value={props.choice}
                    onChange={handleChange}
                    input={<OutlinedInput name="choice" id="filled-age-simple" />}
                  >
                    <MenuItem value="1">Shooting interval</MenuItem>
                    <MenuItem value="2">Clip lenght</MenuItem>
                    <MenuItem value="3">Shooting duration</MenuItem>
                  </Select>
                </FormControl>
              </TableCell>
            </TableRow>
          </TableHead>
        </Table>
      </div>
    );
}
