import React from "react";
import moment from "moment";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "../../../styles/sass/styles.scss";
import {
  rooftopBlueColor,
  rooftopOrangeColor
} from "../../../styles/jss/material-dashboard-react";

const localizer = momentLocalizer(moment);

function eventStyleGetter(event) {
  const style = {
    // backgroundColor: event.hexColor,
    backgroundColor: "#5cb860",
    color: "black",
    border: "0px",
    display: "block"
  };
  return {
    style: style
  };
}

export default function PreventiveCalendar({ trainingsObject }) {
  return (
    <Calendar
      localizer={localizer}
      events={[{
        title: 'string',
        start: new Date(),
        end: new Date(),
      }]}
      startAccessor="start"
      endAccessor="end"
      style={{
        height: 500,
        fontWeight: 400,
        color: rooftopBlueColor[0]
      }}
    />
  );
}

function getClassesFromTrainingsObject(trainingsObject) {
  var training;
  var trainings = [];
  for (const finishedTraining of trainingsObject.finishedTrainings) {
    training = finishedTraining.trainingClasses.map(trainingClass => {
      const { id, startDate, finishDate } = trainingClass;
      const { start, end } = getCourseTimes(startDate, finishDate);
      return {
        id,
        title: deletedTitle(finishedTraining.name),
        allDay: false,
        start,
        end,
        hexColor: "#BFBFBF"
      };
    });
    trainings = [...trainings, ...training];
  }
  for (const currentTraining of trainingsObject.currentTrainings) {
    let trainingColor = rooftopOrangeColor[Math.trunc(Math.random() * 9)];

    training = currentTraining.trainingClasses.map(trainingClass => {
      const { id, startDate, finishDate } = trainingClass;

      const { start, end } = getCourseTimes(startDate, finishDate);
      return {
        id,
        title: currentTraining.name,
        allDay: false,
        start,
        end,
        hexColor: trainingColor
      };
    });
    trainings = [...trainings, ...training];
  }
  return trainings;
}

function getCourseTimes(startDate, finishDate) {
  const [courseStartDate, courseStartHour] = startDate.split(" ");
  const [startYear, startMonth, startDay] = courseStartDate.split("-");
  const [startHour, startMinute] = courseStartHour.split(":");

  const [courseEndDate, courseEndHour] = finishDate.split(" ");
  const [endYear, endMonth, endDay] = courseEndDate.split("-");
  const [endHour, endMinute] = courseEndHour.split(":");

  return {
    start: new Date(startYear, startMonth, startDay, startHour, startMinute),
    end: new Date(endYear, endMonth, endDay, endHour, endMinute)
  };
}

const deletedTitle = title => (
  <div>
    <div style={{ display: "inline-block" }}>{`${title} -`}</div>
    <div style={{ color: "#CA2D2D", display: "inline-block" }}>
      &nbsp;{"Finalizado"}
    </div>
  </div>
);
