import React from 'react';
import { motion } from 'framer-motion';

import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { app } from '../firebase.config';
import Logo from '../img/logo.png';
import Avatar from '../img/avatar.png';
import { MdShoppingCart } from "react-icons/md";
import { Link } from 'react-router-dom';
import { useStateValue } from '../context/StateProvider';
import { actionType } from '../context/reducer';
const Header = () => {
    const firebaseAuth = getAuth(app);
    const provider = new GoogleAuthProvider();
    const [{user}, dispatch] = useStateValue()
    const login = async() =>{
const {user: {refreshToken, providerData}} = await signInWithPopup(firebaseAuth,provider)
        dispatch({
            type: actionType.SET_USER,
            user: providerData[0],
        });
localStorage.setItem('user', JSON.stringify(providerData[0]))
    };
  return (
    <header className="fixed z-50 w-screen p-6 px-16">
       {/* Desktop and Tablet */}
        <div className='hidden md:flex w-full h-full items-center justify-between' >
            <Link to={'/'} className='flex items-center gap-2'>
                <img src={Logo} className="w-8 object-cover" alt="logo" />
                <p className='text-headingColor text-xl font-bold'> City</p>
            </Link>
            <div className='flex items-center'>
            <ul className='flex items-center gap-8'>
                <li className='text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer'>Home</li>
                <li className='text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer'>Menu</li>
                <li className='text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer'>About Us</li>
                <li className='text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer'>Services</li>
            </ul>
            <div className='relative flex items-center justify-center'>
                <MdShoppingCart className='text-textColor text-2xl ml-8 cursor-pointer' />
                <div className='absolute -top-2 -right-2 w-5 h-5 rounded-full bg-cartNumBg flex items-center justify-center'>
                    <p className='text-xs text-white font-semibold'>2</p>
                </div>
            </div>
            {/* user profile default logo and animation */}
            
            <div className='relative'>
            <motion.img whileTap={{scale:0.6}}
             src={user? user.photoURL : Avatar} 
            className="w-10 min-w-[40] h-10 min-h-[40] drop-shadow-xl ml-4 cursor-pointer rounded-full" alt="userprofile"
            onClick={login}
            />
            </div>
   
            </div>
        </div>

        {/* Mobile */}
        <div className='flex md:hidden w-full h-full' ></div>
    </header>
  )
}

export default Header;