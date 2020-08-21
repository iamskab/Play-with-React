import React, { Component } from 'react';
import './Canvas.css';

class SolarSystem extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidUpdate() {
    var canvas = document.getElementById('SolarSystem');
    this.ctx = canvas.getContext('2d');
    this.renderScene();

    return true;
  }

  renderScene() {
    this.ctx.clearRect(0, 0, 1000, 1000);
    this.drawCircle(this.props.positions.sunPosition, 50);
    this.drawCircle(this.props.positions.earthPosition, 5);
    this.drawLine(this.props.positions.earthPosition, this.props.positions.earthRotation);
    this.drawCircle(this.props.positions.moonPosition, 2);
    this.drawLine(this.props.positions.moonPosition, this.props.positions.moonRotation);
  }

  drawCircle(pos, radius) {
    this.ctx.beginPath();
    this.ctx.arc(pos.x, pos.y, radius, 0, Math.PI * 2, true);
    this.ctx.fill();
  }

  drawLine(start, end) {
    this.ctx.beginPath();
    this.ctx.moveTo(start.x, start.y);
    this.ctx.lineTo(end.x, end.y);
    this.ctx.stroke();
  }

  render() {
    return (
      <canvas id="SolarSystem" className="Canvas" width="600" height="600"></canvas>
    );
  }
}

export default SolarSystem;
