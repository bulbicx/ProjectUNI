import React, { useState, useEffect } from 'react'
import jwt from 'jsonwebtoken'
import axios from 'axios'
import { baseUrl } from '../../shared/baseUrl'

import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'

const Reset = ({ match }) => {
  const [values, setValues] = useState({
    name: '',
    token: '',
    newPassword: '',
    buttonText: 'Reset password'
  })

  useEffect(() => {
    let token = match.params.token
    let { name } = jwt.decode(token)
    if (token) {
      setValues({...values, name, token})
    }
  }, [])

  const { name, token, newPassword, buttonText } = values

  // const URL = 'http://localhost:3000/api'

  const handleChange = e => {
    setValues({ ...values, newPassword: e.target.value })
  }

  const clickSubmit = e => {
    e.preventDefault()
    setValues({ ...values, buttonText: 'Submitting' })
    axios({
      method: 'PUT',
      url: `${ baseUrl }api/reset-password`,
      data: { newPassword, resetPasswordLink: token }
    })
      .then(response => {
        toast.success(response.data.message)
        setValues({ ...values, buttonText: 'Done' })
      })
      .catch(error => {
        console.log(error)
        toast.error(error.response.data.error)
        setValues({ ...values, buttonText: 'Reset password' })
      })
  }
  

  const resetPasswordForm = () => (
    <form>

      <div className="form-group">
        <label htmlFor="password" className="text-muted">Password</label>
        <input 
          onChange={handleChange} 
          value={newPassword} 
          type="password" 
          className="form-control"
          id="password"
          placeholder="Type your new password"
          required
        />
      </div>

      <div>
        <button className="btn btn-primary" onClick={clickSubmit}>{buttonText}</button>
      </div>
    </form>
  )

  return (
    <div style={{width: '30em', height: '50em', padding: '2em', margin: '2em auto'}}>
      <ToastContainer />
      <h1>Hey {name}, Type your new password</h1>
      {resetPasswordForm()}
    </div>
  )
}

export default Reset