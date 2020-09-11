import React from 'react';
import moment from 'moment';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import '../../../styles/sass/styles.scss';
import { rooftopBlueColor } from '../../../styles/jss/material-dashboard-react';
import NewEvent from './NewEvent';
import Slide from '@material-ui/core/Slide';
import UpdateEvent from './UpdateEvent';

class PreventiveCalendar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      localizer: momentLocalizer(moment),
      events: [],
      showNewEventModal: false,
      showUpdateEventModal: false,
    };
  }

  handleClickCreateEvent = event => {
    const events = this.state.events;
    events.push(event);
    this.setState({ events });
  };

  handleClickShowCreateModal = slot => {
    this.setState({ slot, event: false, showNewEventModal: true });
  };

  handleClickUpdateEvent = event => {
    const events = this.state.events;
    events.push(event);
    this.setState({ events });
  };

  handleClickShowUpdateModal = event => {
    this.setState({ event, slot: false, showUpdateEventModal: true });
  };

  handleClose = () => {
    this.setState({ slot: false, event: false, showNewEventModal: false, showUpdateEventModal: false });
  };

  render() {
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
          onSelectSlot={e => this.handleClickShowCreateModal(e)}
          onSelectEvent={e => this.handleClickShowUpdateModal(e)}
          style={{
            height: 500,
            fontWeight: 400,
            color: rooftopBlueColor[0],
          }}
        />
        {this.state.slot && this.state.showNewEventModal ? (
          <NewEvent
            event={this.state.slot}
            create={this.handleClickCreateEvent}
            Transition={Transition}
            closeHandler={this.handleClose}
          />
        ) : null}
        {this.state.event && this.state.showUpdateEventModal ? (
          <UpdateEvent
            event={this.state.event}
            create={this.handleClickUpdateEvent}
            Transition={Transition}
            closeHandler={this.handleClose}
          />
        ) : null}
      </>
    );
  }
}

export default PreventiveCalendar;
