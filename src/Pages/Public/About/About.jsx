import React, { useEffect, useState, useRef } from "react";
import "./AboutEnhanced.css";
import muzaf from "../../../assets/muz_map.png";
import iceProductionImg from "../../../assets/IceFactory.png"; // Import an image of your ice production
import founderImg from "../../../assets/mfpLogo.png"; // Import a founder image if available
import ContactUs from "../ContactUs/ContactUs.jsx";

export default function About() {
  // Existing data arrays
  const funFacts = [
    "Our factory uses energy-efficient cooling systems that reduce energy consumption by 20% compared to traditional methods.",
    "Every batch of ice undergoes a 5-step quality check to ensure purity and safety.",
    "We recycle 100% of the water used in our production process, minimizing waste.",
    "Our ice cubes are designed to melt 30% slower than standard ice, keeping your drinks cooler for longer.",
    "The factory produces over 10 tons of ice daily, enough to fill a small swimming pool!",
    "We use purified water sourced locally, supporting Muzaffarpur's water sustainability efforts.",
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
    "The clearest, longest-lasting ice we've ever used. Our customers noticed the difference!",
    "Always on time and always professional. Can't imagine our business without them.",
    "Top-notch quality and great service — the ice blocks are perfectly shaped and long-lasting.",
    "Muzaffarpur Ice Factory never fails to impress. Their attention to hygiene is outstanding.",
    "They've been our supplier for 3 years now — not a single late delivery!",
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
    "We've been a loyal client for 3 years now. Delivery is always on time. — Anjali Enterprises",
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

  // State management
  const [currentFact, setCurrentFact] = useState(0);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  
  // Refs for scroll animations
  const sectionRefs = {
    mission: useRef(null),
    history: useRef(null),
    infrastructure: useRef(null),
    services: useRef(null),
    factTestimonial: useRef(null)
  };

  // Set page as loaded after initial render
  useEffect(() => {
    setIsLoaded(true);
  }, []);

  // Rotate facts and testimonials
  useEffect(() => {
    const factInterval = setInterval(() => {
      setCurrentFact((prev) => (prev + 1) % funFacts.length);
    }, 4000);

    const testimonialInterval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => {
      clearInterval(factInterval);
      clearInterval(testimonialInterval);
    };
  }, [funFacts.length, testimonials.length]);

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observerOptions = {
      threshold: 0.2,
      rootMargin: "0px 0px -100px 0px"
    };

    const observerCallback = (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    
    // Observe all section refs
    Object.values(sectionRefs).forEach(ref => {
      if (ref.current) {
        observer.observe(ref.current);
      }
    });

    // Observe all elements with animate-on-scroll class
    document.querySelectorAll('.animate-on-scroll').forEach(el => {
      observer.observe(el);
    });

    return () => {
      Object.values(sectionRefs).forEach(ref => {
        if (ref.current) {
          observer.unobserve(ref.current);
        }
      });
      document.querySelectorAll('.animate-on-scroll').forEach(el => {
        observer.unobserve(el);
      });
    };
  }, [isLoaded]);

  // Create ice particle elements for the background effect
  const renderIceParticles = () => {
    const particles = [];
    for (let i = 0; i < 20; i++) {
      particles.push(
        <div 
          key={`particle-${i}`} 
          className="ice-particle" 
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${10 + Math.random() * 20}s`,
            width: `${4 + Math.random() * 8}px`,
            height: `${4 + Math.random() * 8}px`,
            opacity: 0.1 + Math.random() * 0.5
          }}
        />
      );
    }
    return particles;
  };

  return (
    <div className="about-page-enhanced">
      <div className="ice-particles-container">
        {renderIceParticles()}
      </div>
      
      <div className="about-hero">
        <div className="hero-content">
          <h1 className="about-title">WE'RE ALL ABOUT ICE</h1>
          <div className="title-underline"></div>
          <p className="about-subtitle">Your trusted source for quality ice in Muzaffarpur since 2020.</p>
          <div className="hero-cta">
            <a href="#contact" className="cta-button">Get in Touch</a>
            <a href="/orders" className="cta-button secondary">Order Now</a>
          </div>
        </div>
        <div className="hero-background"></div>
      </div>

      <div className="about-content-wrapper">
        <section ref={sectionRefs.mission} className="about-section mission-section animate-on-scroll">
          <div className="section-header">
            <h2>Our Mission & Vision</h2>
            <div className="section-underline"></div>
          </div>
          
          <div className="mission-content">
            <div className="mission-text">
              <p className="mission-paragraph">
                At Muzaffarpur Ice Factory, our mission is to deliver top-quality ice while promoting
                sustainability and uplifting the local economy. We envision becoming the most trusted
                ice manufacturer in the region, defined by innovation, hygiene, and customer satisfaction.
              </p>
              
              <div className="mission-values">
                <div className="value-item">
                  <div className="value-icon">
                    <i className="fas fa-medal"></i>
                  </div>
                  <div className="value-content">
                    <h3>Quality</h3>
                    <p>Uncompromising standards in every ice block we produce</p>
                  </div>
                </div>
                
                <div className="value-item">
                  <div className="value-icon">
                    <i className="fas fa-leaf"></i>
                  </div>
                  <div className="value-content">
                    <h3>Sustainability</h3>
                    <p>Eco-friendly practices in our production and distribution</p>
                  </div>
                </div>
                
                <div className="value-item">
                  <div className="value-icon">
                    <i className="fas fa-handshake"></i>
                  </div>
                  <div className="value-content">
                    <h3>Community</h3>
                    <p>Supporting local growth and economic development</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="founder-message">
              <div className="founder-image-container">
                <img src={founderImg} alt="Aman Prasad Yadav - Founder" className="founder-image" />
              </div>
              <div className="founder-content">
                <h3 className="founder-title">A Message from the Founder</h3>
                <div className="message-text">
                  <p>
                    When I laid the foundation of Muzaffarpur Ice Factory in 2022, it was more than just a business
                    venture — it was a tribute to my hometown. Though my academic journey took me to Calcutta University,
                    my heart always remained in Muzaffarpur.
                  </p>
                  <p>
                    Ice may seem simple, but it preserves, protects, and empowers. Our promise is that every block
                    of ice we produce carries the spirit of Muzaffarpur: purity, resilience, and trust.
                  </p>
                  <p className="founder-signature">
                    <strong>— Aman Prasad Yadav</strong><br />
                    <span>Founder, Muzaffarpur Ice Factory</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section ref={sectionRefs.history} className="about-section history-section animate-on-scroll">
          <div className="section-header">
            <h2>Our History</h2>
            <div className="section-underline"></div>
          </div>
          
          <div className="history-content">
            <div className="history-timeline">
              <div className="timeline-item">
                <div className="timeline-marker"></div>
                <div className="timeline-content">
                  <h3>2020</h3>
                  <p>Established Muzaffarpur Ice Factory with initial production capacity of 500 blocks per day</p>
                </div>
              </div>
              
              <div className="timeline-item">
                <div className="timeline-marker"></div>
                <div className="timeline-content">
                  <h3>2021</h3>
                  <p>Expanded our delivery network to cover all of Muzaffarpur and surrounding areas</p>
                </div>
              </div>
              
              <div className="timeline-item">
                <div className="timeline-marker"></div>
                <div className="timeline-content">
                  <h3>2022</h3>
                  <p>Upgraded machinery and doubled production capacity to meet growing demand</p>
                </div>
              </div>
              
              <div className="timeline-item">
                <div className="timeline-marker"></div>
                <div className="timeline-content">
                  <h3>2023</h3>
                  <p>Introduced eco-friendly practices, reducing water waste by 85%</p>
                </div>
              </div>
              
              <div className="timeline-item">
                <div className="timeline-marker"></div>
                <div className="timeline-content">
                  <h3>Today</h3>
                  <p>Operating at full capacity with 1200 blocks daily, serving hundreds of businesses across Bihar</p>
                </div>
              </div>
            </div>
            
            <div className="history-text">
              <p>
                Muzaffarpur Ice Factory was established with the goal of delivering reliable and high-quality ice 
                to the residents and businesses of Muzaffarpur. Over the years, we have expanded our capacity and
                adopted state-of-the-art technology to meet the growing demand.
              </p>
              <p>
                From humble beginnings to becoming the region's premier ice supplier, our journey has been defined 
                by a commitment to excellence and community service. We continue to innovate and improve while staying 
                true to our core values.
              </p>
            </div>
          </div>
        </section>

        <section ref={sectionRefs.infrastructure} className="about-section infrastructure-section animate-on-scroll">
          <div className="section-header">
            <h2>Factory Infrastructure</h2>
            <div className="section-underline"></div>
          </div>
          
          <div className="infrastructure-content">
            <div className="infrastructure-image">
              <img src={iceProductionImg} alt="Ice Factory Production Line" className="production-image" />
              <div className="image-overlay">
                <div className="overlay-text">State-of-the-art Facility</div>
              </div>
            </div>
            
            <div className="infrastructure-details">
              <p>
                Our factory is equipped with modern machinery and cooling systems, ensuring the highest quality 
                of ice products. With a daily production capacity of 1200 blocks, we cater to both residential 
                and commercial clients.
              </p>
              
              <div className="infrastructure-stats">
                <div className="stat-item">
                  <div className="stat-number">1200</div>
                  <div className="stat-label">Ice Blocks Daily</div>
                </div>
                
                <div className="stat-item">
                  <div className="stat-number">5</div>
                  <div className="stat-label">Quality Checks</div>
                </div>
                
                <div className="stat-item">
                  <div className="stat-number">3</div>
                  <div className="stat-label">Delivery Trucks</div>
                </div>
                
                <div className="stat-item">
                  <div className="stat-number">24/7</div>
                  <div className="stat-label">Operation</div>
                </div>
              </div>
              
              <div className="infrastructure-features">
                <div className="feature-item">
                  <i className="fas fa-temperature-low"></i>
                  <span>Advanced Cooling Systems</span>
                </div>
                
                <div className="feature-item">
                  <i className="fas fa-tint-slash"></i>
                  <span>Water Purification Plants</span>
                </div>
                
                <div className="feature-item">
                  <i className="fas fa-solar-panel"></i>
                  <span>Energy Efficient Design</span>
                </div>
                
                <div className="feature-item">
                  <i className="fas fa-warehouse"></i>
                  <span>Cold Storage Facilities</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section ref={sectionRefs.services} className="about-section services-section animate-on-scroll">
          <div className="section-header">
            <h2>Visit Us or Request a Service</h2>
            <div className="section-underline"></div>
          </div>
          
          <div className="services-content">
            <div className="services-info">
              <p>
                Our Muzaffarpur Ice Factory offers bulk and retail ice delivery, cold storage options,
                and event-based ice logistics. Reach out or drop by to learn more about our offerings.
              </p>
              
              <div className="services-list">
                <div className="service-item">
                  <div className="service-icon">
                    <i className="fas fa-cube"></i>
                  </div>
                  <div className="service-text">Packaged and Crushed Ice Supply</div>
                </div>
                
                <div className="service-item">
                  <div className="service-icon">
                    <i className="fas fa-glass-cheers"></i>
                  </div>
                  <div className="service-text">Event Ice Delivery Services</div>
                </div>
                
                <div className="service-item">
                  <div className="service-icon">
                    <i className="fas fa-truck-loading"></i>
                  </div>
                  <div className="service-text">Emergency & On-Demand Ice Logistics</div>
                </div>
                
                <div className="service-item">
                  <div className="service-icon">
                    <i className="fas fa-warehouse"></i>
                  </div>
                  <div className="service-text">Cold Storage Facilities</div>
                </div>
              </div>
            </div>
            
            <div className="location-map-container">
              <div className="map-container">
                <img
                  src={muzaf}
                  alt="Muzaffarpur Ice Factory Location"
                  className="map-image"
                />
                <div className="map-pulse"></div>
              </div>
              
              <a 
                href="https://www.google.com/maps/place/Muzaffarpur+Ice+Factory/@26.0458645,85.3442833,788m/data=!3m1!1e3!4m6!3m5!1s0x39ed1566059cc59f:0xb5b9b6ce25ab2322!8m2!3d26.0458652!4d85.3464713!16s%2Fg%2F11x6l52sjs?entry=ttu"
                target="_blank"
                rel="noopener noreferrer"
                className="view-map-button"
              >
                <i className="fas fa-map-marked-alt"></i>
                <span>View on Google Maps</span>
              </a>
            </div>
          </div>
        </section>

        <section ref={sectionRefs.factTestimonial} className="about-extras-section animate-on-scroll">
          <div className="facts-testimonials-container">
            <div className="about-fun-fact">
              <div className="fact-icon">
                <i className="fas fa-snowflake"></i>
              </div>
              <h3>Ice Factory Fun Facts</h3>
              <div className="fact-text-container">
                <p className="fun-fact-text">{funFacts[currentFact]}</p>
                <div className="fact-indicator">
                  {funFacts.map((_, index) => (
                    <span 
                      key={index} 
                      className={`indicator-dot ${index === currentFact ? 'active' : ''}`}
                      onClick={() => setCurrentFact(index)}
                    ></span>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="about-testimonial">
              <div className="testimonial-icon">
                <i className="fas fa-quote-right"></i>
              </div>
              <h3>What Our Clients Say</h3>
              <div className="testimonial-container">
                <p className="testimonial-text">"{testimonials[currentTestimonial]}"</p>
                <div className="testimonial-indicator">
                  {testimonials.map((_, index) => (
                    <span 
                      key={index} 
                      className={`indicator-dot ${index === currentTestimonial ? 'active' : ''}`}
                      onClick={() => setCurrentTestimonial(index)}
                    ></span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
        
        <section id="contact" className="contact-section animate-on-scroll">
          <ContactUs />
        </section>
      </div>
    </div>
  );
}
