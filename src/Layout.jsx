import React from 'react'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import { Outlet } from 'react-router-dom'
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {fs} from '../src/config/config';
import { doc, getDoc} from "firebase/firestore";
function Layout() {
  const auth = getAuth();
  const [user, setUser] = React.useState('');
  const [show, setShow] = React.useState(false);
  React.useEffect(()=>{
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const uid = user.uid;
        if(uid===String(import.meta.env.VITE_APP_ADMIN_ID)){
          setShow(true);
        }
        const snap = await  getDoc(doc(fs, "users",uid));
        if (snap.exists()) {
              setUser(snap.data().name);
        } else {
            console.log("No such document!");
        }
      } else {
        setUser(null);
      }
      
      if(user === null && window.location.pathname==='/addproduct'){
        window.location.href='/notfound';
      }
    }
    );
    
  
  },[])
  return (
    <div className='relative'>
    <Header isshow={show} setshow={setShow} userName={user} />
    <Outlet/>
    {/* <Footer/> */}
    </div>
  )
}

export default Layout