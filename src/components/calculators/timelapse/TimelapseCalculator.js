import React, { Component } from "react";
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
import CalculatorPicker from "./CalculatorPicker";
import CalculatorOptions from "./CalculatorOptions";
import TextField from "@material-ui/core/TextField";
import moment from "moment";
import Box from '@material-ui/core/Box'
import Paper from '@material-ui/core/Paper'

export default class TimelapseCalculator extends Component {
  state = {
    choice: "",
    options: [
      {
        id: 1,
        option: "Shooting interval",
        hour: 0,
        minute: 0,
        sec: 0,
        result: 0
      },
      {
        id: 2,
        option: "Clip lenght",
        hour: 0,
        minute: 0,
        sec: 0,
        result: 0
      },
      {
        id: 3,
        option: "Shooting duration",
        hour: 0,
        minute: 0,
        sec: 0,
        result: 0
      }
    ],
    fps: 24,
    imageSize: 16
  };

  componentDidMount() {
    this.setState({ choice: "1" });
  }

  handleChange = value => e => {
    this.setState({ [value]: e.target.value });
    this.handleResults();
  };

  handleTimeChange = (id, name, value) => {
    const toChange = this.state.options.map(op => {
      if (op.id == id) {
        op[name] = Number(value);
      }
      return op;
    });
    console.log(toChange);
    this.setState({ options: [...toChange] });
    this.handleResults();
    /* this.setState({options: [...this.state.options, this.state.options.filter(id => id == e.target.id).e.target.label = e.target.value]}) */
  };

  handleResults = () => {
    let interval = this.state.options.filter(v => v.id == 1);
    let lenght = this.state.options.filter(v => v.id == 2);
    let duration = this.state.options.filter(v => v.id == 3);

    interval = this.optionToSecond(interval[0]);
    lenght = this.optionToSecond(lenght[0]);
    duration = this.optionToSecond(duration[0]);
    switch (this.state.choice) {
      case "1":
        return this.calculateInterval(interval, lenght, duration);
      case "2":
        return this.calculateLenght(interval, lenght, duration);
      case "3":
        return this.calculateDuration(interval, lenght, duration);
    }
  };

  optionToSecond = obj => {
    const hoursToSeconds = obj.hour * 60 * 60;
    const minutesToSeconds = obj.minute * 60;
    const seconds = obj.sec;

    return hoursToSeconds + minutesToSeconds + seconds;
  };

  secondsToTime = seconds => {
    const d = Number(seconds);
    var h = Math.floor(d / 3600);
    var m = Math.floor((d % 3600) / 60);
    var s = Math.floor((d % 3600) % 60);

    var hDisplay = h > 0 ? h + (h == 1 ? " hour, " : " hours, ") : "";
    var mDisplay = m > 0 ? m + (m == 1 ? " minute, " : " minutes, ") : "";
    var sDisplay = s > 0 ? s + (s == 1 ? " second" : " seconds") : "";
    return hDisplay + mDisplay + sDisplay;
  };

  setNewResults = obj => {
    const toChange = this.state.options.map(op => {
      if (op.id == this.state.choice) {
        op.result = obj;
      }
      return op;
    });
    this.setState({ options: [...toChange] });
  };

  calculateInterval = (interval, lenght, duration) => {
    const result = duration / (this.state.fps * lenght);
    this.setNewResults(result);
  };

  calculateLenght = (interval, lenght, duration) => {
    const result = duration / interval / this.state.fps;
    this.setNewResults(result);
  };
  calculateDuration = (interval, lenght, duration) => {
    const result = this.state.fps * lenght * interval;
    this.setNewResults(result);
  };

  render() {
    const { choice, options, fps, imageSize } = this.state;
    return (
      <div style={tableStyle2}>
        <Box borderRadius="borderRadius" style={boxWrapper}>
          <CalculatorPicker
            choice={choice}
            handleChange={this.handleChange("choice")}
          />
          <Table>
            <TableBody>
              <CalculatorOptions
                options={options}
                choice={choice}
                handleTimeChange={this.handleTimeChange}
              />
              {/* </Table>
        <Table> */}
              {/* <div> */}
                <TableRow>
                  <TableCell component="th" scope="row">
                    Frames per second
                  </TableCell>
                  <TableCell>
                    <TextField
                      variant="outlined"
                      id={fps}
                      label="fps"
                      value={fps}
                      onChange={this.handleChange("fps")}
                      type="number"
                      /* className={classes.textField} */
                      InputLabelProps={{
                        shrink: true
                      }}
                      margin="normal"
                    />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th" scope="row">
                    Image size
                  </TableCell>
                  <TableCell align="left">
                    <TextField
                      variant="outlined"
                      id={imageSize}
                      label="imageSize"
                      value={imageSize}
                      onChange={this.handleChange("imageSize")}
                      type="number"
                      /* className={classes.textField} */
                      InputLabelProps={{
                        shrink: true
                      }}
                      margin="normal"
                    />
                  </TableCell>
                </TableRow>
              {/* </div> */}
            </TableBody>
          </Table>
          <div>
            <br></br>
            {this.state.options
              .filter(opt => opt.id == choice)
              .map(result => {
                return (
                  <Typography variant="h4">
                    {result.option} : {this.secondsToTime(result.result)}
                  </Typography>
                );
              })}
            <hr></hr>
            <Typography variant="h4">
              Total pictures: {this.optionToSecond(this.state.options[1]) * fps}
            </Typography>
            <hr></hr>
            <Typography variant="h4">
              Memory usage:{" "}
              {this.optionToSecond(this.state.options[1]) * fps * imageSize} MB
            </Typography>
          </div>
        </Box>
      </div>
    );
  }
}
const boxWrapper = {
  backgroundColor: "ghostwhite",
  
  paddingBottom: 20
};
const tableStyle2 = {
  backgroundColor: "ghostwhite",
  color: "black",
  borderRadius: "borderRadius",
/* marginTop: "50px", */
  margin: '5%',
  flexGrow: 1,
  /* padding: "5%", */
  paddingBottom: "50px"
};
