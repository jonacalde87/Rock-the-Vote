import React from 'react'

export default function AuthForm(props){
  const {
    handleChange, 
    handleSubmit, 
    btnText, 
    inputs: {
      username, 
      password,
      firstName,
      lastName,
      email
    },
    errMsg 
  } = props
  
  return (
    <form onSubmit={handleSubmit}>
      <input 
        type="text" 
        value={firstName} 
        name="firstName" 
        onChange={handleChange} 
        placeholder="First Name"/>  
      <input 
        type="text" 
        value={lastName} 
        name="lastName" 
        onChange={handleChange} 
        placeholder="Last Name"/>  
      <input 
        type="email" 
        value={email} 
        name="email" 
        onChange={handleChange} 
        placeholder="Email"/>  
      <input 
        type="text" 
        value={username} 
        name="username" 
        onChange={handleChange} 
        placeholder="Username"/>
      <input 
        type="password" 
        value={password} 
        name="password" 
        onChange={handleChange} 
        placeholder="Password"/>
      <button>{ btnText }</button>
      <p style={{color:"red"}}>{ errMsg }</p>
    </form>
  )
}