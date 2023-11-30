import React,{ useState } from 'react'
import './App.css'
import l8 from './assets/l8.jpg'
import l9 from './assets/l9.jpg'
import l3jpg from './assets/l3jpg.jpg'
import lady from './assets/lady.jpg'
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css"; 
import Card from './Card/Card';
import { getDatabase, ref, onValue } from "firebase/database";
import { Link } from 'react-router-dom'
import Footer from './components/Footer/Footer'
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
    <div className=' w-screen h-screen block'>
      <div className=' relative '>
        <div className='w-full flex items-top justify-center mt-4'>
          <Carousel 
          autoPlay={true} infiniteLoop={true} showThumbs={false} showStatus={false} showArrows={false} interval={3000} transitionTime={1000} className=' w-3/4 shadow-2xl div-carousel'>
            
              <div className='w-full object-cover div-carousel'>
                <img className='w-full h-full' src={l8} />
              </div>
              <div className='w-full object-cover div-carousel'>
                <img className='w-full h-full' src={l9} />
              </div>
          </Carousel>
        
        </div>
        <div className='mt-10'>
          <div className='w-full text-center text-xl animate-bounce hover:underline transition-all select-none text-slate-500'>
            BestSeller
          </div>
          <div className='w-full flex justify-evenly mt-10 card-show'>
          {
              array.map((item) => (
                  data[item].tag==='bestseller'&&(Bcount=Bcount+1)<4?
                    <Card key={item} product={data[item]} id={item} />
                :<></>
              ))
          }   
          </div>
        </div>
        <div className='flex justify-around mt-6 two-card-show'>
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
        <div className='mt-10'>
          <div className='w-full text-center text-xl hover:underline transition-all select-none text-slate-500'>
            Mens Watches
          </div>
          <div className='w-full flex justify-evenly mt-6 card-show'>
          {
              array.map((item) => (
                data[item].tag==='mens'&&(Mcount=Mcount+1)<4?
                  <Card key={item} product={data[item]} id={item} />
              :<></>
            ))
          }   
          </div>
        </div>
        <div className='mt-2'>
          <div className='w-full text-center text-xl hover:underline transition-all select-none text-slate-500'>
            Womens Watches
          </div>
          <div className='w-full flex justify-evenly mt-6 card-show'>
          {
              array.map((item) => (
                data[item].tag==='womens'&&(Wcount=Wcount+1)<4?
                  <Card key={item} product={data[item]} id={item} />
              :<></>
            ))
          }   
          </div>
        </div>
      <Footer/>
      </div>
      </div>
    </>
  )
}

export default App
