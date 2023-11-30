import React from 'react'

function About() {
  return (
    <div className='w-11/12 md:flex bg-white/40 text-slate-500  justify-around items-center '>
          <div className='flex flex-col gap-0'>
            <div className=' text-sm mt-2'>Royal Watch Company</div>
            <div className=' text-sm'>Contact Us:<br/>royalwatchcompany@gmail.com<br/>84420-49001</div>
            
          </div>
          <div className='flex flex-col'>
            <div className=' text-sm'>Address:</div>
            <div className=' text-sm p-2'>Old Grain Market,<br/>Opp. SBI Bank<br/>Sangaria,Hanumangarh,Raj.</div>
          </div>
    </div>
  )
}

export default About