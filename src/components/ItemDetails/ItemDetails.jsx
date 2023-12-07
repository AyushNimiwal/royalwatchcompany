import React from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useParams } from "react-router-dom";
import { getDatabase, ref, onValue, remove, set } from "firebase/database";
import { getStorage, ref as storageRef, deleteObject } from "firebase/storage";
import { useNavigate } from "react-router-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css"; 
import { Carousel } from 'react-responsive-carousel';
import ReactWhatsapp from 'react-whatsapp';
import { SocialIcon } from 'react-social-icons'
function ItemDetails() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [data, setData] = React.useState([]);
  const [array, setArray] = React.useState([]);
  const [img, setImg] = React.useState([]);
  const auth = getAuth();
  const [show, setShow] = React.useState(false);
  const wpIcon=<SocialIcon network='whatsapp' url='https://www.whatsapp.com/'/>

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


  return (
    
    <div className="w-full mt-[5rem] md:mt-5 h-full flex items-center justify-center bg-white/25 p-5">
      <div className=" md:w-[850px] w-screen md:h-[550px] h-full bg-white/30 md:flex justify-center  items-center">
        <div className="w-full md:w-1/2 md:mb-0 mb-28 h-full bg-white/30 p-2 md:p-4 backdrop-blur-md object-cover">
          
          <Carousel
            axis='horizontal'
            autoPlay
            infiniteLoop
            showThumbs
            showArrows={false}
            showStatus={false}
            className='w-full md:h-[400px] h-[350px]'
          >
            {
              img.length>0 && img.map((image) => (
                  <div className="block m-auto md:h-[400px] h-[350px] w-full object-cover">
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
            <div key={id} className="w-full md:w-1/2 h-full md:p-5 px-2 py-5 bg-zinc-800 rounded-md">
              <div className=" text-4xl font-serif mb-5">
                {data[item].title}
              </div>
              <div className=" text-lg mb-5">{data[item].description}</div>
              <div className=" font-bold text-4xl mb-5">
                ₹ {data[item].price}
              </div>
              <div className=" border-green-400 border-2 px-4 py-2 w-fit text-2xl hover:border-white hover:text-green-400 hover:transition-colors rounded-lg"><ReactWhatsapp number="+91 9694967497" message={`Product Name: ${data[item].title}. I have shown my interest in this product. Provide me more details.`}>{wpIcon} For Inquiry</ReactWhatsapp></div>
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
