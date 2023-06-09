import React from 'react'
import { Calendar, dayjsLocalizer, globalizeLocalizer, momentLocalizer,dateFnsLocalizer } from 'react-big-calendar'
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import "react-big-calendar/lib/css/react-big-calendar.css"
import axios from 'axios';
import "react-datepicker/dist/react-datepicker.css"
import EventTable from '../Models/eventTable';
function GeneralEvents() {
    const[verifiedevents,setverifiedevents] = React.useState([])
    const[events,setevents] = React.useState([])
     React.useEffect(()=>{
    
axios({
    method: "GET",
    url: "http://localhost:5000/verifiedevents",
  
  }).then(res=>{
setverifiedevents(res.data.docs)
console.log(res.data.docs)
  })
  },[])
  React.useEffect(()=>{
  })
const locales = {
  "en-US":require("date-fns/locale/en-US")
}
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales
})
React.useEffect(()=>{

  verifiedevents.map((val,ind)=>{
    var eventobject = {
    allday:true,
title:val['Title'],
start: new Date(val['Date']) ,
end:new Date(val['endDate']),
desc:val['Desc'],
institution:val['Institution'],
link:val['Link']
}
setevents((prev)=>!prev.includes(eventobject)&&prev.concat(eventobject))

  })
},[verifiedevents])
function eventPropGetter(event, start, end, isSelected) {
  const backgroundColor = 'green'
  const style = {
    backgroundColor,
    borderRadius: '5px',
    opacity: 0.8,
    color: 'white',
    border: 'none',
    display: 'block',
    textAlign: 'center',
    height:'fit-content'
  };
  return {
    style,
  };
}

function dayPropGetter(date) {
  const backgroundColor = 'white'; // set the background color here
  const style = {
    color:'white',
    backgroundColor,
    margin:'1px',
  borderTopLeftRadius:'10px',
  boxShadow:'3px 3px 17px grey'
  };
  return {
    style,
  };
}


const eventRenderer = ({ event }) => {
  return (
<a href={event.link} target='_blank' style={{textDecoration:'none',color:'inherit'}}>
      <div>
    <div className="d-flex justify-content-start align-items-center" style={{fontFamily:'Nunito Sans'}}>    <strong>{event.title}</strong><>,{event.institution}</></div>
  
        <div style={{color:'black', fontSize: "14px",textAlign:'left' }}>{event.desc}</div>

    </div>
</a>
  );
};
  return (
<>

   {window.innerWidth>400?   <Calendar
localizer={localizer}
startAccessor="start"
endAccessor="end"
events={events}
 style={{height:700,width:window.innerWidth>500?"90vw":"100vw",borderRadius:'20px',overflow:'hidden',padding:window.innerWidth>500?'2%':'0%',backgroundColor:'white',boxShadow:'0 0 15px #c0c0c0',fontFamily:'Oswald',marginTop:'2%'}}
   eventPropGetter={eventPropGetter}
       dayPropGetter={dayPropGetter}
             components={{ event: eventRenderer }}
 />:<EventTable val={verifiedevents}/>}
</>
  )
}

export default GeneralEvents
