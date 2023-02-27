import React, {useEffect} from 'react'
import { useAuth } from '@/context/AuthContext';
import Router from 'next/router';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ERROR } from '@/utils/constants';

export default function Tasks({loadingTasks, errorTasks, tasks}) {

    useEffect(() => {
            if(errorTasks){
                toast.error(ERROR.GENERAL_ERROR);
            }
    }, [])
    

    const {setFirestoreProjectID} = useAuth()


    const handleClick = (projectid) => {
        setFirestoreProjectID(projectid); 
        Router.push("/ProjectDashboard")
    }


    return (
        <div className="flex-1 text-white bg-black justify-center items-center overflow-auto">
            <div className='w-full h-full text-center'>
            {!loadingTasks && tasks.length === 0 && <h1 className=' text-lg text-center mt-20'> No projects yet </h1>}
            {loadingTasks && <div className=' flex justify-center pt-20'> <i className='text-5xl mt-2 fa-solid duration-300 fa-spinner text-white animate-spin'/> </div>}
                <div className='grid grid-cols-1 gap-4 mx-10 mt-10 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6'>
                    {tasks.map((project) => (
                        <div 
                        key={project.name}
                        onClick ={ () =>  handleClick(project.projectID)}
                         className = " cursor-pointer p-2 m-5 border-solid rounded-md border-white border-2 drop-shadow hover:drop-shadow-lg hover:opacity-70 hover:border-cyan-400">
                            <h1 className='font-bold text-lg'>{project.name}</h1>
                            {project.tasks.map((task) => (
                                <div className=' border-solid border-t-2 border-white' key={task.id}>
                                    <p className='text-sm font-normal py-2'>{task.title} <span className=' font-thin'> {" - " + task.status}</span></p>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
                <div className='p-5'></div>
            </div>
            <ToastContainer theme="colored"/>
        </div>
    )
}
