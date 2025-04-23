import { useEffect, useRef } from 'react';
 
function useInterval(callback, delay) {
    // console.log('new hook')
    /*
    1. User component uses this hook
    2. callback saved in a ref and re-assigned in useEffect so that the setInterval points to the update callback everytime user component re-renders:
        1. when the user component re-renders, e.g. state count changed, it creates a new hook to this hook component with a new callback function, for the interval to work (if not cleanedUp due to delay change), then must save the new callback function into a reference that stays the same.
    3. Each hook rerender will check if the delay has changed and create a new interval when delay !== null
    */

  const savedCallback = useRef();
 
  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);
 
  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => {
        clearInterval(id)
        };
    }
  }, [delay]);
}

export default useInterval