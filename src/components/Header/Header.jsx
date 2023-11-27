import React, { useState } from "react";
import rwlogo from "../../assets/rwlogo.png";
import { BiSearch } from "react-icons/bi";
import { AiOutlineLogout, AiOutlineHeart } from "react-icons/ai";
import { FiLogIn } from "react-icons/fi";
import { Link, NavLink, Navigate } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
function Header({ userName, isshow, setshow }) {
  const handleLogout = () => {
    const auth = getAuth();
    auth.signOut().then(() => {
      setshow(false);
      window.location.assign("/");
    });
  };
  return (
    <div className="relative px-2 flex justify-between items-center w-full h-18 bg-slate-500">
      <NavLink to="/">
        <img
          src={rwlogo}
          className=" w-34 h-24 cursor-pointer hover:scale-110 hover:underline hover:transition-all"
        />
      </NavLink>
      <div className="md:flex  hidden justify-evenly gap-12 mb-6 text-xl ">
        <NavLink
          to="/mens"
          className="mt-9 font-semibold hover:scale-110 hover:underline hover:transition-all cursor-pointer"
        >
          Mens
        </NavLink>
        <NavLink
          to="/womens"
          className="mt-9 font-semibold hover:scale-110 hover:underline hover:transition-all cursor-pointer"
        >
          Womens
        </NavLink>
        <NavLink
          to="/accessories"
          className="mt-9 font-semibold hover:scale-110 hover:underline hover:transition-all cursor-pointer"
        >
          Accessories
        </NavLink>
        <NavLink
          to="/about"
          className="mt-9 font-semibold hover:scale-110 hover:underline hover:transition-all cursor-pointer"
        >
          About
        </NavLink>
      </div>
      <div className="flex justify-evenly mx-4 my-4 gap-6">
        {/* <NavLink><BiSearch className=' text-white w-10 h-10 cursor-pointer hover:scale-110 hover:transition-all'/></NavLink>
            <NavLink><AiOutlineHeart className=' text-white w-10 h-10 cursor-pointer hover:scale-110 hover:transition-all'/></NavLink> */}
        {userName && (
          <div className="flex justify-evenly mx-4 my-4 gap-6 items-center">
            {isshow && (
              <NavLink to="/queries">
                <button className="bg-green-500 font-medium text-white w-34 p-2 rounded-md">
                  Customer queries
                </button>
              </NavLink>
            )}
            {isshow && (
              <NavLink to="/addproduct">
                <button className="bg-green-500 font-medium text-white w-34 p-2 rounded-md">
                  Add Product
                </button>
              </NavLink>
            )}
            <div className=" text-2xl font-mono">{userName}</div>
            <button onClick={handleLogout}>
              <AiOutlineLogout className=" text-white w-10 h-10 cursor-pointer hover:scale-110 hover:transition-all" />
            </button>
          </div>
        )}

        {!userName && (
          <NavLink to={"/signup"}>
            <FiLogIn className=" text-white w-10 h-10 cursor-pointer hover:scale-110 hover:transition-all" />
          </NavLink>
        )}
      </div>

      {/* mobild navbar */}
      <div className="absolute md:hidden -bottom-[5.5rem] left-0 bg-slate-500 w-screen flex justify-between px-[5rem]">
      <NavLink
          to="/mens"
          className="mt-9 py-5 font-semibold hover:scale-110 hover:underline hover:transition-all cursor-pointer"
        >
          Mens
        </NavLink>
        <NavLink
          to="/womens"
          className="mt-9 py-5 font-semibold hover:scale-110 hover:underline hover:transition-all cursor-pointer"
        >
          Womens
        </NavLink>
        <NavLink
          to="/accessories"
          className="mt-9 py-5 font-semibold hover:scale-110 hover:underline hover:transition-all cursor-pointer"
        >
          Accessories
        </NavLink>
        <NavLink
          to="/about"
          className="mt-9 py-5 font-semibold hover:scale-110 hover:underline hover:transition-all cursor-pointer"
        >
          About
        </NavLink>

      </div>
    </div>
  );
}

export default Header;
