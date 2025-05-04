import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from 'firebase/auth';
import React, { useState } from 'react';
import { auth } from '../../firebase.init';
import { FaEye } from "react-icons/fa6";
import { IoMdEyeOff } from "react-icons/io";
import { Link } from 'react-router';

const Signup = () => {

  const [success, setSuccess] = useState(false);

    const [errorMessage, setErrorMessage] = useState('');

    const [showPassword, setShowPassword] = useState(false);

    const handleSignUp = (e) =>{
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        const name = e.target.name.value;
        const photo = e.target.photo.value;
        const terms = e.target.terms.checked
        console.log(email,password, terms,name,photo)
        

        setSuccess(false)

        setErrorMessage('')


        if(!terms){
          setErrorMessage('Please accept Our Terms and Conditions')
          return
        }


        // validate password 

        const passwordRegExp = /(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}/ ;

        if(!passwordRegExp.test(password)){
            setErrorMessage('Password must have one lowercase, one uppercase, one digit and 6 character or longer')

            return;
        }

        // create user

        createUserWithEmailAndPassword(auth,email,password)
        .then(result=> {
          console.log(result)
          // email verify
          sendEmailVerification(auth.currentUser)
          .then(()=>{
            setSuccess(true)
            alert('We sent you a verification email please check your email')
          })

          // update user profile
          const profile = {
            displayName: name,
            photoURL: photo
          }

          updateProfile(auth.currentUser, profile)
          .then(()=>{
            console.log('user profile updated')
          })
          .catch(error=> console.log(error))
        })
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
          <label className="label">Name</label>
          <input name='name' type="text" className="input" placeholder="Your Name" />
          <label className="label">Photo URL</label>
          <input name='photo' type="text" className="input" placeholder="Photo Url" />
          <label className="label">Email</label>
          <input name='email' type="email" className="input" placeholder="Email" />
          <label className="label">Password</label>
          <div className='relative'>
            <input 
            name='password' 
            type={showPassword ? 'text' : 'password'} 
            className="input" 
            placeholder="Password" />
            <button 
            onClick={()=>{setShowPassword(!showPassword)}}
            className='btn-xs absolute top-3 right-8'>{showPassword ? <IoMdEyeOff /> : <FaEye />}</button>
          </div>
          <label className="label">
           <input type="checkbox" name='terms' defaultChecked className="checkbox" />
              Accept Terms and Conditions
             </label>
          <div className='text-center'>
          <button className="btn btn-neutral mt-4">Sign Up</button>
          </div>
        </form>
        <p>Already have and account? Please <Link className='text-blue-500 underline' to={'/login'}>Login</Link></p>
        {
            errorMessage && <p className='text-red-500'>{errorMessage}</p>
        }
        {
          success && <p className='text-green-500'>User has created successfully</p>
        }
      </div>
    </div>
    );
};

export default Signup;