import React from 'react'
import rwlogo from '../../assets/rwlogo.png'
import { FaArrowDown} from 'react-icons/fa'
import { SocialIcon } from 'react-social-icons'
function Footer() {
  const [isAbout, setIsAbout] = React.useState(false);
  const [isfollow, setIsfollow] = React.useState(false);
  const igIcon=<SocialIcon network='instagram' url='https://www.instagram.com/royal_watchcompany_/'/>
  const fIcon=<SocialIcon network='facebook' url='https://www.facebook.com/royal_watchcompany_/'/>
  const yIcon=<SocialIcon network='youtube' url='https://www.youtube.com/@royalwatchcompany1'/>
  return (
    <div className='w-full h-full flex flex-col bg-black  py-2 justify-center items-center'>
        <img className=' w-32 h-16' src={rwlogo}/>
        <div onClick={()=>(setIsfollow((prev)=>(!prev)))} className='w-11/12 flex justify-around py-2 px-6 border-y-2 md:hover:scale-105 hover:shadow-lg hover:bg-transparent  hover:transition-all hover:border-y-2  hover:border-white'>
            <div>Follow Us</div>
            <div className=' text-xl font-semibold'><FaArrowDown/></div>
        </div>
        {
          isfollow&&
          <div className='w-11/12 flex bg-transparent border-y-2 justify-around items-center '>
          <div className='flex justify-center gap-5 py-5 items-center'>
            {igIcon}
            {fIcon}
            {yIcon}
          </div>
        </div>
        }
        <div onClick={()=>(setIsAbout((prev)=>(!prev)))} className='w-11/12 flex justify-around py-2 px-6 border-y-2 mt-2 md:hover:scale-105 hover:shadow-lg hover:bg-transparent  hover:transition-all hover:border-y-2  hover:border-white'>
            
            <div>About Us</div>
            <div className=' text-xl font-semibold'><FaArrowDown/></div>
        </div>
        {
          isAbout&&
          <div className='w-11/12 md:flex bg-transparent border-y-2 justify-around items-center '>
          <div className='flex flex-col gap-0'>
            <div className='text-white text-sm mt-2'>Royal Watch Company</div>
            <div className='text-white text-sm'>Contact Us:<br/>royalwatchcompany@gmail.com<br/>84420-49001</div>
            
          </div>
          <div className='flex flex-col'>
            <div className='text-white text-sm'>Address:</div>
            <div className='text-white text-sm p-2'>Old Grain Market,<br/>Opp. SBI Bank<br/>Sangaria,Hanumangarh,Raj.</div>
          </div>
        </div>
        }
        
    </div>
  )
}

export default Footer