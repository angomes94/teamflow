import Link from 'next/link'
import Router from 'next/router'
import React, {useState, useEffect} from 'react'
import { useAuth } from '@/context/AuthContext'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function ProjectTeam({setprojectStep, setProjectTeam}) {

    const [teamMember, setTeamMember] = useState('')
    const [teamMembers, setTeamMembers] = useState([])

    const {currentUser, checkIfUserExists} = useAuth()

    useEffect(() => {

        setTeamMembers([...teamMembers, currentUser.email]);
      
    }, [])
    


    const handleAddTeamMember = async () => {
        if (teamMember) {
          const userExists = await checkIfUserExists(teamMember);
          if (userExists) {
            setTeamMembers([...teamMembers, teamMember]);
            setTeamMember('');
          } else {
            toast.warn('This email does not exist');
          }
        } else {
          toast.warn('Please write something first');
        }
      };
      
      

    const handleDeleteTeamMember = (index) => {
        const newList = [...teamMembers]
        newList.splice(index, 1)
        setTeamMembers(newList)
    }

    const createProjectTeam = () => {       
        if(teamMembers){
        setProjectTeam([...teamMembers])
        setprojectStep("projectassign")
        } else{
            toast.warn("Please add at leat one team member")
        }  
    }

    return (
        <div className=" w-full h-screen bg-black">
            <i
                onClick={() => Router.push("/UserDashboard")}
                className=' absolute cursor-pointer fa-solid fa-xmark text-white text-5xl m-10 right-0 top-0 duration-300 hover:scale-110 rounded-xl hover:text-cyan-400'></i>
            <div className="flex flex-col w-full h-full items-center">
                <h1 className='text-white py-5 mt-28 text-2xl font-extrabold md:text-4xl'>Team Members</h1>
                <div className='flex flex-row'>
                    <input
                        placeholder='example@gmail.com'
                        value={teamMember}
                        onChange={(e) => setTeamMember(e.target.value)}
                        type="email"
                        className='text-lg md:text-xl font-light p-2 duration-300 rounded-xl rounded-r-none border-b-4 border-solid border-white focus:border-cyan-400 text-slate-900 w-[20ch] md:w-[30ch]'/>
                    <button
                        onClick={ handleAddTeamMember}
                        className=' uppercase rounded-xl rounded-l-none text-sm px-8 py-4 text-white bg-cyan-400 duration-300 active:scale-110'>add</button>
                </div>
                <div className='grid grid-cols-1 gap-4 mx-10 mt-10 sm:grid-cols-2 md:grid-cols-4'>
                {
                    teamMembers.map((teamMember, index) => (
                        <div key={index} className="flex justify-between cursor-pointer p-2 m-2 border-solid rounded-md border-white border-2 duration-300 hover:scale-110 ">
                           { teamMember === currentUser.email ? 
                           <> 
                           <p className="text-white mr-4">{teamMember}</p>
                            <i onClick={() => handleDeleteTeamMember(index)} className=" fa-solid fa-crown text-white text-xl "/>
                            </> 
                            : 
                            <> 
                            <p className="text-white mr-4">{teamMember}</p>
                            <i onClick={() => handleDeleteTeamMember(index)} className=" fa-solid fa-trash text-white text-xl duration-300 hover:scale-110 hover:text-red-400  "/>
                            </> }
                        </div>

                    ))
                }
            </div>
            </div>
            <i
                onClick={createProjectTeam}
                className='absolute cursor-pointer text-5xl m-10  fa-solid fa-angles-right text-white right-0 bottom-0 duration-300 hover:scale-110 rounded-xl hover:text-cyan-400'></i>
        <ToastContainer theme="colored"/>
        </div>
    )
}
