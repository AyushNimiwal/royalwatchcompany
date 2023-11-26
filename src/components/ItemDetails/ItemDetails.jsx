import React from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useParams } from "react-router-dom";
import { getDatabase, ref, onValue, remove, set } from "firebase/database";
import { getStorage, ref as storageRef, deleteObject } from "firebase/storage";
import { useNavigate } from "react-router-dom";
import { setDoc, doc } from "firebase/firestore";
import "react-responsive-carousel/lib/styles/carousel.min.css"; 
import { Carousel } from 'react-responsive-carousel';
import { fs } from "../../config/config";
import { nanoid } from "nanoid";
function ItemDetails() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [data, setData] = React.useState([]);
  const [array, setArray] = React.useState([]);
  const [img, setImg] = React.useState([]);
  const [name, setName] = React.useState("");
  const [address, setAddress] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [success, setsuccess] = React.useState("");
  const auth = getAuth();
  const [show, setShow] = React.useState(false);

  React.useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        if (uid === String(import.meta.env.VITE_APP_ADMIN_ID)) {
          setShow(true);
        }
      } else {
        setShow(false);
      }
    });
  }, []);
  

  const fetchData = () => {
    const db = getDatabase();
    const databaseRef = ref(db, "/");
    onValue(databaseRef, (snapshot) => {
      const res = snapshot.val();
      if (res) {
        setData(res);
        setArray(...array, Object.keys(res));
      }
    });
  };
  React.useEffect(() => {
    fetchData();
  }, []);
  React.useEffect(() => {
  array.map((item) =>
    item === id ? setImg(data[item].images) : null
  );},[array,data])
  const handleDelete = (e) => {
    const db = getDatabase();
    const storage = getStorage();
    array.map((item) =>
      item === id
        ? data[item].images.map((image) =>
            deleteObject(storageRef(storage, image))
              .then(() => {
                remove(ref(db, `/${id}`))
                  .then(() => {
                    navigate("/");
                    console.log("Successfully Deleted");
                  })
                  .catch((error) => {
                    console.log(error);
                  });
              })
              .catch((error) => {
                console.log(error);
              })
          )
        : null
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name && address && phone && email) {
      const uid=nanoid();
      console.log(uid);
      const docRef = setDoc(doc(fs, "queries",uid), {
        id:uid,
        name: name,
        email: email,
        address: address,
        phone: phone,
        done: false,
      });
      setsuccess('We will contact you soon!');
      setName("");
      setAddress("");
      setPhone("");
      setEmail("");
      setTimeout(() => {
        setsuccess("");
      }, 3000);
    }
  };

  return (
    <div className="w-full mt-[5rem] md:mt-0 h-full flex items-center justify-center bg-white p-5">
      <div className=" md:w-[1250px] w-screen h-[850px] bg-slate-600 md:flex justify-center items-center">
        <div className="w-full md:w-1/2 h-full bg-white/30 p-4 backdrop-blur-md object-cover">
          
          <Carousel
            axis='horizontal'
            autoPlay
            infiniteLoop
            showThumbs
            showArrows={false}
            showStatus={false}
            className='w-full h-[700px]'
          >
            {
              img.length>0 && img.map((image) => (
                  <div className="block m-auto h-[700px] w-full object-cover">
                    <img
                      className=" w-full h-full rounded-md"
                      src={image}
                    />
                  </div>
                ))
            }
            </Carousel>
        </div>
        {array.map((item) =>
          item === id ? (
            <div key={id} className="w-full md:w-1/2 h-full p-5 bg-zinc-800">
              <div className=" text-4xl font-serif mb-5">
                {data[item].title}
              </div>
              <div className=" text-lg mb-5">{data[item].description}</div>
              <div className=" font-bold text-4xl mb-5">
                ₹ {data[item].price}
              </div>
              <div className=" text-yellow-300 font-mono text-2xl py-2 px-8 text-center rounded-full">
                FILL THE DETAILS TO BUY:{" "}
              </div>
              <form className="flex flex-col gap-4 mt-5">
                <input
                  className=" border border-gray-300 rounded-md p-2 mt-1 w-full  text-black"
                  type="text"
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
                <input
                  className=" border border-gray-300 rounded-md p-2 mt-1 w-full  text-black"
                  type="text"
                  placeholder="Address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  required
                />
                <input
                  className=" border border-gray-300 rounded-md p-2 mt-1 w-full  text-black"
                  type="text"
                  placeholder="Phone Number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
                <input
                  className=" border border-gray-300 rounded-md p-2 mt-1 w-full  text-black"
                  type="text"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <button
                  onClick={handleSubmit}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  Submit
                </button>
                <div className="text-green-500 font-bold">{success}</div>
              </form>
              {show&&
              <button
                onClick={handleDelete}
                className="cards__btn bg-red-500 hover:bg-red-700 my-8 mx-1 text-white text-center py-2 px-4 rounded"
              >
                DELETE ITEM
              </button>}
            </div>
          ) : (
            <></>
          )
        )}
      </div>
    </div>
  );
}

export default ItemDetails;
