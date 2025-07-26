import React from 'react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from './ui/dropdown-menu'
import Link from 'next/link'

const Navbar = () => {
  return (

    <nav className="flex justify-between items-center px-6 py-4 bg-[#1a032b]/80 border-b backdrop-blur-lg border-[#653be3]/40 sticky top-0 z-50 shadow">

      <span className="font-extrabold text-xl tracking-wide text-purple-300">
        MITS FrontPage Maker
      </span>
      <div className="flex gap-7 items-center  font-semibold text-[#eee]">
       
        <DropdownMenu className='dark'>
          <DropdownMenuTrigger className='cursor-pointer p-2 hover:bg-purple-900 text-white border-none'>Services</DropdownMenuTrigger>
          <DropdownMenuContent className='dark bg-opacity-60 backdrop-blur-lg'>
            <DropdownMenuLabel>Our Services</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <Link href='/certificate'>

              <DropdownMenuItem className='cursor-pointer hover:bg-zinc-700'>Certificate Maker</DropdownMenuItem>
            </Link>
            <Link href='/front-page-maker' > <DropdownMenuItem className='cursor-pointer hover:bg-zinc-700'>FrontPage Maker</DropdownMenuItem></Link>
            <Link href="/templates">
              <DropdownMenuItem className='cursor-pointer hover:bg-zinc-700'>View Templates</DropdownMenuItem>
            </Link>

          </DropdownMenuContent>
        </DropdownMenu>
         <Link href="/about-us">
        <h2 className='cursor-pointer p-2 hover:bg-purple-900 text-white border-none text-nowrap'>About us</h2>
        </Link>
        {/* <a href="#features" className="hover:text-purple-300 transition">Features</a>
          <a href="#how" className="hover:text-purple-300 transition">How it Works</a>
          <a href="#about" className="hover:text-purple-300 transition">About</a> */}
      </div>
      {/* <a
          href="#editor"
          className="px-5 py-2 rounded-lg bg-gradient-to-tr from-purple-600 to-purple-400 text-white font-bold shadow-lg border-2 border-purple-700 hover:brightness-125 duration-150"
        >
          Start
        </a> */}
    </nav>

  )
}

export default Navbar