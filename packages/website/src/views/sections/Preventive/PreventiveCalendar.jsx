import React from 'react';
import moment from 'moment';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import '../../../styles/sass/styles.scss';
import { rooftopBlueColor } from '../../../styles/jss/material-dashboard-react';
import NewEvent from './NewEvent';
import Slide from '@material-ui/core/Slide';
import UpdateEvent from './UpdateEvent';
import preventive from '../../../services/api/preventive';
import withStyles from '@material-ui/core/styles/withStyles';
import preventiveCalendarStyle from '../../../styles/jss/material-dashboard-react/sections/preventiveCalendarStyle';

class PreventiveCalendar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      localizer: momentLocalizer(moment),
      events: [],
      showNewEventModal: false,
      showUpdateEventModal: false,
      month: new Date().getMonth() + 1,
    };
  }

  async componentWillMount() {
    const response = await preventive.listByMonth(this.state.month);
    this.setState({ events: response.events });
  }

  handleChangeMonth = async month => {
    if (this.state.month !== month) {
      const response = await preventive.listByMonth(month);
      this.setState({ month, events: response.events });
    }
  };

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
    const { classes } = this.props;
    const Transition = React.forwardRef(function Transition(props, ref) {
      return <Slide direction="down" ref={ref} {...props} />;
    });
    return (
      <div className={classes.calendarContainer}>
        <Calendar
          localizer={this.state.localizer}
          events={this.state.events}
          views={['month', 'day']}
          startAccessor="start"
          endAccessor="end"
          selectable={true}
          onNavigate={e => this.handleChangeMonth(e.getMonth() + 1)}
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
            update={this.handleClickUpdateEvent}
            Transition={Transition}
            closeHandler={this.handleClose}
          />
        ) : null}
      </div>
    );
  }
}

export default withStyles(preventiveCalendarStyle)(PreventiveCalendar);
