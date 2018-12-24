import React, { Component } from "react";
import PropTypes from "prop-types";
import HumanReadableSchedule from "./HumanReadableSchedule";
import SchedulePanel from "./WeekSchedulePanel";

const propTypes = {
  store: PropTypes.object.isRequired,
  format: PropTypes.string.isRequired
};
const timeZoneList = [
  "Africa/Bangui",
  "Africa/Bamako",
  "America/New_York",
  "Europe/Bucharest"
];

class StoreEdit extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ...this.props.store,
      changed: false
    };
  }

  changeStoreNameHandler = e => {
    const value = e.target.value.trim();

    this.setState(state => {
      state.title = value;

      return {
        title: state.title,
        changed: true
      };
    });
  };

  changeSchedule = newSchedule => {
    this.setState(state => {
      state.schedule = newSchedule;

      return {
        schedule: state.schedule,
        changed: true
      };
    });
  };

  changeStoreTimeZoneHandler = e => {
    const value = e.target.value;

    this.setState(state => {
      state.timeZone = value;
      return {
        timeZone: state.timeZone,
        changed: true
      };
    });
  };

  saveChanges = () => {
    const { _id, title, schedule, timeZone } = this.state;
    this.props.saveStore({
      _id,
      title,
      schedule,
      timeZone
    });
  };

  timeZoneSelect = storeZone => {
    const options = timeZoneList.map(zone => (
      <option key={zone} value={zone}>
        {zone}
      </option>
    ));

    return (
      <select
        className={"custom-select"}
        value={storeZone}
        onChange={this.changeStoreTimeZoneHandler}
      >
        {options}
      </select>
    );
  };

  render() {
    const { format, onClose, removeStore } = this.props;
    const { _id, title, schedule, timeZone } = this.state;
    const timeZoneSelector = this.timeZoneSelect(timeZone);

    return (
      <div className={"store__item--edit"}>
        <div className={"input-group mb-3"}>
          <div className={"input-group-prepend"}>
            <span className={"input-group-text " + (!title ? "error" : "")}>
              Store name
            </span>
          </div>
          <input
            type="text"
            className={"form-control"}
            value={title}
            onChange={this.changeStoreNameHandler}
          />
        </div>
        <div className={"input-group mb-3"}>
          <div className={"input-group-prepend"}>
            <span className={"input-group-text"} id={"timezone"}>
              Store timezone
            </span>
          </div>
          {timeZoneSelector}
        </div>
        <div className={"schedule"}>
          <div className="schedule__header">
            <span>Store schedule</span>
            <label htmlFor="same-schedule">
              Same schedule everyday
              <input type="checkbox" id={"same-schedule"} />
            </label>
          </div>
          <div className="schedule__body">
            <div className={"col"}>
              <HumanReadableSchedule schedule={schedule} timeFormat={format} />
            </div>
            <div className={"col--x5"}>
              <SchedulePanel
                schedule={schedule}
                onScheduleChange={this.changeSchedule}
              />
            </div>
          </div>
        </div>
        <div className="footer">
          <button
            type="button"
            className="btn btn-danger"
            onClick={removeStore}
            disabled={!_id}
          >
            Remove store
          </button>
          <div>
            <button
              type="button"
              className="btn btn-primary"
              onClick={this.saveChanges}
            >
              Save changes
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onClose}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    );
  }
}

StoreEdit.propTypes = propTypes;

export default StoreEdit;
