import React from "react";

import { areArraysOfObjectsEqual, getTimeInFormat } from "../../utils";

const getHumanReadableSchedule = (schedule, timeFormat) => {
  // temp object used to merge weekdays with the same working intervals;
  let temp = {
      range: [],
      days: []
    },
    result = [],
    count = 0;
  const week = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];

  for (let day of week) {
    let dayWorkingHours =
      schedule[day] && schedule[day].length ? schedule[day] : ["Closed"]; // if no schedule for current weekday set as 'Closed'

    //check if working intervals of the day and previous day(s) are equals
    if (areArraysOfObjectsEqual(dayWorkingHours, temp.range)) {
      temp.days.push(day);
    } else {
      if (temp.range.length) {
        result.push(temp);
      }

      temp = {
        range: dayWorkingHours,
        days: [day]
      };
    }

    if (week.length - 1 === count++) {
      result.push(temp);
    }
  }

  return humanizeSchedule(result, timeFormat);
};

const humanizeSchedule = (timing, format) => {
  let scheduleObj = {};

  timing.forEach(({ range, days }) => {
    let workingHours = range.map(interval => {
      if (typeof interval !== "string") {
        return `${getTimeInFormat(interval.from, format)} - ${getTimeInFormat(
          interval.to,
          format
        )}`;
      }

      return interval;
    });

    let joinDays =
      days.length > 1 ? `${days[0]}-${days[days.length - 1]}` : days[0];

    scheduleObj[joinDays.toUpperCase()] = workingHours;
  });

  return scheduleObj;
};

const HumanReadableSchedule = ({ schedule, timeFormat }) => {
  const formattedSchedule = getHumanReadableSchedule(schedule, timeFormat);

  const schedulePreview = Object.keys(formattedSchedule).map(day => {
    const intervalList = formattedSchedule[day].map((interval, idx) => (
      <div key={idx}>{interval}</div>
    ));

    return (
      <div key={day} className={"day"}>
        <span className={"day__name"}>{day}:</span>
        <div className={"day__interval"}>{intervalList}</div>
      </div>
    );
  });

  return <div className={"schedule__preview"}>{schedulePreview}</div>;
};

export default HumanReadableSchedule;
