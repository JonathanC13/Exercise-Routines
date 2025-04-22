import React from 'react'

const ScreenNavbarLinkChildItem = ( { info=null, urlTemplate='', gotoDestinationHandler = () => {} } ) => {
    // console.log(info)
    if (!info) {
        return <></>
    }

    const linkTo = urlTemplate.replace('${id}', info?.id)
    // console.log(linkTo)

  return (
    <li className='link-items-sub__li cursor_pointer' onClick={() => gotoDestinationHandler(linkTo)}>
      {info?.name}
    </li>
  )
}

export default ScreenNavbarLinkChildItem