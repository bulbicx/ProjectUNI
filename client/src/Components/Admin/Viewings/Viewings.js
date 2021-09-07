import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { makeStyles } from '@material-ui/core'
import moment from 'moment'
import ReactTooltip from 'react-tooltip';

import { addNewAppointment, deleteViewing, fetchViewings } from '../../../redux/ActionCreators';
import { Loading } from '../../LoadingComponent';
import { appointments } from '../appointments';

const useStyles = makeStyles({
  viewings_container: {
    overflowY: 'scroll',
    background: '#F2F3F4',
    height: '60em',
    minWidth: '30em'
  },
  view_container: {
    background: '#E9E9EB',
    padding: '1em',
    margin: '0.5em'
  },
  view_title_container: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '0.8em'
  },
  add_appointment_icon: {
    fontSize: '1.8rem',
    '&:hover': {
      color: 'blue',
      cursor: 'pointer'
    }
  }
})

export default function Viewings() {
  const classes = useStyles()

  const dispatch = useDispatch()
  const viewingsList = useSelector(state => state.viewings)
  const { viewings, isLoading, errMess } = viewingsList

  const alert = useSelector(state => state.alert)

      
  useEffect(() => {
    dispatch(fetchViewings())
  }, [])
  
  const addToCalendar = (viewing) => {
    const { user, date, time } = viewing
    const theDate = new Date(date)
    const day = parseInt(theDate.getDate())
    const month = parseInt(theDate.getMonth()) 
    const year = parseInt(theDate.getFullYear())
    const splittedTime = time.split(':')
    const hourStart = parseInt(splittedTime[0])
    const minutesStart = parseInt(splittedTime[1])
    let hourEnd, minutesEnd

    if (minutesStart >= 30) {
      hourEnd = parseInt(splittedTime[0]) + 1
      minutesEnd = '00'
    } else {
      hourEnd = parseInt(splittedTime[0])
      minutesEnd = 30
    }

    const appointment = {
      title: `Viewing with ${ user.firstName } ${ user.lastName }`,
      startDate: new Date(year, month, day, hourStart, minutesStart),
      endDate: new Date(year, month, day, hourEnd, parseInt(minutesEnd))
    }

    dispatch(addNewAppointment(appointment, viewing._id))
  }
  
  const handleDeleteViewing = (id) => {
    dispatch(deleteViewing(id))
  }

  const showAllViewings = viewings.map((view, i) => {
    let active = view.property ? true : false
    let activeUser = view.user ? true : false

    return (
      <div key={i} className={classes.view_container}>
        <div className={classes.view_title_container}>
          <h4>Viewing</h4>
          <span>
            <strong className="mr-auto text-primary">Booked: </strong>
            <small className="text-muted">{moment(view.createdAt).fromNow()}</small>
            <button type="button" className="ml-2 mb-1 close" onClick={() => handleDeleteViewing(view._id)}>&times;</button>
          </span>
        </div>
        <p>Viewing booked for <b>{moment(view.date).format("DD/MM/YYYY")}</b> at <b>{view.time}</b></p>
        <p><b>Property:</b> {active ? view.property.propertyName : '[DELETED]'}</p>
        <p><b>User:</b> {view.user.firstName} {activeUser ? view.user.lastName : '[DELETED]'}</p>
        <i
          className={`${ classes.add_appointment_icon } fas fa-calendar-plus`}
          data-tip="Add to calendar"
          onClick={() => addToCalendar(view)}
        >
        </i>
        <ReactTooltip place="top" type="dark" effect="solid"/>
      </div>
    )
  })

  return (
    <div style={{ marginTop: '5.4em', marginLeft: '2em' }}>
      {alert.message &&
        <div className={`alert ${alert.type}`}>
            {alert.message}
        </div>
      }
      <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
        <div>
          <h3 style={{ fontSize: '2rem', textAlign: 'center' }}>Viewings booked</h3>
          <div className={classes.container}>
            {
              isLoading ?
              <Loading />
              :
              errMess ?
              <div className="alert alert-danger" role="alert">{errMess}</div>
              :
              <div className={classes.viewings_container}>
                {showAllViewings}
              </div>
            }

          </div>
        </div>
      </div>
    </div>
  )
}
