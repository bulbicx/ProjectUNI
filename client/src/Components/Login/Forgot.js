import React, { useState } from 'react'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'
import { baseUrl } from '../../shared/baseUrl'

const Forgot = ({ history }) => {
  const [values, setValues] = useState({
    email: '',
    buttonText: 'Submit'
  })

  const { email, buttonText } = values

  const handleChange = name => e => {
    setValues({ ...values, [name]: e.target.value })
  }
  
  const clickSubmit = e => {
    e.preventDefault()
    setValues({ ...values, buttonText: 'Submitting' })
    axios({
      method: 'PUT',
      url: `${ baseUrl }api/forgot-password`,
      data: { email }
    })
      .then(response => {
        toast.success(response.data.message)
        setValues({ ...values, buttonText: 'Submit' })
      })
      .catch(error => {
        console.log(error)
        toast.error(error.response.data.error)
        setValues({ ...values, buttonText: 'Submit' })
      })
  }
  

  const forgotForm = () => (
    <form>

      <div className="form-group">
        <label htmlFor="email" className="text-muted">Email</label>
        <input onChange={handleChange('email')} value={email} type="email" className="form-control" id="email" />
      </div>

      <div>
        <button className="btn btn-primary" onClick={clickSubmit}>{buttonText}</button>
      </div>
    </form>
  )

  return (
    <div style={{width: '30em', height: '50em', padding: '2em', margin: '2em auto'}}>
      <ToastContainer />
      <h1>Forgot password</h1>
      {forgotForm()}
    </div>
  )
}

export default Forgot