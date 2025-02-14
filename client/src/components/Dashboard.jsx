import React from 'react'
import { Outlet, useNavigate } from 'react-router'


const Dashboard = () => {
    
    const navigate = useNavigate()

    // load the user's Routines into store slice
    
    // if no Routines, navigate to addRoutine page

    // else
    //  if recent accessed is not null routineid = lastaccessedID, else routineId is the first in the list
    //  then navigate to path /:routineId


  return (
    <section className="dashboard__section">
        <Outlet />
    </section>
  )
}

export default Dashboard