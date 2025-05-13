 import React, { useEffect, useState } from "react";
import "./about.css";
import muzaf from "../../../assets/muz_map.png";

function Prakhar() {
    return (
        <div className="about-contact">
  <div className="contact-info">
    <h2>Contact Us</h2>
    <p>Muzaffarpur Ice Factory</p>
    <p>Sakari Saraiya, Via- Turki, Kudhani, Muzaffarpur, Bihar, 844127</p>
    <p>Phone: +91 7808485240</p>
    <p>Email: muzaffarpurice@gmail.com, contact@muzaffarpurice.com</p>
  </div>

  <div className="map-wrapper">
    <a
      href="https://www.google.com/maps/place/Muzaffarpur+Ice+Factory/@26.0458645,85.3442833,788m/data=!3m1!1e3!4m6!3m5!1s0x39ed1566059cc59f:0xb5b9b6ce25ab2322!8m2!3d26.0458652!4d85.3464713!16s%2Fg%2F11x6l52sjs?entry=ttu&g_ep=EgoyMDI1MDQwOS4wIKXMDSoASAFQAw%3D%3D"
      target="_blank"
      style={{ color: '#007bff', textDecoration: 'none' }}
    >
      View on Google Maps
    </a>
    <iframe
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2797.4812345674776!2d85.3442833!3d26.0458645!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39ed1566059cc59f:0xb5b9b6ce25ab2322!2sMuzaffarpur+Ice+Factory!5e0!3m2!1sen!2sin!4v1652166785689!5m2!1sen!2sin"
      width="100%"
      height="450"
      style={{ border: '0' }}
      allowFullScreen=""
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
    ></iframe>
  </div>
</div>
    
)
}
  
  export default Prakhar;
 