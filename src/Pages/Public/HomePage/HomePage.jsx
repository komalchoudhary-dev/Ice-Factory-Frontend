import React from 'react';
import { h1 } from 'framer-motion/client';


import Login from './Login.jsx';
import History from './History.jsx';
import Navbar from '../../../Components/Navbar/Navbar.jsx';
import Orders from './Orders.jsx';
import Home from './Home.jsx';
import Contact from './Contact.jsx';

export default function Frame_1() {
  return (
   <><Home /><Orders /><History /><Login /><Contact /></>
     );
}

