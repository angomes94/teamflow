import React, { useEffect,useState }from 'react'
import useFetchProjects from '@/hooks/fetchProjects'
import useFetchTasks from '@/hooks/fetchTasks'
import Navbar from '@/components/Navbar'
import Projects from '@/components/Projects'
import Tasks from '@/components/Tasks'
import Link from 'next/link'



import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';





export default function UserDashboard() {

    const [isSelectedTabProject, setisSelectedTabProject] = useState(true)

    const {loadingProjects, errorProjects, projects} = useFetchProjects()
    const {loadingTasks, errorTasks, tasks} = useFetchTasks()
    


    


    return (
        <div className="flex flex-col w-full h-full min-h-screen bg-black"> 
            <Navbar setSelectedTab = {setisSelectedTabProject}/>        
            <div className='flex flex-col w-full h-full mt-12 md:mt-24 md:flex-row-reverse'>
            {isSelectedTabProject && (<Projects loadingProjects ={loadingProjects} errorProjects = {errorProjects} projects = {projects}/>)}
            {!isSelectedTabProject && (<Tasks loadinTasks = {loadingTasks} errorTasks = {errorTasks} tasks = {tasks}/>)}
            {isSelectedTabProject &&  (<Link href= "/CreateProject" className=' fixed bottom-8 right-8 text-sm md:text-lg px-5 py-4 rounded-full text-white bg-cyan-400 duration-300 hover:ring-2 hover:ring-white'>Create Project</Link>) }
            </div>
            <ToastContainer theme="colored"/>
        </div>
    )
}
