import Link from 'next/link'
import Router from 'next/router'
import React, {useState} from 'react'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



export default function ProjectName({setprojectStep, setProjectName}) {

    const [name, setname] = useState("")

    

    const createProjectName = async () => {
    if (name) {
        setProjectName(name)
        setprojectStep("projecttasks")
    } else {
        toast.warn("Please insert the Name of the project you want to create.")
    }
}

    return (
        <div className=" w-full h-screen bg-black">
            <i
                onClick={() => Router.push("/UserDashboard")}
                className=' absolute cursor-pointer fa-solid fa-xmark text-white text-5xl m-10 right-0 top-0 duration-300 hover:scale-110 rounded-xl hover:text-cyan-400'></i>
            <div className="flex flex-col w-full h-full justify-center items-center">
                <h1 className='text-white py-5 text-2xl font-extrabold md:text-4xl'>Project Name</h1>
                <input
                    onChange={(e) => setname(e.target.value)}
                    type="text"
                    className=' text-lg md:text-xl font-light p-2 rounded-xl duration-300 border-b-4 border-solid border-white focus:border-cyan-400 text-slate-900 w-[20ch] md:w-[30ch'/>
            </div>
            <i
                onClick={createProjectName}
                className='absolute cursor-pointer text-5xl m-10  fa-solid fa-angles-right text-white right-0 bottom-0 duration-300 hover:scale-110 rounded-xl hover:text-cyan-400'></i>
                <ToastContainer theme="colored"/>
        </div>
    )
}
  