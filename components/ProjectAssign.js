import React, {useState, useEffect} from 'react';
import Router from 'next/router';
import { useAuth } from '@/context/AuthContext';
import { async } from '@firebase/util';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { TASK_STATUS } from '@/utils/constants';

export default function ProjectAssign({ projectName, projectTasks, projectTeam}) {

    const [selectedMember, setSelectedMember] = useState("")
    const [selectedTask, setselectedTask] = useState("")
    const [allTasks, setallTasks] = useState([...projectTasks]) 
    const [assignments, setAssignments] = useState([])
    const [loading, setLoading] = useState(false)

    const {createProject} = useAuth()
    

    useEffect(() => {
      if (selectedMember && selectedTask) {
        setTimeout(() => {
          const foundIndex = assignments.findIndex(assignment => assignment.member === selectedMember);
          if (foundIndex === -1) {
            setAssignments([...assignments, { member: selectedMember, tasks: [selectedTask] }]);
          } else {
            setAssignments([
              ...assignments.slice(0, foundIndex),
              {
                ...assignments[foundIndex],
                tasks: [...assignments[foundIndex].tasks, selectedTask],
              },
              ...assignments.slice(foundIndex + 1),
            ]);
          }
          setallTasks(allTasks.filter(task => task !== selectedTask));
          setselectedTask("");
          setSelectedMember("");
        }, 100);
      }
    }, [selectedMember, selectedTask, assignments]);
    
  


    const handleCreateProject = async () => {
      
      const firestoreTasks = assignments.reduce((tasks, assignment) => {
        return tasks.concat(
          assignment.tasks.map((task) => {
            return {
              assignedTo: assignment.member,
              title: task,
              status: TASK_STATUS.TODO
            };
          })
        );
      }, []);
      

     try {
        setLoading(true)
        await createProject(projectName, firestoreTasks)
        Router.push("/UserDashboard")
      } catch (error) {
        console.log(error)
        toast.error("Something went wrong!")
      }finally {
        setLoading(false)
    }
}
    


    return (
        <div className='w-full min-h-screen p-5 text-white bg-black'>
            <i
                onClick={() => Router.push("/UserDashboard")}
                className=' absolute cursor-pointer fa-solid fa-xmark text-white text-5xl m-10 right-0 top-0 duration-300 hover:scale-110 rounded-xl hover:text-cyan-400'></i>
            <div className='flex items-center flex-col'>
                <h1 className="pt-20 font-extrabold text-4xl">{projectName}</h1>
                <p className='text-sm font-extralight p-5'> {`Connect the tasks to the team members that you want to assign right now and leave the ones you aren't sure`} </p>
                <div className=' flex flex-row'>
                    <div className="flex-1">
                        <h1 className='text-center text-lg font-medium'>Team</h1>
                        <div>
                            {
                              projectTeam.map((member, index) => (
                                    <div
                                        key={index}
                                        className={`flex cursor-pointer items-center p-2 m-2 border-solid rounded-md border-white border-2 duration-300 hover:scale-110 ${selectedMember === member
                                            ? ' border-green-400'
                                            : ''}`}
                                        onClick={() => setSelectedMember(member)}>
                                        <p
                                            className={` text-sm font-normal ${selectedMember === member
                                                ? ' text-green-400'
                                                : 'text-white'}`}>{member}</p>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                    <div className="flex-1">
                        <h1 className='text-center text-lg font-medium'>Tasks</h1>
                        <div>
                            {
                                allTasks.map((task, index) => (
                                    <div
                                        key={index}
                                        className={`flex cursor-pointer items-center p-2 m-2 border-solid rounded-md border-white border-2 duration-300 hover:scale-110 ${selectedTask === task
                                            ? ' border-green-400'
                                            : ''}`}
                                        onClick={() => setselectedTask(task)}>
                                        <p
                                            className={` text-sm font-normal ${selectedTask === task
                                                ? ' text-green-400'
                                                : 'text-white'}`}>{task}</p>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </div>
            </div>
            <div className='w-full text-center text-white font-extrabold text-2xl p-5 '>
              <h1> Review: </h1>
            </div>
            <div className=' mb-20 text-white grid grid-cols-1 gap-4 mx-10 mt-10 sm:grid-cols-2 md:grid-cols-4'>
            {
              assignments.map(( {member, tasks}) => (
                <div key={member} className='flex flex-col border-white border-2 rounded-md p-2 '>
                  <h1 className='text-center text-lg font-medium'>{member}</h1>
                  {tasks.map((task, index) => (
                        <div key={index} className=" flex cursor-pointer p-2 m-2 border-solid rounded-md border-white border-2 duration-300 hover:scale-110 ">
                            <p className="text-white text-sm font-normal">{task}</p>
                            </div>
                    ))}
                </div>
              ))}
            </div>
            {!loading ? (
                    <i
                      onClick={handleCreateProject}
                      className='fixed right-0 bottom-0 cursor-pointer text-5xl m-10 fa-solid fa-circle-check text-white duration-300 hover:scale-110 rounded-xl hover:text-cyan-400'
                    ></i>
                  ) : (
                    <i
                      className='fixed right-0 bottom-0 text-5xl m-10 fa-solid fa-spinner text-cyan-400 duration-300 rounded-xl animate-spin'
                    ></i>
                  )}

         <ToastContainer theme="colored"/>
        </div>
    );
}
