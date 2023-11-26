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
    imageState.current.value=null;
    alert("Successfull");
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
    alert("Process Completed");
  };


  return (
    <>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto ">
        <label className="block mb-4">
          <span className="text-gray-700">Title:</span>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border border-gray-300 rounded-md p-2 mt-1 w-full  text-black"
            required
          />
        </label>
        <label className="block mb-4">
          <span className="text-gray-700">Description:</span>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border border-gray-300 rounded-md p-2 mt-1 w-full  text-black"
            required
          />
        </label>
        <label className="block mb-4">
          <span className="text-gray-700">Tag:</span>
          <input
            type="text"
            value={tag}
            onChange={(e) => setTag(e.target.value)}
            className="border border-gray-300 rounded-md p-2 mt-1 w-full  text-black"
            required
          />
        </label>
        <label className="block mb-4">
          <span className="text-gray-700">Price:</span>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="border border-gray-300 rounded-md p-2 mt-1 w-full  text-black"
            required
          />
        </label>

        <label className="block mb-4">
          <span className="text-gray-700">Images:</span>
          <input
            type="file"
            accept="image/*"
            ref={imageState}
            multiple
            onChange={handleImageChange}
            className="border border-gray-300 rounded-md p-2 mt-1 w-full  text-black"
            required
          />
        </label>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Add Product
        </button>
      </form>
    </>
  );
}

export default AddProduct;
