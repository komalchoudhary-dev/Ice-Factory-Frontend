import React from 'react';
import { h1 } from 'framer-motion/client';

import About from './About.jsx';
import Login from './Login.jsx';
import History from './History.jsx';
import Navbar from '../../../Components/Navbar/Navbar.jsx';
import Orders from './Orders.jsx';
import Home from './Home.jsx';
import Contact from './Contact.jsx';
import Footer from '../../../Components/Footer/Footer.jsx';

export default function Frame_1() {
  return (
   <><Home /><Orders /><History /><Login /><Contact /><Footer /></>
     );
}

