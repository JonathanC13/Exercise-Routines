import React from 'react'
import { Link } from 'react-router'

const ScreenNavbarLinkChildItem = ( { info=null, urlTemplate='' } ) => {
    console.log(info)
    if (!info) {
        return <></>
    }

    const linkTo = urlTemplate.replace('${id}', info?.id)

  return (
    <div className='screen-nav-link-child-item__div'>
        <Link to={linkTo}>{info?.name}</Link>
    </div>
  )
}

export default ScreenNavbarLinkChildItem