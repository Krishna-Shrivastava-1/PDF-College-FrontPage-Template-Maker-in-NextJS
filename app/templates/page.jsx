import Navbar from '@/components/Navbar'
import SpotlightCard from '@/components/SpotlightCard'
import { AspectRatio } from '@/components/ui/aspect-ratio'
import Link from 'next/link'
import React from 'react'

const page = () => {
  return (
    <div className='text-white'>
      <Navbar />
      <div>
        <h2 className='text-3xl font-bold textsh text-center mb-3 mt-4 m-2'>Select your Required PDF Teplate to use</h2>
        <div className='flex items-center justify-center flex-col w-full p-3'>
          <Link href='/front-page-maker'>
            <SpotlightCard className="bg-white/10  shadow-purple-950 rounded-2xl shadow-xl flex-wrap md:flex-nowrap   flex  items-center justify-around max-w-3xl m-3" spotlightColor="#1f0821">

              <div className='w-full flex items-center justify-center mb-3'>

                <img className='max-h-56' src="/assets/frontpagetemplate.png" alt="template" />
              </div>

              <div>
                <h1 className='text-white font-bold text-center text-2xl mx-2'>Group Project or Lab file Template</h1>
                <p className='text-zinc-300'>You can make your front page of project or lab file from here directly and can add multiple names and change font style.</p>
              </div>
            </SpotlightCard>
          </Link>
          <Link href='/certificate'>
            <SpotlightCard className="bg-white/10  shadow-purple-950 rounded-2xl shadow-xl  flex-wrap md:flex-nowrap flex  items-center justify-around max-w-3xl m-3" spotlightColor="#1f0821">

              <div className='w-full flex items-center justify-center mb-3'>

                <img className='max-h-56' src="/assets/certificate.png" alt="template" />
              </div>

              <div className='mx-2'>
                <h1 className='text-white font-bold text-center text-2xl mx-2'>Certificate Template</h1>
                <p className='text-zinc-300 '>You can make your certificate page of project or lab file from here directly and can create multiple named pages and change font style.</p>
              </div>
            </SpotlightCard>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default page