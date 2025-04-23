import React from 'react'
import { useEffect, useState } from 'react'
import { FaCheck } from 'react-icons/fa6'
import useInterval from '../../hooks/useInterval'
// import TimerComp from './TimerComp'

const TimerBox = ( { timerSeconds = 0, completedInit = false, updateCallback = () => {}} ) => {
    const [completed, setCompleted] = useState(completedInit ?? false)
    const [delay, setDelay] = useState(null)
    const [timeRemaining, setTimeRemaining] = useState(timerSeconds ?? 0)

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

    useEffect(() => {
        updateCallback(completed)
    }, [completed])

    const timerBoxUpdateHandler = (newCompleted) => {
        setCompleted(newCompleted)
        setTimeRemaining(timerSeconds)
        if(newCompleted) {
            setDelay(1000)
        } else {
            setDelay(null)
        }
    }

    const reset = () => {
        setTimeRemaining(timerSeconds)
    }

    const pause = () => {
        setDelay(null)
    }

  return (
    <>
        <button onClick={reset}>reset</button>
        <button onClick={pause}>pause</button>
        <button className='timer-box__button cursor_pointer' onClick={() => {timerBoxUpdateHandler(!completed)}}>
            {completed && delay === null ?
                <div className='timer-box-complete'>
                    <FaCheck></FaCheck>
                </div>
                :
                timeRemaining
                // <TimerComp
                //     timerSeconds={timerSeconds}
                //     timerBoxUpdateHandler={timerBoxUpdateHandler}
                // ></TimerComp>
            }
        </button>
    </>
  )
}

export default TimerBox