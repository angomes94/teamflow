import React,{useState} from 'react'


export default function Task({
                selectedProjectTeam,
                task,
                isChangeAssignedTo, 
                selectedTaskID,  
                handleChangeAssignedMember, 
                setisChangeAssignedTo, 
                setSelectedTaskID, 
                isEditTask, 
                handleEditTask, 
                setEditTaskText,
                setisEditTask,
                editTaskText,
                handleDeleteTask,
                isMoveTask,
                handleMoveTask,
                setisMoveTask,
                taskStatusNav1,
                taskStatusNav2
}) {

    const [newAssignedTo, setnewAssignedTo] = useState("")

    return (
        <div className=" flex flex-col  cursor-pointer p-2 m-2 border-solid rounded-md border-white border-2 duration-300 hover:border-cyan-400 ">
            {isChangeAssignedTo && selectedTaskID === task.id ?
                (<div className=' flex flex-row'>       
                <div>
                                <select
                                    id="members"
                                    className=" text-black font-light text-lg rounded-xl block w-full p-3 "
                                    value={newAssignedTo}
                                    onChange={(e) => { setnewAssignedTo(e.target.value); handleChangeAssignedMember(task.id, e.target.value)}}>
                                    <option value="">Choose a new member</option>
                                    {selectedProjectTeam.map((teammember, index) => (
                                        <option key={index} value={teammember} className="bg-black">
                                            {teammember}
                                        </option>
                                    ))}
                                </select>
                            </div>  
                </div>) : (<h1 className='text-lg font-thin py-2 border-solid border-b-2 '>{task.assignedTo} <i onClick={() => { setisChangeAssignedTo(true); setSelectedTaskID(task.id); }} className="fa-solid fa-pencil mr-2 p-2 text-white text-2xl duration-300 hover:scale-110 hover:text-cyan-400"></i> </h1>)}
            <div className='flex flex-row justify-between py-2'>
                {isEditTask && selectedTaskID === task.id ? (<input value={editTaskText} onChange={(e) => setEditTaskText(e.target.value)} className=' text-lg md:text-xl font-light p-2 duration-300 rounded-xl border-b-4 border-solid border-white focus:border-cyan-400 text-slate-900 ' />)
                    : (<p className="text-white mr-2">{task.title}</p>)}
                <div className='flex flex-row items-center'>
                    {isEditTask && selectedTaskID === task.id ? (<i onClick={() => { handleEditTask(task.id) }} className="fa-solid fa-circle-check ml-2 p-2 text-white text-4xl duration-300 hover:scale-110 hover:text-cyan-400"></i>)
                        : (
                            <>
                                <i onClick={() => { setEditTaskText(task.title); setisEditTask(true); setSelectedTaskID(task.id) }} className="fa-solid fa-pencil mr-2 p-2 text-white text-2xl duration-300 hover:scale-110 hover:text-cyan-400"></i>
                                <i onClick={() => handleDeleteTask(task.id)} className=" fa-solid fa-trash mr-2 p-2 text-white text-2xl duration-300 hover:scale-110 hover:text-red-400"></i>
                            </>
                        )}
                </div>
            </div>
            {isMoveTask && selectedTaskID === task.id && (<div className=' flex flex-row p-2 justify-between '>
                <button onClick={() => handleMoveTask(task.id, taskStatusNav1)} className="bg-white rounded-full duration-300 hover:scale-110 text-black font-semibold py-2 px-4 border border-gray-600 "> {taskStatusNav1}</button>
                <button onClick={() => handleMoveTask(task.id, taskStatusNav2)} className="bg-white rounded-full duration-300 hover:scale-110 text-black font-semibold py-2 px-4 border border-gray-600 "> {taskStatusNav2}</button>
            </div>)}
            <i onClick={() => { setisMoveTask(!isMoveTask); setSelectedTaskID(task.id) }} className="fa-solid fa-angles-down p-2 text-white text-2xl duration-300 hover:scale-110 hover:text-cyan-400"></i>
        </div>
    )
}
