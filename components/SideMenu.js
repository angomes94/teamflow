import React from 'react'


export default function SideMenu({ handleRemoveMember, handleDeleteProject, setisAddNewTask, setisAddNewMember, selectedProjectOwner, selectedProjectTeam }) {





    return (
        <div className=' bg-slate-600 text-white w-full h-40 md:w-56 md:h-screen md:fixed md:top-0 md:right-0 '>
            <div className='flex flex-row md:flex-col h-full w-full text-center items-center md:pt-28'>
                <div className='flex flex-col text-center w-full md:h-full px-2'>
                    <h1 className=' font-semibold py-1 md:py-3'>Team</h1>
                    <ul className=' bg-slate-400  rounded-md font-light h-20 overflow-auto md:h-96'>
                        {selectedProjectTeam.map((member, index) => (
                            <li key={index} className='py-2 text-white duration-300 cursor-pointer'>
                                {member}
                                {member !== selectedProjectOwner ? (
                                    <i onClick={() => handleRemoveMember(member)} className="fa-solid fa-xmark px-2 duration-300 cursor-pointer hover:scale-110"></i>
                                ) : <i className="fa-solid fa-crown px-2"></i>}
                            </li>
                        ))}  
                    </ul>
                </div>
                <div className=' flex justify-center items-center h-full w-full'>
                    <div className='md:mt-auto flex flex-col md:mb-5'>
                        <button onClick={() => { setisAddNewMember(true); setisAddNewTask(false) }} className='text-xs px-5 py-2 md:px-10 md:py-3 mb-5 rounded-full text-white bg-cyan-400 duration-300 hover:ring-2 hover:ring-white  md:text-lg'>Invite</button>
                        <button onClick={() => { setisAddNewTask(true); setisAddNewMember(false) }} className='text-xs px-5 py-2 md:px-10 md:py-3 mb-5 rounded-full text-white bg-cyan-400 duration-300 hover:ring-2 hover:ring-white  md:text-lg'>Add Task</button>
                        <button onClick={() => handleDeleteProject()} className='text-xs px-5 py-2 md:px-10 md:py-3 rounded-full text-white bg-red-400 duration-300 hover:ring-2 hover:ring-white  md:text-lg'>Delete Project</button>
                    </div>
                </div>
                </div>
            </div>
        
    )
}
