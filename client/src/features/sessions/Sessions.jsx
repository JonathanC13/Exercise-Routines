// import React from 'react'
// import { useGetSessionsQuery, selectSessionIds } from './sessionsApiSlice'
// import { useSelector } from 'react-redux'

// const createSessionComps = (sessionIds) => {
//     return
// }

// const Sessions = () => {
//     const {
//         data: sessions,  // data has been transformed and returned to routines
//         isLoading,
//         isSuccess,
//         isError,
//         error
//     } = useGetSessionsQuery()

//     let content = ''

//     if (isLoading) {
//         content = <p>loading...</p>//<PulseLoader color={"#FFF"} />
//     }

//     if (isError) {
//         content = <p className="errmsg">{error?.data?.message}</p>
//     }

//     if (isSuccess) {
//         const { ids, entities } = sessions
//     }

//   return (
//     <section>
//         {content}
//     </section>
//   )
// }

// export default Sessions