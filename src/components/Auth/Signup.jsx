import React from 'react'
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { fs } from '../../config/config'
import { Link } from 'react-router-dom';
import {setDoc, doc } from "firebase/firestore"; 
function Signup() {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [name, setName] = React.useState('');
    const [fail, setFail] = React.useState('');
    const [success, setSuccess] = React.useState('');
    const signupHandle = (e) => {
        e.preventDefault();
        const auth = getAuth();
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
        const docRef = setDoc(doc(fs, "users",userCredential.user.uid), {
            name: name,
            email: email,
            password: password,
        });
        setName('');
        setEmail('');
        setPassword('');
        setFail('');
        setSuccess('Successfull'); 
        setTimeout(() => {
            setSuccess('');
            window.location.assign("/login");
        }, 2000);  
    }).catch((error) => {
        setFail(error.message);
        console.log(error.message);
        setName('');
        setEmail('');
        setPassword('');
        setSuccess('');
        setTimeout(() => {
            setFail('');
        }, 2000); 
    });
    };
  return (
    <div className='w-full h-screen'>
        <form className='flex flex-col items-center justify-center'>
            <input type='text'
            value={name}
            required
            onChange={(e) => setName(e.target.value)}
            placeholder='Enter your name'className='border border-gray-300 rounded-md p-2 mt-3 md:w-96 w-64   text-black'/>
            <input type='text'
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
            placeholder='Enter your email' className='border border-gray-300 rounded-md p-2 mt-3 md:w-96 w-64  text-black'/>
            <input type='text'
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
            placeholder='Enter your password' className='border border-gray-300 rounded-md p-2 mt-3 md:w-96 w-64  text-black'/>
            <button
            onClick={signupHandle}
            className='bg-black text-white w-24 mt-4 p-2 rounded-md'>Signup</button>
            <div className='text-black'>
            Already have an account?<Link 
            className='text-blue-500' to='/login'>Login</Link>
            </div>
            <div className='text-red-500'>{fail&&'Failure'}</div>
            <div className='text-green-500'>{success}</div>
        </form>
    </div>
  )
}

export default Signup