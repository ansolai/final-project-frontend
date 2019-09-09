import React from "react";
import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import TimelapseCalculator from "./timelapse/TimelapseCalculator";
import Cropfactor from "./cropfactor/Cropfactor";
import Fov from "./fov/Fov";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      <Box p={3}>{children}</Box>
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`
  };
}

const useStyles = makeStyles(theme => ({
  root: {
    /* backgroundColor: "ghostwhite",*/
    /* width: "60%",  */
    backgroundColor: "ghostwhite",
    color: "black",
    borderRadius: "borderRadius",
    marginTop: "5%",
    flexGrow: 1,
        marginLeft: "10%",
    marginRight: "10%"
  }
}));

export default function FullWidthTabs() {
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  function handleChange(event, newValue) {
    setValue(newValue);
  }

  function handleChangeIndex(index) {
    setValue(index);
  }

  return (
    <div className={classes.root}>
      <AppBar position="relative" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          centered
          aria-label="full width tabs example"
        >
          <Tab label="Timelapse" {...a11yProps(0)} />
          <Tab label="Crop Factor" {...a11yProps(1)} />
          <Tab label="FOV" {...a11yProps(2)} />
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === "rtl" ? "x-reverse" : "x"}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={value} index={0} dir={theme.direction}>
          <TimelapseCalculator/>
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
          <Cropfactor></Cropfactor>
        </TabPanel>
        <TabPanel value={value} index={2} dir={theme.direction}>
          <Fov/>
        </TabPanel>
      </SwipeableViews>
    </div>
  );
}

/* import React, { Component } from "react";
import TimelapseCalculator from "./timelapse/TimelapseCalculator";
import Cropfactor from "./cropfactor/Cropfactor";
import Fov from "./fov/Fov";
export default class Calculators extends Component {
  render() {
    return (
      <div>
        <TimelapseCalculator />
        <Cropfactor />
        <Fov></Fov>
      </div>
    );
  }
} */
