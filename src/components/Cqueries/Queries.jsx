import React from "react";
import { fs } from "../../config/config";
import { doc,deleteDoc, getDocs, collection, updateDoc, where } from "firebase/firestore";
import { query } from "firebase/database";

function Queries() {
  const [data, setData] = React.useState([]);
  React.useEffect(() => {
    const fetchData = async () => {

      let queryData = collection(fs, "queries");
      let queryDataSnapshot = await getDocs(queryData);
      const result = queryDataSnapshot.docs.map((doc) => doc.data());
      setData(result);
    };
    fetchData();
  }, []);
  return (
    <main className="w-[90vw] h-screen mx-auto px-[5rem]">
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
          />
        );
      })}
    </main>
  );
}

const QuerieBox = ({uid, name, email, phoneNo, address, isDone }) => {

  const handleDone = async () => {
    const doneRef = doc(fs, "queries", uid);
    await updateDoc(doneRef, {
      done: !isDone,
    });
    window.location.reload();
  };
  const handleDelete = async () => {
    const deleteRef = doc(fs, "queries", uid);
    await deleteDoc(deleteRef);
    window.location.reload();
  }
  
  return (
    <div
      className={`text-black relative my-4 ${
        isDone
          ? `bg-green-400 [box-shadow:_rgba(99,99,99,0.2)_0px_2px_8px_0px]`
          : `bg-gray-300 [box-shadow:_rgba(99,99,99,0.2)_0px_2px_8px_0px]`
      }`}
    >
      <div className="flex justify-around items-center py-10">
        <h1 className="text-black font-bold text-3xl">{name}</h1>
        <h1 className="text-black ">{email}</h1>
        <h1 className="text-black">{phoneNo}</h1>
        <h1 className="text-black">{address}</h1>
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
      </div>
    </div>
  );
};

export default Queries;
