import Link from 'next/link'
import Router from "next/router";
import React, {useEffect, useState} from 'react'
import { useAuth } from '@/context/AuthContext';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ERROR } from '@/utils/constants';




export default function Projects({ loadingProjects, errorProjects, projects}) {

    useEffect(() => {
        if (errorProjects) {
          toast.error(ERROR.GENERAL_ERROR);
        }
      }, []);


   const {setFirestoreProjectID} = useAuth()

    const handleClick = (projectid) => {
        setFirestoreProjectID(projectid); 
        Router.push("/ProjectDashboard")
    }
    

    return (
        <div className=" flex-1 text-white bg-black overflow-auto">
        {!loadingProjects && projects.length === 0 && <h1 className=' text-lg text-center mt-20'> No projects yet</h1>}
        {loadingProjects && <div className=' flex justify-center pt-20'> <i className='text-5xl mt-2 fa-solid duration-300 fa-spinner text-white animate-spin'/> </div>}
            <div className='grid grid-cols-1 gap-4 mx-10 mt-10 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6'>
                {
                    Object.values(projects).map((project) => {
                        return(
                        <div
                            key={project.id}
                            onClick ={ () =>  handleClick(project.id)}
                            className=" flex flex-col cursor-pointer items-center py-16 border-solid rounded-md border-white border-2 drop-shadow  duration-300 hover:drop-shadow-lg hover:opacity-70 hover:border-cyan-400 active:scale-105 ">
                            <h1>{project.name}</h1>
                        </div>
                    )})}
            </div>
            <ToastContainer theme="colored"/>
        </div>
    )
}


