import React from 'react'
import TeamSVG from "../public/team_colab.svg"
import Wave from "../public/waves.svg"

export default function FirstPage() {
    return (
        <div className=' bg-[#393E46] text-[#EEEEEE] w-full h-screen'>
            <div
                className='px-10 py-5 flex flex-row bg-[#222831] justify-between items-center'>
                <div className='flex flex-row items-center text-[#EEEEEE]'>
                    <i className=" px-2 fa-solid fa-people-group text-4xl md:text-6xl "></i>
                    <h1 className=' text-xl font-extrabold '>TeamFlow</h1>
                </div>
                <button className=' px-5 py-2 text-[#EEEEEE] bg-[#00ADB5]'>Login</button>
            </div>
            <div className='flex flex-col pt-20 p-5 md:flex-row md:items-center'>
                <p className=' text-sm flex font-light  md:px-20 md:max-w-[600px] md:w-1/2 md:text-xl'>Unlock your team's full potential with our app.
                    From project management to task delegation, our app has everything you need to
                    manage your team effectively. With a user-friendly interface and powerful
                    collaboration tools, you'll be able to lead your team to success like never
                    before.</p>
                <div className='flex md:w-1/2 '>
                    <TeamSVG/>
                </div>
                <div className=' absolute left-0 bottom-0 w-full'>
                    <Wave/>
                </div>
            </div>
        </div>
    )
}
