import React from 'react'
import {FaBars, FaCaretDown} from 'react-icons/fa'
import navLogo from '../assets/logoipsum-335.svg'


const createNavItems = (navData) => {
  // create the li -> buttons
  const comps = navData.map((item, idx) => {
      return (
          <TopNavItems
              key={idx}
              item={item}
          />
      )
  })
  return comps
}

const sendTest = async() => {
  const url = import.meta.env.REACT_APP_BE_URL || 'http://localhost:5000/api/v1/routines/'

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const json = await response.json();
    console.log(json);
  } catch (error) {
    console.error(error.message);
  }
}



const NavBar = () => {

  const tempAcc = useSelector((state) => state.auth.loggedInAccount)
  
  // login form
  // controllered inputs, for now hardcode into obj
  const credentials = {
    "email": "Apple@Billy.com",
    "password": "123456"
  }

  const [login, { isLoading }] = useLoginMutation()

  const loginHandler = async (e) => {
    e.preventDefault()

    try {
      const response = await login({...credentials}).unwrap()
      console.log(response)
    } catch (err) {
      console.log(err)
    }
  }

  //--


  const navData = null
  const username = 'Bob'

  // handleToggleSideNav

  return (
    <div className="navbar">
      <div className="navbar__div nav-logo">
        <a className='nav-logo__a logo cursor_pointer' href="/home">
            <img src={navLogo} alt="logo" />
        </a>
      </div>
      <nav className="navbar__nav nav-items">
        <ul className="nav-items__ul">
          {/* {createNavItems(navData)} */}
        </ul>
      </nav>
      <nav className="navbar__nav account-opts">
        <span className="account-opts__span">{username} <FaCaretDown></FaCaretDown></span>
      </nav>
      <nav className="navbar_side-nav side-nav">
          <button className="side-nav_btn cursor_pointer" onClick={(e) => {loginHandler(e)}}>
              <FaBars></FaBars>
          </button>
      </nav>
    </div>
  )
}

export default NavBar