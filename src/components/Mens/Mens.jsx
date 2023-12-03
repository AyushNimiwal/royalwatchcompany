import React from 'react'
import { getDatabase, ref, onValue } from "firebase/database";
import Card from '../../Card/Card.jsx';
function Mens() {
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
    <>
      <div className='text-slate-500 m-5 text-2xl'>Mens Watches</div>
      <div className='w-full flex justify-evenly items-center md:block mt-[6rem] md:mt-0'>
      {
          array.map((item) => (
              data[item].tag==='mens'?
            <Card key={item} product={data[item]} id={item} />
            :<></>
          ))
      }
      </div>
    </>
  )
}

export default Mens