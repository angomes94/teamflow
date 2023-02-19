import Image from 'next/image';
import Link from 'next/link';
import Router from 'next/router';
import {use, useState} from 'react';
import {useAuth} from "../context/AuthContext"



export default function NavBar({setSelectedTab}) {

    const [navbar, setNavbar] = useState(false);
    const [isProjectTabSelected, setIsProjectTabSelected] = useState(true)
    const { logout } = useAuth()


    function handleTabSelection(isProject) {
        setNavbar(!navbar);
        setSelectedTab(isProject);
        setIsProjectTabSelected(isProject);
      }

 function logoutUser () {  
    setNavbar(!navbar)
    logout()
 }


    return (
        <div>
            <nav className="absolute top-0 right-0 w-full bg-slate-800 z-10">
                <div
                    className="justify-between px-4 mx-auto lg:max-w-7xl md:items-center md:flex md:px-8">
                    <div>
                        <div className="flex items-center justify-between py-3 md:py-5 md:block">
                            <div className='flex flex-row items-center text-white'>
                                <i onClick={() => Router.push("/")} className=" px-2 fa-solid fa-people-group text-4xl cursor-pointer md:text-6xl "></i>
                                <h1 className=' text-xl font-extrabold '>TeamFlow</h1>
                            </div>
                            <div className="md:hidden">
                                <button className="p-2 text-white" onClick={() => setNavbar(!navbar)}>
                                    {
                                        navbar
                                            ? (<i className="fa-solid text-xl fa-xmark"></i>)
                                            : (<i className="fa-solid fa-bars text-xl duration-300"></i>)
                                    }
                                </button>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div
                            className={`flex-1 items-center  md:block md:pb-0 ${
                            navbar
                                ? ' md:p-0 block'
                                : 'hidden'}`}>
                            <ul className="h-1/2 items-center justify-center md:flex ">
                                <li
                                    className={` cursor-pointer  p-8 text-xl text-white  px-6 text-center border-b-2 md:border-b-0  border-cyan-400  md:hover:text-cyan-400 decoration-cyan-400 md:hover:bg-transparent ${ isProjectTabSelected ? "underline underline-offset-8" : " no-underline"}`}>
                                    <a href="#" onClick={() => handleTabSelection(true)}>
                                        Projects
                                    </a>
                                </li>
                                <li
                                    className={` cursor-pointer p-8 text-xl text-white  px-6 text-center  border-b-2 md:border-b-0   border-cyan-400  md:hover:text-cyan-400 decoration-cyan-400 md:hover:bg-transparent ${ !isProjectTabSelected ? "underline underline-offset-8" : " no-underline"}`}>
                                    <a href="#" onClick={() => handleTabSelection(false)}>
                                        Tasks
                                    </a>
                                </li>
                                <li
                                    className="p-8 text-xl text-red-400 px-6 text-center   border-cyan-400  md:pl-20 md:hover:text-cyan-400 md:hover:bg-transparent">
                                    <Link href="/" onClick={logoutUser}>
                                        Logout
                                    </Link>
                                </li>
                            </ul>

                        </div>
                    </div>
                </div>
            </nav>
        </div>
    );
}
