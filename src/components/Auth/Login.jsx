import React from 'react'
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { Link } from 'react-router-dom';
function Login() {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [fail, setFail] = React.useState('');
    const [success, setSuccess] = React.useState('');
    const loginHandle = (e) => {
        e.preventDefault();
        const auth = getAuth();
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            setEmail('');
            setPassword('');
            setFail('');
            setSuccess('Successfull'); 
            setTimeout(() => {
                window.location.assign("/");
                setSuccess('');
            }, 2000);  
        })
        .catch((error) => {
            setFail(error.message);
            setEmail('');
            setPassword('');
            setSuccess('');
            setTimeout(() => {
                setFail('');
            }, 2000); 
        });
    };
  return (
    <form className='flex flex-col items-center justify-center'>
        <input type='text' placeholder='Enter your email'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
         className='border border-gray-300 rounded-md p-2 mt-3 w-64 md:w-96  text-black'/>
        <input type='text'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
         placeholder='Enter your password' className='border border-gray-300 rounded-md p-2 mt-3 w-64 md:w-96  text-black'/>
        <button
        type='submit'
        onClick={loginHandle}
        className='bg-black text-white w-24 p-2 mt-4 rounded-md'>Login</button>
        <div className='text-black'>
        New User?<Link className='text-blue-500' to='/signup'>Signup</Link>
        </div>
        <div className='text-red-500'>{fail&&'Failure'}</div>
        <div className='text-green-500'>{success}</div>
    </form>
  )
}

export default Login