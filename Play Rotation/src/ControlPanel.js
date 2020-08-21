import React, { Component } from 'react';
import './ControlPanel.css';
import Const from './Constants.js';
import moment from 'moment';

class ControlPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  playPauseText() {
    if (this.props.playing) {
      return "Pause";
    } else {
      return "Play";
    }
  }

  precisionRound(number, precision) {
    var factor = Math.pow(10, precision);
    return Math.round(number * factor) / factor;
  }

  plusOneDay() {
    this.props.updateDay(this.props.day + 1);
  }

  plusOneWeek() {
    this.props.updateDay(this.props.day + 7);
  }

  plusOneMoon() {
    this.props.updateDay(this.props.day + Const.MOON_ORBIT_PERIOD);
  }

  plusOneYear() {
    this.props.updateDay(this.props.day + Const.EARTH_ORBIT_PERIOD);
  }

  dayText() {
    return moment().dayOfYear(this.props.day).format("MMMM Do");
  }

  render() {
    let dayField = null;
    if (this.props.playing) {
      dayField = ""
    } else {
      dayField = <div>
        <button
          onClick={this.plusOneDay.bind(this)}>
          +1 Day
        </button>
        <button
          onClick={this.plusOneWeek.bind(this)}>
          +1 Week
        </button>
        <button
          onClick={this.plusOneMoon.bind(this)}>
          +1 Lunar Cycle
        </button>
        <button
          onClick={this.plusOneYear.bind(this)}>
          +1 Year
        </button>
      </div>;
    }
    return (
      <div className="ControlPanel">
        <button
          onClick={this.props.playPause}>
          {this.playPauseText()}
        </button>
        <span>
          {this.dayText()}
        </span>
        {dayField}
      </div>
    );
  }
}

export default ControlPanel;
