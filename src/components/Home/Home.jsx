import React, { useEffect } from 'react'
import "react-responsive-carousel/lib/styles/carousel.min.css"; 
import { Carousel } from 'react-responsive-carousel';
import l1 from '../../assets/l8.jpg';
import l2 from '../../assets/l9.jpg';
import './Home.css'
import Card from '../../Card/Card.jsx';
import { getDatabase, ref, onValue } from "firebase/database";
import Queries from '../Cqueries/Queries.jsx';




function Home() {

  const [data, setData] = React.useState([]);
  const [array, setArray] = React.useState([]);
  
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
    
    <main className='min-w-screen min-h-screen bg-white'>
      
    <div className='w-full h-[750px] mt-[4rem] md:mt-0 flex justify-center items-center'>
      <Carousel
        axis='horizontal'
        autoPlay
        infiniteLoop
        showThumbs={false}
        showArrows={false}
        showStatus={false}
        className='w-[1300px] h-[700px]'
      >
        <div className='block m-auto w-full h-[700px] object-cover'>
          <img className='h-[700px]' src={l1} />
          
        </div >
        <div className='block m-auto w-full h-[700px] object-cover'>
          <img className='h-[700px]' src={l2} />
        </div>
        <div className='block m-auto w-full h-[700px] object-cover'>
          <img className='h-[700px]' src={l1} />
        </div>
      </Carousel>
    </div>
    <div className='  mt-5 md:flex items-center justify-center'>

    <div className='relative flex flex-col justify-center items-center md:block'>
      {
        array.map((item, index) => (
          index <= 20 && <Card product={data[item]} id={item} />
        ))
      }
    </div>
    </div>
    </main>
  )
}

export default Home