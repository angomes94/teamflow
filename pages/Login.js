import React, {useState, useEffect} from 'react'
import Link from 'next/link'
import {useAuth} from "../context/AuthContext"
import Router from 'next/router';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ERROR } from '@/utils/constants';


export default function Login() { 

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false)

   
    const { login, currentUser } = useAuth()

    useEffect(() => {
        if(currentUser){
            Router.push("/UserDashboard")
        }
    }, [])

    function goHome () {
        Router.push("/")
    }
    

    async function loginUser () {
        if(!email || !password){
            toast.warn(ERROR.TEXT_EMPTY)
        } else{
            try {
                setLoading(true)
                await login(email, password)
                Router.push('/UserDashboard')
            } catch (error) {
                toast.error(ERROR.INCORRECT_MAIL_PW)
                setLoading(false)
            }
            
        }
    }

    return (

        <div className=' flex w-full h-screen flex-col justify-center items-center p-5 md:flex-row md:p-20 '>
            <div className=" text-slate-800 bg-white relative flex h-1/2 w-full border-4 border-b-0 border-solid border-slate-800 font-extrabold justify-center items-center md:w-1/2 md:h-full md:border-r-0 md:border-b-4">             
                <i onClick={goHome} className=" absolute top-5 left-5 fa-solid fa-people-group text-4xl cursor-pointer md:text-6xl "></i>
                <div className="flex flex-col justify-center items-center">
                    <h1 className='text-xl md:text-4xl'>Welcome Back!</h1>
            </div>
            </div>

            <div
                className=' text-white bg-slate-500 border-4 border-solid border-slate-800 px-5 flex flex-col h-1/2 w-full justify-center  md:w-1/2 md:h-full md:px-20'>
                <h1 className=' my-5 text-xl font-bold '>Login</h1>
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
                 {loading ? <div className='flex justify-center max-w-[35ch] '><i className='text-5xl mt-2 text-center fa-solid duration-300 fa-spinner text-white animate-spin'/></div>
                      :
                <button onClick={loginUser} className=' mb-2 mt-5 py-2 bg-cyan-400 max-w-[35ch] duration-300 hover:ring-2 hover:ring-white'>Login</button>}
                <p className='text-xs'>New User?
                    <Link className='underline' href="/Register"> Register</Link>
                </p>
            </div>
            <ToastContainer theme="colored"/>
        </div>
    )
}