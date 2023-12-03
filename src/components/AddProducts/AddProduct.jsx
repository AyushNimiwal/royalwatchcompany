import React, { useState, useRef } from "react";
import { storage, db } from "../../config/config";
import { set as DatabaseSet, ref as DatabaseRef } from "firebase/database";
import { nanoid } from "nanoid";
import {
  ref as StorageRef,
  getDownloadURL,
  uploadBytesResumable,
} from "firebase/storage";

function AddProduct() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tag, setTag] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState([]);
  const [uuid, setUUID] = useState("");
  const [msg, setMsg] = useState("");
  const imageState=useRef(null);
  const handleSubmit = (e) => {
      let images =[];
      image.map((img) => {
          if(!images.includes(img) && img!=null){
              images.push(img);
          }
      });
      console.log(images);
      e.preventDefault();
      DatabaseSet(DatabaseRef(db, `/${uuid}`), {
        title,
        description,
        tag,
        price,
        images,
      });
      setImage([null]);
      setTitle("");
      setDescription("");
      setTag("");
      setPrice("");
      setMsg("");
      imageState.current.value=null;
  };
  
  const handleImageChange = async (e) => {
    setUUID(nanoid());
    const files = e.target.files;
    for(let i=0;i<files.length;i++){
      const storageRef = StorageRef(storage, `product-images/${files[i].name}`);
      const uploadTask = uploadBytesResumable(storageRef, files[i]);
      uploadTask.on(
        "state_changed",
        () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setImage((oldArray) => [...oldArray, downloadURL]);
          });
        }
      );
    }
    setMsg("Please wait...");
      setTimeout(() => {
        setMsg("");
      }, 5000);
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="max-w-md md:mx-auto mt-16 mx-2  ">
        <label className="block mb-4">
          <span className="text-gray-700">Title:<br/></span>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border border-gray-300 rounded-md p-2 mt-1 md:w-full w-96   text-black"
            required
          />
        </label>
        <label className="block mb-4">
          <span className="text-gray-700">Description:<br/></span>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border border-gray-300 rounded-md p-2 mt-1 md:w-full w-96   text-black"
            required
          />
        </label>
        <label className="block mb-4">
          <span className="text-gray-700">Tag:<br/></span>
          <input
            type="text"
            value={tag}
            onChange={(e) => setTag(e.target.value)}
            className="border border-gray-300 rounded-md p-2 mt-1 md:w-full w-96   text-black"
            required
          />
        </label>
        <label className="block mb-4">
          <span className="text-gray-700">Price:<br/></span>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="border border-gray-300 rounded-md p-2 mt-1 md:w-full w-96   text-black"
            required
          />
        </label>

        <label className="block mb-4">
          <span className="text-gray-700">Images:<br/></span>
          <input
            type="file"
            accept="image/*"
            ref={imageState}
            multiple
            onChange={handleImageChange}
            className="border border-gray-300 rounded-md p-2 mt-1 md:w-full w-96   text-black"
            required
          />
        </label>
        <p className="text-red-500">{msg}</p>
        <button
          type="submit"
          disabled={image.length>0?false:true}
          className="bg-blue-500 hover:bg-blue-700text-white font-bold py-2 px-4 rounded"
        >
          Add Product
        </button>
      </form>
    </>
  );
}

export default AddProduct;
