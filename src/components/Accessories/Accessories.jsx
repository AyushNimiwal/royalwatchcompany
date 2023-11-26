import React from 'react'
import { getDatabase, ref, onValue } from "firebase/database";
import Card from '../../Card/Card.jsx';
function Accessories() {
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
    {
        array.map((item) => (
            data[item].tag==='accessories'?
          <Card key={item} product={data[item]} id={item} />
          :<></>
        ))
    }
    </>
  )
}

export default Accessories