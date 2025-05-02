import React, { useEffect, useState } from "react";
import "./about.css";
import muzaf from "../../../assets/Muzaffarpur.jpg";
export default function About() {
  const funFacts = [
    "Our factory uses energy-efficient cooling systems that reduce energy consumption by 20% compared to traditional methods.",
    "Every batch of ice undergoes a 5-step quality check to ensure purity and safety.",
    "We recycle 100% of the water used in our production process, minimizing waste.",
    "Our ice cubes are designed to melt 30% slower than standard ice, keeping your drinks cooler for longer.",
    "The factory produces over 10 tons of ice daily, enough to fill a small swimming pool!",
    "We use purified water sourced locally, supporting Muzaffarpur’s water sustainability efforts.",
    "Our ice is crystal-clear thanks to a specialized freezing process that removes air bubbles.",
    "The factory operates 24/7 during peak summer seasons.",
    "We offer both industrial-grade and food-grade ice solutions.",
    "Client satisfaction rate is above 98% for the last 3 years!",
    "Our custom-sized ice blocks are available upon request.",
    "Certified under strict hygiene and safety guidelines.",
    "Partnered with over 150 businesses across North Bihar.",
    "Our team prioritizes timely delivery, even during demand spikes.",
    "All water used is tested daily in our in-house lab.",
    "The longest delivery we ever made was 350 km away!"
  ];

  const testimonials = [
    "Muzaffarpur Ice Factory delivers perfect quality every time! Highly reliable service.",
    "The clearest, longest-lasting ice we’ve ever used. Our customers noticed the difference!",
    "Always on time and always professional. Can’t imagine our business without them.",
    "Top-notch quality and great service — the ice blocks are perfectly shaped and long-lasting.",
    "Muzaffarpur Ice Factory never fails to impress. Their attention to hygiene is outstanding.",
    "They’ve been our supplier for 3 years now — not a single late delivery!",
    "Exceptional quality ice, and their customer support is always helpful and friendly.",
    "The ice stays solid for hours even in outdoor events. Great product and value for money!",
    "Our go-to supplier for crystal-clear ice. Reliable even during peak summer seasons!",
    "Their eco-friendly process makes them our top choice. Love supporting a green business.",
    "Excellent service and ice quality. Highly recommended for both small and large orders.",
    "Very professional team — smooth ordering and fast delivery every single time.",
    "Consistent quality and reasonable pricing. Great for restaurants and caterers.",
    "The best ice supplier in Muzaffarpur, hands down. Pure, clear, and long-lasting!",
    "Great experience every time! They always meet the standards we expect as a client.",
    "Muzaffarpur Ice Factory's service is outstanding. The ice quality is crystal clear every time! — Rajesh Kumar",
    "We’ve been a loyal client for 3 years now. Delivery is always on time. — Anjali Enterprises",
    "Their ice melts slower and stays clean, perfect for our restaurant's standards! — Blue Ocean Café",
    "Amazing customer support, and the production capacity is impressive. — Shree Traders",
    "The team is always responsive and helpful, highly recommend! — Aryan Events",
    "Their focus on purity and hygiene is unmatched in the area. — ChillOut Lounge",
    "Very reliable factory, even during peak summers. — Gupta Caterers",
    "Excellent service, from order to delivery. — Frosty Delights",
    "High-quality ice and professional team. — PureCool Pvt Ltd.",
    "Always a pleasure doing business with them. — Fresh Farm Foods",
    "Never faced a delivery delay in two years. — IceHub Distributors",
    "Perfect consistency and quantity management. — Crystal Ice Bar",
    "Our trusted supplier for bulk orders! — Zenith Beverages",
    "Professional and transparent service! — Oasis Events",
    "Muzaffarpur Ice Factory sets the standard in Bihar! — Elite Catering Co."
  ];

  const [currentFact, setCurrentFact] = useState(0);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  useEffect(() => {
    const factInterval = setInterval(() => {
      setCurrentFact((prev) => (prev + 1) % funFacts.length);
    }, 3500); // switch fun fact every 3.5 seconds

    const testimonialInterval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 4000); // switch testimonial every 4 seconds

    return () => {
      clearInterval(factInterval);
      clearInterval(testimonialInterval);
    };
  }, [funFacts.length, testimonials.length]);

  return (
    <div className="about-page">
      <div className="about-header">
        <h1>WE'RE ALL ABOUT ICE</h1>
        <p>Your trusted source for quality ice in Muzaffarpur.</p>
      </div>

      
      <div className="about-section">
  <h2>Mission & Vision</h2>
  <p>
    At Muzaffarpur Ice Factory, our mission is to deliver top-quality ice while promoting
    sustainability and uplifting the local economy. We envision becoming the most trusted
    ice manufacturer in the region, defined by innovation, hygiene, and customer satisfaction.
  </p>
  <h3 className="founder-title">A Message from the Founder</h3>

  <p>
    When I laid the foundation of Muzaffarpur Ice Factory in 2022, it was more than just a business
    venture — it was a tribute to my hometown. Though my academic journey took me to Calcutta University,
    my heart always remained in Muzaffarpur. This factory is a symbol of giving back to the community
    that shaped me.
  </p>
  <p>
    Ice may seem simple, but it preserves, protects, and empowers. Our promise is that every block
    of ice we produce carries the spirit of Muzaffarpur: purity, resilience, and trust. Through challenges
    and growth, we’ve stayed rooted in our values of integrity and service, and we continue to embrace
    eco-friendly practices for a sustainable future.
  </p>
  <p>
    Thank you to everyone who’s supported this journey. We’re just getting started — and with your
    continued trust, we’ll keep building a colder, cleaner, and stronger future for our region.
  </p>
  <p><strong>— Aman Prasad Yadav, Founder<br />Muzaffarpur Ice Factory</strong></p>
</div>

      <div className="services-map-section">
  <div className="text-content">
    <h2>Visit Us or Request a Service</h2>
    <p>
      Our Muzaffarpur Ice Factory offers bulk and retail ice delivery, cold storage options,
      and event-based ice logistics. Reach out or drop by to learn more about our offerings.
    </p>
    <ul>
      <li>Packaged and Crushed Ice Supply</li>
      <li>Event Ice Delivery Services</li>
      <li>Emergency & On-Demand Ice Logistics</li>
      <li>Cold Storage Facilities</li>
    </ul>
  </div>

  <div className="map-container">
  <img
    src={muzaf}
    alt="Muzaffarpur Ice Factory Location"
    className="map-image"
  />
</div>

</div>

     

      <div className="about-section">
        <h2>History of Muzaffarpur Ice Factory</h2>
        <p>
          Muzaffarpur Ice Factory was established in 2020 with the goal of
          delivering reliable and high-quality ice to the residents and businesses
          of Muzaffarpur. Over the years, we have expanded our capacity and
          adopted state-of-the-art technology to meet the growing demand.
        </p>
      </div>

      <div className="about-section">
        <h2>Factory Infrastructure</h2>
        <p>
          Our factory is equipped with modern machinery and cooling systems,
          ensuring the highest quality of ice products. With a daily production
          capacity of 1200 blocks, we cater to both residential and commercial
          clients.
        </p>
      </div>


     <div className="about-contact">
  <div className="contact-info">
    <h2>Contact Us</h2>
    <p>Muzaffarpur Ice Factory</p>
    <p>Station Road, Muzaffarpur, Bihar</p>
    <p>Phone: +91-1234567890</p>
    <p>Email: contact@muzaffarpurice.com</p>
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





<div className="about-extras">
  {/* Fun Facts */}
  <div className="about-fun-fact">
    <h3>Fun Facts!</h3>
    <p className="fun-fact-text fade-in">{funFacts[currentFact]}</p>
  </div>

  {/* Testimonials */}
  <div className="about-testimonial">
    <h3>What Our Clients Say</h3>
    <p className="testimonial-text fade-in">"{testimonials[currentTestimonial]}"</p>
  </div>
</div>
</div>
  );
}
