import React from 'react'

const Set = ( { set = null } ) => {

    let content = ''

    if (set) {
        content = <div className='set__div'>
            <div className="set_header__div">
                <div className="order_info">
                    <span className='set_desc_title__span'>Order:</span>
                    <span>{set.order}</span>
                </div>
                <div className="set_complete__div">
                    <span>L  l</span>
                    {/* complete check has animation of timed filling based on rest number in seconds. box always on right*/}
                    {/* below is edit button, will change edit state = true and will load setEditForm from this component */}
                </div>
            </div>
            <div className="set_info__div">
                <div className="set_desc__div">
                    <div className="set_desc_itm__div">
                        <span className='set_desc_title__span'>Weight</span>
                        <span className='set_desc_value__span'>{set.weight}</span>
                    </div>
                    <div className="set_desc_itm__div">
                        <span className='set_desc_title__span'>Reps/Dur</span>
                        <span className='set_desc_value__span'>{set.repsOrDuration}</span>
                    </div>
                    <div className="set_desc_itm__div">
                        <span className='set_desc_title__span'>Rest (sec)</span>
                        <span className='set_desc_value__span'>{set.restTimeSeconds}</span>
                    </div>
                </div>
            </div>
        </div>
    }

  return (
    <section className='set__section'>
        { content }
    </section>
  )
}

export default Set