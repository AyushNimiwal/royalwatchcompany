import React from "react";
import { fs } from "../../config/config";
import { doc,deleteDoc, getDocs, collection, updateDoc } from "firebase/firestore";

function Queries() {
  const [data, setData] = React.useState([]);
  const fetchData = async () => {

      let queryData = collection(fs, "queries");
      let queryDataSnapshot = await getDocs(queryData);
      const result = queryDataSnapshot.docs.map((doc) => doc.data());
      setData(result);
    };
  
  React.useEffect(() => {
    fetchData();
  }, []);
  return (
    <main className="w-auto h-screen mx-auto px-[5rem]">
      {data.map((item, index) => {
        return (
          <QuerieBox
            key={index}
            uid={item.id}
            isDone={item.done}
            name={item.name}
            email={item.email}
            phoneNo={item.phone}
            address={item.address}
            product={item.product}
          />
        );
      })}
    </main>
  );
}

const QuerieBox = ({uid, name, email, phoneNo, address, isDone ,product}) => {
  const [setMsg , setSetMsg] = React.useState('');
  const handleDone = async () => {
    const doneRef = doc(fs, "queries", uid);
    await updateDoc(doneRef, {
      done: !isDone,
    });
    setSetMsg('This will update soon...');
    setTimeout(() => {
      setSetMsg('');
    }, 2000);
  };
  const handleDelete = async () => {
    const deleteRef = doc(fs, "queries", uid);
    await deleteDoc(deleteRef);
    setSetMsg('This will delete soon...');
    setTimeout(() => {
      setSetMsg('');
    }, 5000);
  };
  return (
    <div
      className={`text-black relative overflow-auto my-4 ${
        isDone
          ? `bg-green-400 [box-shadow:_rgba(99,99,99,0.2)_0px_2px_8px_0px]`
          : `bg-gray-300 [box-shadow:_rgba(99,99,99,0.2)_0px_2px_8px_0px]`
      } rounded-md`}
    >
      <div className="md:flex  justify-around items-center py-5 px-3 rounded-lg">
        
        <h1 className=" text-black font-medium text-2xl">{product}</h1>
        <div className="flex flex-col">
          <h1 className="text-gray-500 text-2xl font-medium">Customer Details:</h1>
          <h1 className="text-black ">{name}</h1>
          <h1 className="text-black">{email}</h1>
          <h1 className="text-black">{phoneNo}</h1>
          <h1 className="text-black">{address}</h1>
        </div>
        <div className="flex flex-col gap-5">
          <button
            onClick={handleDone}
            className="bg-green-700 text-white px-4 py-2 rounded-md"
          >
            {!isDone ? `Done` : `Undo`}
          </button>
          <button
            onClick={handleDelete}
          className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-700">
            Delete
          </button>
          <div className='text-black text-center'>{setMsg}</div>
        </div>
      </div>
    </div>
  );
};

export default Queries;
