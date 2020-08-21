import React, { Component } from 'react';
import './App.css';
import SolarSystem from './SolarSystem.js';
import ControlPanel from './ControlPanel.js';
import Const from "./Constants.js";

const FRAMES_PER_SECOND = 30;
const DAYS_PER_SECOND = 2;

const SUN_POSITION = {x: 300, y: 300};
const EARTH_ORBIT_RADIUS = 250;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      day: 0,
      lastUpdateMs: null,
      playing: true,
      positions: this.calculatePositions(0),
    };
  }

  calculatePositions(day) {
    var result = {};
    result.sunPosition = SUN_POSITION;
    result.earthPosition = this.earthPosition(day, result.sunPosition);
    result.earthRotation = this.earthRotation(day, result.earthPosition);
    result.moonPosition = this.moonPosition(day, result.earthPosition);
    result.moonRotation = this.moonRotation(day, result.moonPosition);
    return result;
  }

  earthPosition(day, sunPosition) {
    var yearPortion = day/Const.EARTH_ORBIT_PERIOD;
    var angle = 2*Math.PI*yearPortion;
    var radius = EARTH_ORBIT_RADIUS;
    var x = Math.cos(angle)*radius;
    var y = Math.sin(angle)*radius;
    return {x:sunPosition.x+x, y:sunPosition.y+y};
  }

  moonPosition(day, earthPosition) {
    var monthPortion = day/Const.MOON_ORBIT_PERIOD;
    var angle = 2*Math.PI*monthPortion;
    var radius = 20;
    var x = Math.cos(angle)*radius;
    var y = Math.sin(angle)*radius;
    return {x:earthPosition.x+x, y:earthPosition.y+y};
  }

  earthRotation(day, earthPosition) {
    var angle = (day % 1) / 1 * 2 * Math.PI;
    var radius = 8;
    var x = Math.cos(angle)*radius;
    var y = Math.sin(angle)*radius;
    return {x:earthPosition.x+x, y:earthPosition.y+y};
  }

  moonRotation(day, moonPosition) {
    var angle = (day % Const.MOON_ORBIT_PERIOD) / Const.MOON_ORBIT_PERIOD * 2 * Math.PI;
    angle += Math.PI;
    var radius = 4;
    var x = Math.cos(angle)*radius;
    var y = Math.sin(angle)*radius;
    return {x:moonPosition.x+x, y:moonPosition.y+y};
  }

  componentDidMount() {
    this.play();
  }

  componentWillUnmount() {
    this.pause();
  }

  play() {
    this.timerID = setInterval(
      () => this.tick(),
      1000 / FRAMES_PER_SECOND
    );
  }

  pause() {
    clearInterval(this.timerID);
    this.setState({lastUpdateMs: null});
  }

  registerContext(ctx) {
    this.setState(ctx: ctx);
  }

  tick() {
    let dt = null
    let t = Date.now();
    if (this.state.lastUpdateMs) {
      dt = (t - this.state.lastUpdateMs) / 1000;
    } else {
      dt = 1 / FRAMES_PER_SECOND;
    }
    let day = this.state.day + dt * DAYS_PER_SECOND;
    let positions = this.calculatePositions(day);
    this.setState({
      lastUpdateMs: t,
      day: day,
      positions: positions,
    });
  }

  playPause() {
    if (this.state.playing) {
      this.pause();
    } else {
      this.play();
    }
    this.setState({
      playing: !this.state.playing,
    });
  }

  updateDay(day) {
    if (isNaN(day)) {
      return;
    }
    this.setState({
      day: day,
      positions: this.calculatePositions(day),
    });

  }

  render() {
    return (
      <div className="App">
        <ControlPanel
          playing={this.state.playing}
          playPause={this.playPause.bind(this)}
          day={this.state.day}
          updateDay={this.updateDay.bind(this)}
        ></ControlPanel>
        <SolarSystem
          positions={this.state.positions}>
        </SolarSystem>
      </div>
    );
  }
}

export default App;
