import React, { Component } from 'react'
import Slider from '@material-ui/core/Slider';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
} from '@material-ui/pickers';

var SunCalc = require('suncalc');

export default class DatePicker extends Component {
        
        handleDateChange(e) {
            this.setState({date: e.target.value})
            this.props.handleCalendarChange(e.target.value);
        }
        
        render() {
        const { sunriseHour, sunsetHour} = this.props
        
        return (
            <div style={{ backgroundColor: 'whitesmoke', paddingLeft: 5 }} >
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    
                        <KeyboardDatePicker
                            disableToolbar
                            variant="inline"
                            format="MM/dd/yyyy"
                            margin="normal"
                            id="date-picker-inline"
                            label="Date/time for the sun position"
                            value={this.props.date}
                        onChange={this.props.handleCalendarChange}
                        
                            KeyboardButtonProps={{
                                'aria-label': 'change date',
                            }}
                        />
                    
                    </MuiPickersUtilsProvider>
                <div  >
                    
                <Slider
                    
                    defaultValue={12}
                    
                    aria-labelledby="discrete-slider-always"
                    valueLabelDisplay="on"
                    step={1}
                    
                        min={sunriseHour ? sunriseHour : 0}
                        max={sunsetHour ? sunsetHour : 23}
                    onChange={this.props.handleHourChange}
                    />
                <Slider
                    
                    defaultValue={30}
                    
                    aria-labelledby="discrete-slider-always"
                    valueLabelDisplay="on"
                    step={5}
                    
                        min={0}
                        max={59}
                    onChange={this.props.handleMinuteChange}
                    />
                </div>
            </div>
        )
    }
}

const sliderStyle = {
    marginLeft: '10px',
    marginRight: '10px'
}