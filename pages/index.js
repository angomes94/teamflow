import React from 'react'
import Head from 'next/head'
import Link from 'next/link'

export default function Home() {
    return (
        <> 
        <Head> <title>TeamFlow</title>
        <meta name="description" content="Generated by create next app"/>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <link rel="icon" href="/favicon.ico"/>
    </Head>
<main>
    <div className=' bg-slate-500 text w-full h-screen'>
        <div
            className='px-10 py-5 flex flex-row bg-slate-800 justify-between items-center'>
            <div className='flex flex-row items-center text-white'>
                <i className=" px-2 fa-solid fa-people-group text-4xl md:text-6xl "></i>
                <h1 className=' text-xl font-extrabold '>TeamFlow</h1>
            </div>
            <Link href="/Login" className=' text-sm md:text-lg px-5 py-2 text-white rounded-full bg-cyan-400 duration-300 hover:scale-110'>Login</Link>
        </div>
        <div className='flex p-5 mt-40 md:mt-10'>
            <div className='flex flex-col md:flex-row items-center'>
                <p className=' text-sm font-light md:max-w-[600px] md:w-1/2 md:text-xl'>
                    Unlock your team's full potential with our app. From project management to task
                    delegation, our app has everything you need to manage your team effectively.
                    With a user-friendly interface and powerful collaboration tools, you'll be able
                    to lead your team to success like never before.</p>
                <img
                    src='/team_colab.svg'
                    alt='team colaboration'
                    className=' mt-10 md:w-1/2 '/>
            </div>
        </div>
        <div className=' absolute left-0 bottom-0 w-full'>
            <img src='/waves.svg' alt='bottom waves'/>
        </div>
    </div>
</main>
</>
    )
}