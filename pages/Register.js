import React, {useState, useEffect} from 'react'
import Link from 'next/link'
import Router from 'next/router'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {useAuth} from "../context/AuthContext"
import { ERROR } from '@/utils/constants';

export default function Register() {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [userName, setUserName] = useState("")
    const [loading, setLoading] = useState(false)

    const {checkIfUserExists, signup, currentUser} = useAuth()

   
    useEffect(() => {
        if(currentUser){
            Router.push("/UserDashboard")
        }
    }, [])



    async function signupUser() {
        if (!email || !password || !userName) {
          return toast.warn(ERROR.TEXT_EMPTY);
        }
      
        try {
          setLoading(true);
          const userExists = await checkIfUserExists(email);
      
          if (userExists) {
            setLoading(false)
            return toast.error(ERROR.DUPLICATED_EMAIL);  
          }
      
          await signup(email, password, userName);
          Router.push("/UserDashboard");
        } catch (error) {
          setLoading(false)
          toast.error(ERROR.GENERAL_ERROR);
        }
      }
      
      
    
    function goHome () {
        Router.push("/")
    }


    return (
        <div className=' flex w-full h-screen flex-col justify-center items-center p-5 md:flex-row md:p-20 '>
            <div className=" text-slate-800 bg-white relative flex h-1/2 w-full border-4 border-b-0 border-solid border-slate-800 font-extrabold justify-center items-center md:w-1/2 md:h-full md:border-r-0 md:border-b-4">             
                <i onClick={goHome} className=" absolute top-5 left-5 fa-solid fa-people-group text-4xl cursor-pointer md:text-6xl  "></i>
                <div className="flex flex-col justify-center items-center">
                    <h1 className='text-xl md:text-4xl'>Welcome to TeamFlow</h1>
                    <p className=' text-xs md:text-xl'>Collaborate, conquer, repeat.</p>
            </div>
            </div>

            <div
                className=' text-white bg-slate-500 border-solid border-4 border-slate-800 px-5 flex flex-col h-1/2 w-full justify-center  md:w-1/2 md:h-full md:px-20'>
                <h1 className=' my-5 text-xl font-bold '>Sing Up</h1>
                <p className='text-xs pb-2'>Username</p>
                <input
                    type="text"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    placeholder='Enter your username'
                    className=' text-sm mb-5 outline-none duration-300 border-b-4 border-solid border-white focus:border-cyan-400 text-slate-900 p-2 w-full max-w-[40ch]'></input>
                <p className='text-xs pb-2'>Email</p>
                <input
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder='youremail@example.com'
                    className=' text-sm mb-5 outline-none duration-300 border-b-4 border-solid border-white focus:border-cyan-400 text-slate-900 p-2 w-full max-w-[40ch]'></input>
                <p className=' text-xs pb-2'>Password</p>
                <input
                    value={password}
                    type="password"
                    placeholder="********"
                    onChange={(e) => setPassword(e.target.value)}
                    className=" text-sm outline-none duration-300 border-b-4 border-solid border-white focus:border-cyan-400 text-slate-900 p-2 w-full max-w-[40ch]"></input>
                {loading ? <div className='flex justify-center max-w-[35ch]'><i className='text-5xl mt-2 text-center fa-solid duration-300 fa-spinner text-white animate-spin'/></div>
                      :
                <button onClick={signupUser} className=' mb-2 mt-5 py-2 bg-cyan-400 max-w-[35ch] duration-300 hover:ring-2 hover:ring-white'>Sing Up</button> }
                <Link className='underline text-xs' href="/Login"> Login</Link>
            </div>
            <ToastContainer theme="colored"/>
        </div>
    )
}