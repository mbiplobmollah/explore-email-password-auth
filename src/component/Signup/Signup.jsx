import { createUserWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react';
import { auth } from '../../firebase.init';

const Signup = () => {

    const [errorMessage, setErrorMessage] = useState('')

    const handleSignUp = (e) =>{
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        console.log(email,password)

        setErrorMessage('')

        // create user

        createUserWithEmailAndPassword(auth,email,password)
        .then(result=> console.log(result))
        .catch(error => {
            console.log(error)
            setErrorMessage(error.message)
        })
    }

    return (

    <div className="card bg-base-100 mx-auto mt-15 w-full max-w-sm shrink-0 shadow-2xl">
      <div className="card-body">
      <h1 className="text-5xl font-bold text-center">Sign Up</h1>
        <form onSubmit={handleSignUp} className='space-y-3'>
          <label className="label">Email</label>
          <input name='email' type="email" className="input" placeholder="Email" />
          <label className="label">Password</label>
          <input name='password' type="password" className="input" placeholder="Password" />
          <div><a className="link link-hover">Forgot password?</a></div>
          <div className='text-center'>
          <button className="btn btn-neutral mt-4">Sign Up</button>
          </div>
        </form>
        {
            errorMessage && <p className='text-red-500'>{errorMessage}</p>
        }
      </div>
    </div>
    );
};

export default Signup;