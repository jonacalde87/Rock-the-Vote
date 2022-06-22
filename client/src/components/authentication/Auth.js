import React, { useState, useContext } from 'react'
import SignupForm from './SignupForm.js'
import LoginForm from './LoginForm'
import { UserContext } from '../../context/UserProvider.js'

const initInputs = { username: "", password: "" }

export default function Auth(){
  const [inputs, setInputs] = useState(initInputs)
  const [toggle, setToggle] = useState(false)

  //to grab the context for the signup and login
  const { signup, login, errMsg, resetAuthErr } = useContext(UserContext)

  function handleChange(e){
    const {name, value} = e.target
    setInputs(prevInputs => ({
      ...prevInputs,
      [name]: value
    }))
  }

  function handleSignup(e){
    e.preventDefault()
    signup(inputs)
  }

  function handleLogin(e){
    e.preventDefault()
    login(inputs)
  }

  function toggleForm(){
    setToggle(prev => !prev)
    resetAuthErr()
  }

  return (
    <div className="auth-container">
      <h1>Rock The Vote App</h1>
      { !toggle ?
        <>
          <SignupForm 
            handleChange={handleChange}
            handleSubmit={handleSignup}
            inputs={inputs}
            btnText="Sign up"
            errMsg={errMsg}
          />
          <p onClick={toggleForm}>Already a member?</p>
        </>
      :
        <>
          <LoginForm 
            handleChange={handleChange}
            handleSubmit={handleLogin}
            inputs={inputs}
            btnText="Login"
            errMsg={errMsg}
          />
          <p onClick={toggleForm}>Not a member?</p>
        </>
      }
    </div>
  )
}