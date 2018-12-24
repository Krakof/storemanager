import React, { Component } from "react";

class Interval extends Component {
  constructor(props) {
    super(props);

    this.start = null;
    this.end = null;
  }

  changeIntervalHandler = () => {
    const { intervalId, dayId, changeInterval } = this.props;
    const interval = {
      from: this.start.value,
      to: this.end.value
    };

    changeInterval(interval, dayId, intervalId);
  };

  removeIntervalHandler = () => {
    const { intervalId, dayId, removeInterval } = this.props;

    removeInterval(dayId, intervalId);
  };

  render() {
    const { interval } = this.props;

    return (
      <div className={"interval"}>
        <input
          ref={node => (this.start = node)}
          type="time"
          value={interval.from}
          onChange={this.changeIntervalHandler}
        />
        <span> - </span>
        <input
          ref={node => (this.end = node)}
          type="time"
          value={interval.to}
          onChange={this.changeIntervalHandler}
        />
        <span
          className={"interval--remove action"}
          onClick={this.removeIntervalHandler}
        >
          &times;
        </span>
      </div>
    );
  }
}

export default Interval;
