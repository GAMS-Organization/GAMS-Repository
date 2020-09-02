import React from "react";
import moment from "moment";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "../../../styles/sass/styles.scss";
import {
  rooftopBlueColor,
} from "../../../styles/jss/material-dashboard-react";
import NewEvent from './NewEvent';
import Slide from '@material-ui/core/Slide';
import UpdateEvent from './UpdateEvent';

class PreventiveCalendar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      localizer: momentLocalizer(moment),
      events: [],

    };
  }

  handleClickCreateEvent = event => {
    const events = this.state.events;
    events.push(event);
    this.setState({ events });
  };

  handleClickShowCreateModal = slot => {
    this.setState({ slot, event:false });
    this.child.showModal();
  };

  handleClickUpdateEvent = event => {
    const events = this.state.events;
    events.push(event);
    this.setState({ events });
  };

  handleClickShowUpdateModal = event => {
    this.setState({ event, slot: false });
    this.child.showModal();
  };

  render(){
    const Transition = React.forwardRef(function Transition(props, ref) {
      return <Slide direction="down" ref={ref} {...props} />;
    });
    return (
      <>
      <Calendar
        localizer={this.state.localizer}
        events={this.state.events}
        views={['month']}
        startAccessor="start"
        endAccessor="end"
        selectable={true}
        onSelectSlot={(e) => this.handleClickShowCreateModal(e)}
        onSelectEvent={(e) => this.handleClickShowUpdateModal(e)}
        style={{
          height: 500,
          fontWeight: 400,
          color: rooftopBlueColor[0]
        }}
      />
        {this.state.slot?
          <NewEvent
            event={this.state.slot}
            create={this.handleClickCreateEvent}
            onRef={ref => (this.child = ref)}
            Transition={Transition}
          />
          : null
        }
        {this.state.event?
          <UpdateEvent
            event={this.state.event}
            create={this.handleClickUpdateEvent}
            onRef={ref => (this.child = ref)}
            Transition={Transition}
          />
          : null
        }
      </>
    );
  }
}

export default PreventiveCalendar;
