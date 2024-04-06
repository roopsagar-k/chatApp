import Alert from '@mui/material/Alert';

const Toast = ({children, toastType}) => {
  return (
    <div className='w-1/2 mx-auto'>
      <Alert severity={`${toastType}`}>
        {children}
      </Alert>
      <div className={`progress-bar -mt-0.5 h-[3px] w-full ${toastType === 'success' ? 'bg-green-600': 'bg-red-600'}`}></div>
    </div>
  )
}

export default Toast;
