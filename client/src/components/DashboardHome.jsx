import React from 'react'
import { useNavigate } from 'react-router'

const DashboardHome = () => {

    // should never show this page, either no Routines so it will go to the add Routine page, goes to the page for the most recent accessed routine, or opens the first routine in their list.

  return (
    <section className="dashboardHome__section">
        <h1>Dashboard Home</h1>
    </section>
  )
}

export default DashboardHome