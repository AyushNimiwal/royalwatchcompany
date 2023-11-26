import React from 'react'
import rwlogo from '../../assets/rwlogo.png'
function Footer() {
  return (
    <div className='w-full  overflow-hidden h-40 bg-slate-900 shadow-xl  text-white box-border'>
      <div className='w-full h-full flex justify-center items-center gap-20 '>
          <img className=' w-34 h-20 ' src={rwlogo}/>
        <div className='w-1/2 h-full flex justify-center items-center gap-10'>
          <div className='flex flex-col gap-4'>
            <div className='text-2xl font-semibold'>Royal Watch Company</div>
            <div className='text-lg font-semibold'>Royal Watch is a watch selling website. We sell watches of different brands and different price ranges.</div>
          </div>
          <div className=' flex flex-col gap-4'>
            <div className='text-2xl font-semibold'>Contact Us</div>
            <div className='text-lg font-semibold'>Phone Number: 9876543210</div>
            <div className='text-lg font-semibold'>Email: royalwatcomany@gmail.com
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer