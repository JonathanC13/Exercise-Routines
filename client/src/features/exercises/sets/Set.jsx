import React from 'react'

const Set = ( { set = null } ) => {

    let content = ''

    if (set) {
        content = <div className='set__div'>
            <div className="set_info__div">
                <div className="set_desc__div">
                    <div className="set_weight__div">
                        <span className=''></span>
                    </div>
                    <div className="set_reps-dur__div">
                    </div>
                    <div className="set_rest__div">
                    </div>
                </div>
                <div className="set_complete__div">
                    {/* complete check has animation of timed filling based on rest number in seconds. box always on right*/}
                    {/* below is edit button, will change edit state = true and will load setEditForm from this component */}
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