import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'


import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export const Toast = () => {

  const notificationList = useSelector(state => state.notifications)
  const { notifications } = notificationList

  const notify = (notification, id) => toast.info(`🎫 New notification! from ${notification.user.firstName}`, {
    toastId: id,
    position: "top-right",
    autoClose: true,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });

  
  useEffect(() => {
    if (notifications && notifications.length > 0) {
      notifications.map(notification => {
        let content=`A new ${notification.type} is here for property ${notification.property.propertyName} from ${notification.user.firstName}`

        // notify(notification, notification._id)

        // addToast(content, {
        //   appearance: 'info',
        //   autoDismiss: true,
        // })
      })
    }
  }, [notifications])

  return (
    <span>
      
      {/* <button onClick={notify}>Notify !</button> */}
        {/* <ToastContainer /> */}
    </span>
  )
}

// export const ToastMsg = () => (
//   // <ToastProvider>
//     <Toast  />
//   // </ToastProvider>
// )
