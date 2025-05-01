import React from 'react'
import { useEffect, useState } from 'react'
import { FaCheck, FaHourglassStart } from 'react-icons/fa6'
import useInterval from '../../hooks/useInterval'
import { useSelector } from 'react-redux'
// import TimerComp from './TimerComp'

const TimerBox = ( { timerSeconds = 0, completedInit = false, updateCallback = () => {}} ) => {

    const theme = useSelector(state => state.auth.preferredTheme)
    
    const [completed, setCompleted] = useState(completedInit ?? false)
    const [delay, setDelay] = useState(null)
    const [timeRemaining, setTimeRemaining] = useState(timerSeconds ?? 0)
    // console.log('rerender ', completed)

    const timerRemainingBgHeight = {height: (1 - (timeRemaining / timerSeconds)) * 100 + '%'}

    // console.log('timer rerender: ',timeRemaining, delay)
    useEffect(() => {
        setTimeRemaining(timerSeconds ?? 0)
    }, [timerSeconds])

    // hook
    useInterval(() => {
        if (timeRemaining <= 1) {
            setDelay(null)
        }
        setTimeRemaining(timeRemaining - 1);
    }, delay);

    // useEffect(() => {
    //     updateCallback(completed)
    // }, [completed])

    const timerBoxUpdateHandler = (newCompleted) => {
        setCompleted(newCompleted)
        setTimeRemaining(timerSeconds)
        if(newCompleted) {
            setDelay(1000)
        } else {
            setDelay(null)
        }
        updateCallback(newCompleted)
    }

    const reset = () => {
        setTimeRemaining(timerSeconds)
    }

    const pause = () => {
        setDelay(null)
    }

  return (
    <>
        {/* <button onClick={reset}>reset</button>
        <button onClick={pause}>pause</button> */}
        <button className={`cursor_pointer timer-box__button timer-box__button--color-${theme}`} onClick={() => {timerBoxUpdateHandler(!completed)}}>
            {completed && delay === null ?
                <div className='timer-box-complete'>
                    <FaCheck></FaCheck>
                </div>
                : (completed && delay !== null) ?
                    <div className='timer-box-counting'>
                        <div className='timer-box-counting-number__div'>{timeRemaining}</div>
                        <div className='timer-box-counting-bg__div' style={timerRemainingBgHeight}></div>
                    </div>
                    :
                    <FaHourglassStart></FaHourglassStart>
            }
        </button>
    </>
  )
}

export default TimerBox