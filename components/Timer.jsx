import { useState, useEffect, useContext } from "react";
import React from "react";
import { DataContext } from "@/store/GlobalState";
import Cookie from 'js-cookie';

import ResultsTable from '../components/ResultsTable'
import { useRouter } from "next/router";

export default function Time() {
    const [time, setTime] = useState(new Date());
    const { state, dispatch } = useContext(DataContext)
    const { auth } = state

    
    useEffect(() => {
        const timer = setInterval(() => {
            setTime(new Date());
        }, 1000);
        return () => clearInterval(timer);
    }, []);


    const nextToDraw = new Date(
        time.getFullYear(),
        time.getMonth(),
        time.getDate(),
        time.getHours(),
        time.getMinutes() + 1,
        0,
        0
    );

    const timeDiff = Math.floor((nextToDraw - time) / 1000);
    const seconds = timeDiff % 60;
    const timeToDraw = `${seconds.toString().padStart(2, "0")}`;
    const nextToDrawtime = nextToDraw.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const [userName, setUserName] = useState(auth && auth.user && auth.user.userName ? auth.user.userName : "");


    useEffect(() => {
        if (auth && auth.user && auth.user.userName) {
            setUserName(auth.user.userName);
            console.log(auth.user, 'de na yaar')
        }
        console.log(userName, "this is my user bitch")
    }, [auth]);

    const router = useRouter();

    const handleLogout = () => {
      Cookie.remove('refreshtoken', { path: '/api/auth/refreshToken' })
      localStorage.removeItem('firstLogin')
      dispatch({ type: 'AUTH', payload: {} })
      router.push('/login')
    }
    return (
        <div className="lg:text-2xl    ">
        

        <img src="/closee.png"  onClick={handleLogout} className="-mt-[200px] cursor-pointer absolute z-30 h-40 ml-[100%]" />
        <img src="/acc.png" className="-mt-[90px] ml-[100%] absolute  z-30 h-12" />
        <h1 className="text-white ml-[105%] my-1  mr-auto font-bold -mt-[90px] absolute tracking-tighter text-[25px] uppercase z-30 h-32 ">{userName}</h1>
            <p className="text-[#FBEDB8]  shadow-[#FBEDB8] text-center -200 text-4xl ml-[108.5%] -mt-8  flex  items-center">
                    {timeToDraw}     
                </p>
          



        
        </div>
    );
}
