import React,{ useState } from 'react'
import './App.css'
import l3jpg from './assets/l3jpg.jpg'
import lady from './assets/lady.jpg'
import { NavLink } from 'react-router-dom'
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css"; 
import Card from './Card/Card';
import { getDatabase, ref, onValue } from "firebase/database";
import { Link } from 'react-router-dom'
function App() {
  const [data, setData] = React.useState([]);
  const [array, setArray] = React.useState([]);
  let Bcount=0;
  let Wcount=0;
  let Mcount=0;
  const fetchData = () => {
    const db = getDatabase();
    const databaseRef = ref(db, '/');
    onValue(databaseRef, (snapshot) => {
      const res = snapshot.val();
      if(res){
        setData(res);
        setArray(...array,Object.keys(res));
      }
    });
  }
  React.useEffect(() => {
    fetchData();
  },[]);
  
  return (
    <>
    <div className='w-full h-full'>
        <div className='w-full md:flex mt-4 justify-around '>
        <NavLink to='/mens'><div className='px-4 md:py-3 py-4 text-center mx-24  my-3 bg-gradient-to-br from-black via-gray-900 to-gray-700 rounded-md hover:scale-105 hover:text-orange-300 shadow-xl text-xl'>Mens</div></NavLink>
        <NavLink to='/womens'><div className='px-4 md:py-3 py-4 text-center mx-24  my-3 bg-gradient-to-bl from-black via-gray-900 to-gray-700 rounded-md hover:scale-105 hover:text-orange-300 shadow-xl text-xl'>Womens</div></NavLink>
        <NavLink to='/goggles'><div className='px-4 md:py-3 py-4 text-center mx-24  my-3 bg-gradient-to-tr from-black via-gray-900 to-gray-700 rounded-md hover:scale-105 hover:text-orange-300 shadow-xl text-xl'>Goggles</div></NavLink>
        <NavLink to='/accessories'><div className='px-4 md:py-3 py-4 text-center mx-24  my-3 bg-gradient-to-tl from-black via-gray-900 to-gray-700 rounded-md hover:scale-105 hover:text-orange-300 shadow-xl text-xl'>Accessories</div></NavLink>
        </div>
        <div className='mt-10'>
          <div className='w-full text-center text-2xl animate-bounce hover:underline transition-all select-none text-slate-500'>
            BestSeller
          </div>
          <div className='w-full h-full flex justify-evenly mt-6 card-show'>
          {
              array.map((item) => (
                  data[item].tag==='bestseller'&&(Bcount=Bcount+1)<=4?
                    <Card key={item} product={data[item]} id={item} />
                :<></>
              ))
          }   
          </div>
        </div>
        <div className='flex justify-around two-card-show'>
          <Link to='/mens'>
            <div className=' m-4 relative object-cover two-items rounded-xl hover:shadow-2xl hover:scale-95 transition-transform'>
                <img src={l3jpg} className=' absolute rounded-xl two-item-img hover:scale-95'/>
                <div className='w-full h-full z-10 bg-black/30 absolute rounded-xl'>
                        <div className='w-full h-full flex justify-center items-center text-3xl text-white font-semibold text-center hover:scale-125 transition-transform'>Mens Watches</div>
                </div>
            </div></Link>
            <Link to='/womens'>
            <div className=' m-4 relative object-cover two-items rounded-xl hover:shadow-2xl hover:scale-95 transition-transform'>
                <img src={lady} className=' absolute rounded-xl two-item-img hover:scale-95'/>
                <div className='w-full h-full z-10 bg-black/30 absolute rounded-xl'>
                        <div className='w-full h-full flex justify-center items-center text-3xl text-white font-semibold text-center hover:scale-125 transition-transform'>Womens Watches</div>
                </div> 
            </div></Link>
        </div>
        <div className=' md:mt-20 mt-6'>
          <div className='w-full text-center text-xl hover:underline transition-all select-none text-slate-500'>
            Mens Watches
          </div>
          <div className='w-full flex justify-evenly mt-6 card-show'>
          {
              array.map((item) => (
                data[item].tag==='mens'&&(Mcount=Mcount+1)<=4?
                  <Card key={item} product={data[item]} id={item} />
              :<></>
            ))
          }   
          </div>
        </div>
        <div className=''>
          <div className='w-full text-center text-xl hover:underline transition-all select-none text-slate-500'>
            Womens Watches
          </div>
          <div className='w-full flex justify-evenly mt-6 card-show'>
          {
              array.map((item) => (
                data[item].tag==='womens'&&(Wcount=Wcount+1)<=4?
                  <Card key={item} product={data[item]} id={item} />
              :<></>
            ))
          }   
          </div>
        </div>
      </div>
    </>
  )
}

export default App
