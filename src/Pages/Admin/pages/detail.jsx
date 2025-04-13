import Sidebar from '../components/Sidebar'; // ✅ fix path
import Navbar from '../components/Navbar'; // ✅ fix path
import React from 'react';
import {useState,useEffect} from 'react';
import axios from 'axios';

function Detail() {
    return(<div className="flex flex-col">
        <Navbar/>
        <div className ='flex'>
            <Sidebar/>
        <h2 className="text-black font-semibold text-2xl">Prakhar Srivastav</h2>
        </div>
    </div>)
}

export default Detail;