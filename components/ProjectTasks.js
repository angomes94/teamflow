import Link from 'next/link'
import Router from 'next/router'
import React, { useState } from 'react'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function ProjectTasks({ setprojectStep, setProjectTasks }) {

    const [task, setTask] = useState('')
    const [tasks, setTasks] = useState([])


    const handleAddTask = () => {
        if (task) {
            setTasks([...tasks, task])
            setTask('')
        } else {
            toast.warn("Please write something first")
        }
    }

    const handleDeleteTask = (index) => {
        const newTasks = [...tasks]
        newTasks.splice(index, 1)
        setTasks(newTasks)
    }


    const createProjectTasks = () => {
        if (tasks) {
            setProjectTasks([...tasks])
            setprojectStep("projectteam")
        } else {
            toast.warn("Please create at leat one task")
        }
    }

    return (
        <div className=" w-full h-screen bg-black">
            <i
                onClick={() => Router.push("/UserDashboard")}
                className=' absolute cursor-pointer fa-solid fa-xmark text-white text-5xl m-10 right-0 top-0 duration-300 hover:scale-110 rounded-xl hover:text-cyan-400'></i>
            <div className="flex flex-col w-full h-full items-center">
                <h1 className='text-white py-5 mt-28 text-2xl font-extrabold md:text-4xl'>Create Tasks</h1>
                <div className='flex flex-row'>
                    <input
                        value={task}
                        onChange={(e) => setTask(e.target.value)}
                        type="text"
                        className=' text-lg md:text-xl font-light p-2 duration-300 rounded-xl rounded-r-none border-b-4 border-solid border-white focus:border-cyan-400 text-slate-900 w-[20ch] md:w-[30ch' />
                    <button
                        onClick={handleAddTask}
                        className=' uppercase rounded-xl rounded-l-none text-sm px-8 py-4 text-white bg-cyan-400 duration-300 active:scale-110'>add</button>
                </div>
                <div className='grid grid-cols-1 gap-4 mx-10 mt-10 sm:grid-cols-2 md:grid-cols-4'>
                    {
                        tasks.map((task, index) => (
                            <div key={index} className=" flex justify-between cursor-pointer p-2 m-2 border-solid rounded-md border-white border-2 duration-300 hover:scale-110 ">
                                <p className="text-white mr-2">{task}</p>
                                <div className='flex justify-center items-center'>
                                    <i onClick={() => handleDeleteTask(index)}
                                        className=" fa-solid fa-trash text-center text-white text-xl duration-300 hover:scale-110 hover:text-red-400  " />
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
            <i
                onClick={createProjectTasks}
                className='absolute cursor-pointer text-5xl m-10 fa-solid fa-angles-right text-white right-0 bottom-0 duration-300 hover:scale-110 rounded-xl hover:text-cyan-400'></i>
            <ToastContainer theme="colored" />
        </div>
    )
}