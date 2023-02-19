import React, { useEffect, useState } from 'react'
import SideMenu from '@/components/SideMenu'
import { useAuth } from '@/context/AuthContext'
import useFetchCurrentProject from '@/hooks/fetchCurrentProject'
import Link from 'next/link'
import Router from 'next/router'
import Task from '@/components/Task'
import { ERROR, TASK_STATUS } from '@/utils/constants'


import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { async } from '@firebase/util'





export default function ProjectDashboard() {

    const [isAddNewTask, setisAddNewTask] = useState(false)
    const [isAddNewMember, setisAddNewMember] = useState(false)
    const [isEditTask, setisEditTask] = useState(false)
    const [isMoveTask, setisMoveTask] = useState(false)
    const [isChangeProjectTitle, setisChangeProjectTitle] = useState(false)
    const [isChangeAssignedTo, setisChangeAssignedTo] = useState(false)
    const [selectedTaskID, setSelectedTaskID] = useState("")
    const [editTaskText, setEditTaskText] = useState("")
    const [task, setTask] = useState("")
    const [member, setMember] = useState("")
    const [projectName, setProjectName] = useState("")
    const [showAllTasks, setShowAllTasks] = useState(true)
    const [isOwner, setisOwner] = useState(false)

    const { 
        loading,
        error,
        selectedProjectID,
        selectedProjectName,
        selectedProjectOwner,
        selectedProjectTasks,
        selectedProjectTeam } = useFetchCurrentProject()

    const {checkIfUserIsProjectOwner, checkIfUserIsTaskAssignedTo, checkIfUserExists, modifyAssignedTo, changeProjectName, deleteProject, inviteNewMember, deleteTeamMember, createNewTask, deleteTask, modifyTask, modifyTaskStatus, logout, currentUser } = useAuth()



    const handleCreateTask =  async () => {

        if (!task || !member) {
          toast.warn(ERROR.EMPTY_INPUT);
          return;
        }
      
        const isOwner = await checkIfUserIsProjectOwner(selectedProjectID);
        if (!isOwner) {
          toast.error(ERROR.NO_RIGHTS);
          return;
        }
      
        try {
          createNewTask(selectedProjectID, task, member);
          setisAddNewTask(false);
          setTask("");
          setMember("");
        } catch (error) {
          toast.error(ERROR.GENERAL_ERROR);
        }
      }
      


    const handleInviteMember = async () => {
        
        if (!member) {
            toast.warn(ERROR.EMPTY_INPUT)
            return;
        }


       const userExists = await checkIfUserExists(member);
        if(!userExists){
            toast.error(ERROR.NO_USER)
            return;
        }

        const isOwner = await checkIfUserIsProjectOwner(selectedProjectID)
        if(!isOwner){
            toast.error(ERROR.NO_RIGHTS)
            return;
        }    
            
                try {
                inviteNewMember(selectedProjectID, member)
                setisAddNewMember(false)
                setMember("")
            } catch (error) {
                toast.error(ERROR.GENERAL_ERROR)
            }
        }
        

    


    const handleDeleteTask = async (taskid)  => {

        const isOwner = await checkIfUserIsProjectOwner(selectedProjectID)
        const isUserAssignedTo = await checkIfUserIsTaskAssignedTo(selectedProjectID, taskid)

        if(isOwner || isUserAssignedTo){
            
            try {
                deleteTask(selectedProjectID, taskid)
            } catch (error) {
                toast.error(ERROR.GENERAL_ERROR)
    
            }
        }else{
            toast.error(ERROR.NO_RIGHTS)
        }
    }



    const handleEditTask = async (taskid) => {

        if (!editTaskText) {
            toast.warn(ERROR.TEXT_EMPTY)
            return;
        }

        const isOwner = await checkIfUserIsProjectOwner(selectedProjectID)

        if(isOwner){
            try {
                modifyTask(selectedProjectID, taskid, editTaskText)
                setisEditTask(false)
            } catch (error) {
                toast.error(ERROR.GENERAL_ERROR)

            }
        }else{
            toast.error(ERROR.NO_RIGHTS)
            setisEditTask(false)
        }

    }



    const handleMoveTask = async (taskid, status) => {


        const isOwner = await checkIfUserIsProjectOwner(selectedProjectID)
        const isUserAssignedTo = await checkIfUserIsTaskAssignedTo(selectedProjectID, taskid)

        if(isOwner || isUserAssignedTo){

            try {
                modifyTaskStatus(selectedProjectID, taskid, status)
            } catch (error) {
                toast.error(ERROR.GENERAL_ERROR)
            }
        }else{
            toast.error(ERROR.NO_RIGHTS)
        }

    }


    const handleRemoveMember = async (member) => {

        const isOwner = await checkIfUserIsProjectOwner(selectedProjectID)

        if(!isOwner){
            toast.error(ERROR.NO_RIGHTS)
            return;
        }

       
        try {
            deleteTeamMember(selectedProjectID, member)
        } catch (error) {
            toast.error(ERROR.GENERAL_ERROR)
        }
    }



    const handleDeleteProject = async () => {

        const isOwner = await checkIfUserIsProjectOwner(selectedProjectID)

        if(!isOwner){
            toast.error(ERROR.NO_RIGHTS)
            return;
        }


        try {
            deleteProject(selectedProjectID)
            Router.push("/UserDashboard")
        } catch (error) {
            toast.error(ERROR.GENERAL_ERROR)
        }
    }


    const handleChangeProjectName = async (projectName) => {
        
        if (!projectName) {
            toast.warn(ERROR.EMPTY_INPUT)
            return;
        }


        const isOwner = await checkIfUserIsProjectOwner(selectedProjectID)


        if(!isOwner){
            toast.error(ERROR.NO_RIGHTS)
            return;
        }


            try {

                changeProjectName(selectedProjectID, projectName)
                setisChangeProjectTitle(false)
                setProjectName("")

            } catch (error) {
                toast.error(ERROR.GENERAL_ERROR)
            }
        } 
    


    const handleChangeAssignedMember = async (taskid, newAssignedMember) => {

        if (!newAssignedMember) {
            toast.warn(ERROR.TEXT_EMPTY)
            return;
        }

        const isOwner = await checkIfUserIsProjectOwner(selectedProjectID)

        if(!isOwner){
            toast.error(ERROR.NO_RIGHTS)
            setisChangeAssignedTo(false)
            return;
        }


            try {
                modifyAssignedTo(selectedProjectID, taskid, newAssignedMember)
            } catch (error) {
                toast.error(ERROR.GENERAL_ERROR)
            }

            setisChangeAssignedTo(false)
        } 

       
    




    return (
        <div className=" relative min-h-screen text-white bg-black ">
            <div className=" sticky top-0 w-full bg-slate-800 z-10">
                <div className="flex items-center justify-between py-3 px-4 md:px-8 md:py-5 ">
                    <div className='flex flex-row items-center text-white'>
                        <i onClick={() => Router.push("/UserDashboard")} className=" px-2 fa-solid fa-people-group text-4xl cursor-pointer md:text-6xl "></i>
                        <h1 className=' text-xl font-extrabold '>TeamFlow</h1>
                    </div>

                    <div
                        className=" text-xl text-red-400 px-6 text-center  border-cyan-400  md:pl-20 md:hover:text-cyan-400 md:hover:bg-transparent">
                        <Link href="/" onClick={() => logout()}>
                            Logout
                        </Link>
                    </div>
                </div>

            </div>
            <SideMenu handleRemoveMember={handleRemoveMember} handleDeleteProject={handleDeleteProject} setisAddNewTask={setisAddNewTask} deleteTeamMember={deleteTeamMember} setisAddNewMember={setisAddNewMember} selectedProjectOwner={selectedProjectOwner} selectedProjectTeam={selectedProjectTeam} />
            <div className=' md:mr-56'>
                {!isChangeProjectTitle ?
                    <h1 className='text-center py-5 font-extrabold text-4xl'> {selectedProjectName} <i onClick={() => setisChangeProjectTitle(true)} className="fa-solid fa-pencil cursor-pointer mr-2 p-2 text-white text-2xl duration-300 hover:scale-110 hover:text-cyan-400"></i> </h1> :
                    <div className='flex flex-col items-center justify-center'>
                        <div className='p-3'>
                            <h1 className='py-2'>New Project Name:</h1>
                            <input
                                value={projectName}
                                onChange={(e) => setProjectName(e.target.value)}
                                type="text"
                                className=' text-lg md:text-xl font-light p-2 duration-300 rounded-xl border-b-4 border-solid border-white focus:border-cyan-400 text-slate-900 w-[20ch] ' />
                        </div>
                        <div className=' flex flex-row '>
                            <button
                                onClick={() => { setisChangeProjectTitle(false); setProjectName("") }}
                                className=' uppercase rounded-xl text-sm mr-2 px-8 py-4 text-white bg-red-400 duration-300 active:scale-110'>cancel</button>
                            <button
                                onClick={() => handleChangeProjectName(projectName)}
                                className=' uppercase rounded-xl text-sm ml-2 px-8 py-4 text-white bg-cyan-400 duration-300 active:scale-110'>Done</button>
                        </div>
                    </div>}
                {isAddNewTask && (
                    <div className='flex flex-col items-center justify-center'>
                        <div className='p-3'>
                            <h1 className='py-2'>Task:</h1>
                            <input
                                value={task}
                                onChange={(e) => setTask(e.target.value)}
                                type="text"
                                className=' text-lg md:text-xl font-light p-2 duration-300 rounded-xl border-b-4 border-solid border-white focus:border-cyan-400 text-slate-900 w-[20ch] ' />

                            <div>
                                <label className=" my-2 text-black dark:text-white">
                                    Select a member:
                                </label>
                                <select
                                    id="members"
                                    className=" text-black font-light text-lg rounded-xl block w-full p-3 "
                                    value={member}
                                    onChange={(e) => setMember(e.target.value)}>
                                    <option value="">Choose a member</option>
                                    {selectedProjectTeam.map((teammember, index) => (
                                        <option key={index} value={teammember} className="bg-black">
                                            {teammember}
                                        </option>
                                    ))}
                                </select>
                            </div>  
                            </div>
                        <div className=' flex flex-row '>
                            <button
                                onClick={() => { setisAddNewTask(false); setMember(""); setTask("") }}
                                className=' uppercase rounded-xl text-sm mr-2 px-8 py-4 text-white bg-red-400 duration-300 active:scale-110'>cancel</button>
                            <button
                                onClick={() => handleCreateTask()}
                                className=' uppercase rounded-xl text-sm ml-2 px-8 py-4 text-white bg-cyan-400 duration-300 active:scale-110'>add</button>
                        </div>
                    </div>)}

                {isAddNewMember && (

                    <div className='flex flex-col items-center justify-center'>
                        <div className='p-3'>
                            <h1 className='py-2'>Member:</h1>
                            <input
                                value={member}
                                onChange={(e) => setMember(e.target.value)}
                                type="email"
                                className=' text-lg md:text-xl font-light p-2 duration-300 rounded-xl border-b-4 border-solid border-white focus:border-cyan-400 text-slate-900 w-[20ch]' />
                        </div>
                        <div className=' flex flex-row '>
                            <button
                                onClick={() => { setisAddNewMember(false); setMember("") }}
                                className=' uppercase rounded-xl text-sm mr-2 px-8 py-4 text-white bg-red-400 duration-300 active:scale-110'>cancel</button>
                            <button
                                onClick={() => handleInviteMember()}
                                className=' uppercase rounded-xl text-sm ml-2 px-8 py-4 text-white bg-cyan-400 duration-300 active:scale-110'>Invite</button>
                        </div>
                    </div>

                )}


                <div className=' flex flex-row py-5'>
                    <button onClick={() => setShowAllTasks(true)} className={`flex-1 ${showAllTasks ? "underline-offset-8 decoration-cyan-400 border-b-2" : ""}`}>All Tasks</button>
                    <button onClick={() => setShowAllTasks(false)} className={`flex-1 ${!showAllTasks ? "underline-offset-8 decoration-cyan-400 border-b-2" : ""}`}>My Tasks</button>
                </div>
                <div className='flex flex-col text-center px-5 md:flex-row overflow-hidden'>
                    <div className=' md:flex-1'>
                        <h1 className=' font-semibold text-lg'>Todo</h1>
                        {selectedProjectTasks.filter(task => (!showAllTasks && task.assignedTo === currentUser.email) || showAllTasks)
                            .filter(task => task.status === TASK_STATUS.TODO)
                            .map(task => (
                                <Task key={task.id}
                                    selectedProjectTeam = {selectedProjectTeam}
                                    task={task}
                                    isChangeAssignedTo={isChangeAssignedTo}
                                    selectedTaskID={selectedTaskID}
                                    handleChangeAssignedMember={handleChangeAssignedMember}
                                    setisChangeAssignedTo={setisChangeAssignedTo}
                                    setSelectedTaskID={setSelectedTaskID}
                                    isEditTask={isEditTask}
                                    handleEditTask={handleEditTask}
                                    setEditTaskText={setEditTaskText}
                                    setisEditTask={setisEditTask}
                                    editTaskText={editTaskText}
                                    handleDeleteTask={handleDeleteTask}
                                    isMoveTask={isMoveTask}
                                    handleMoveTask={handleMoveTask}
                                    setisMoveTask={setisMoveTask}
                                    taskStatusNav1={TASK_STATUS.DOING}
                                    taskStatusNav2={TASK_STATUS.DONE}
                                />

                            ))}
                    </div>
                    <div className=' md:flex-1'>
                        <h1 className=' font-semibold text-lg'>Doing</h1>
                        {selectedProjectTasks.filter(task => (!showAllTasks && task.assignedTo === currentUser.email) || showAllTasks)
                            .filter(task => task.status === TASK_STATUS.DOING)
                            .map(task => (
                                <Task key={task.id}
                                    selectedProjectTeam = {selectedProjectTeam}
                                    task={task}
                                    isChangeAssignedTo={isChangeAssignedTo}
                                    selectedTaskID={selectedTaskID}
                                    handleChangeAssignedMember={handleChangeAssignedMember}
                                    setisChangeAssignedTo={setisChangeAssignedTo}
                                    setSelectedTaskID={setSelectedTaskID}
                                    isEditTask={isEditTask}
                                    handleEditTask={handleEditTask}
                                    setEditTaskText={setEditTaskText}
                                    setisEditTask={setisEditTask}
                                    editTaskText={editTaskText}
                                    handleDeleteTask={handleDeleteTask}
                                    isMoveTask={isMoveTask}
                                    handleMoveTask={handleMoveTask}
                                    setisMoveTask={setisMoveTask}
                                    taskStatusNav1={TASK_STATUS.TODO}
                                    taskStatusNav2={TASK_STATUS.DONE}
                                />

                            ))}

                    </div>
                    <div className=' md:flex-1'>
                        <h1 className=' font-semibold text-lg'>Done</h1>
                        {selectedProjectTasks.filter(task => (!showAllTasks && task.assignedTo === currentUser.email) || showAllTasks)
                            .filter(task => task.status === TASK_STATUS.DONE)
                            .map(task => (
                                <Task key={task.id}
                                    selectedProjectTeam = {selectedProjectTeam}
                                    task={task}
                                    isChangeAssignedTo={isChangeAssignedTo}
                                    selectedTaskID={selectedTaskID}
                                    handleChangeAssignedMember={handleChangeAssignedMember}
                                    setisChangeAssignedTo={setisChangeAssignedTo}
                                    setSelectedTaskID={setSelectedTaskID}
                                    isEditTask={isEditTask}
                                    handleEditTask={handleEditTask}
                                    setEditTaskText={setEditTaskText}
                                    setisEditTask={setisEditTask}
                                    editTaskText={editTaskText}
                                    handleDeleteTask={handleDeleteTask}
                                    isMoveTask={isMoveTask}
                                    handleMoveTask={handleMoveTask}
                                    setisMoveTask={setisMoveTask}
                                    taskStatusNav1={TASK_STATUS.TODO}
                                    taskStatusNav2={TASK_STATUS.DOING}
                                />

                            ))}

                    </div>
                </div>
            </div>
            <ToastContainer theme="colored" />
        </div>
    )


}


