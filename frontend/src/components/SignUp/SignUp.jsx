import React from 'react'
import { Signup } from '../../assets/dummystyles';

const SignUp = () => {
  return (
    <div className={SignUp.container}>
      <h1 className={SignUp.title}>Sign Up</h1>
      <form className={SignUp.form}>
        <input type="text" className={SignUp.input} placeholder="Username" />
        <input type="email" className={SignUp.input} placeholder="Email" />
        <input type="password" className={SignUp.input} placeholder="Password" />
        <button type="submit" className={SignUp.button}>Create Account</button>
      </form>
    </div>
  )
}

export default SignUp