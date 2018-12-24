import React, { Component } from "react";
import { getTimeInFormat } from "../../utils";
import Interval from "./Interval";

const week = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];
const newInterval = { from: "", to: "" };

class WeekSchedulePanel extends Component {
  changeInterval = (interval, dayId, intervalId) => {
    const day = week[dayId];
    let cachedSchedule = { ...this.props.schedule };

    cachedSchedule[day][intervalId] = interval;

    this.props.onScheduleChange(cachedSchedule);
  };

  removeInterval = (dayId, intervalId = null) => {
    const day = week[dayId];
    let cachedSchedule = { ...this.props.schedule };

    if (intervalId !== null) {
      cachedSchedule[day].splice(intervalId, 1);
    } else {
      delete cachedSchedule[day];
    }

    this.props.onScheduleChange(cachedSchedule);
  };

  addInterval = dayId => {
    const day = week[dayId];
    let cachedSchedule = { ...this.props.schedule };

    if (!cachedSchedule[day]) {
      cachedSchedule[day] = [];
    }

    cachedSchedule[day].push(newInterval);

    this.props.onScheduleChange(cachedSchedule);
  };

  toggleDay = (dayId, isDayWorking) => {
    if (isDayWorking) {
      this.removeInterval(dayId);
    } else {
      this.addInterval(dayId);
    }
  };

  weekList = schedule => {
    return week.map((day, dayIndex) => {
      let workingHours;
      const isDayWorking = schedule[day] && schedule[day].length;
      const dayFullName = getTimeInFormat(day, "dddd");

      if (schedule[day]) {
        workingHours = schedule[day].map((interval, idx) => (
          <Interval
            key={idx}
            interval={interval}
            intervalId={idx}
            dayId={dayIndex}
            changeInterval={this.changeInterval}
            removeInterval={this.removeInterval}
          />
        ));
      }

      return (
        <div key={day} className={"cell"}>
          <div className={"day"}>
            <div className={"day__header " + (isDayWorking ? "active" : "")}>
              <h4>{dayFullName}</h4>
              <input
                type="checkbox"
                checked={!!isDayWorking}
                onChange={() => this.toggleDay(dayIndex, isDayWorking)}
              />
            </div>
            {isDayWorking ? (
              <div>
                <span
                  className={"interval--add action"}
                  onClick={() => this.addInterval(dayIndex)}
                >
                  Add
                </span>
                {workingHours}
              </div>
            ) : (
              false
            )}
          </div>
        </div>
      );
    });
  };

  render() {
    const { schedule } = this.props;
    const weekList = this.weekList(schedule);

    return <div className={"week"}>{weekList}</div>;
  }
}

export default WeekSchedulePanel;
