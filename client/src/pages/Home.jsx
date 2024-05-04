import React from "react";
import Analytics from "../components/Analytics";

function Home() {
  return (
    <>
      <section className="section-hero">
        <div className="container grid grid-two-cols">
          <div className="hero-content">
            <p> We are the World best IT company</p>
            <h1>Welcome Here</h1>
            <p>
              Are you redy to take your business to the next level with
              cutting-edge IT solutions? Look no further! At Pranav Tech, we
              specialize in in providing innovation IT service and solutions
              tailored to meet your unique needs.
            </p>
            <div className="btn btn-group">
              <a href="/contact">
                <button className="btn">Connect now</button>
              </a>
              <a href="/services">
                <button className="btn secondary-btn">Learn More</button>
              </a>
            </div>
          </div>
          {/* hero image  */}
          <div className="hero-image">
            <img src="bat.png" alt="" />
          </div>
        </div>
      </section>
      {/* 2nd section */}
     <Analytics/>

      {/* 3 rd sectoin  */}
      <section className="section-hero">
        <div className="container grid grid-two-cols">
           {/* hero image  */}
           <div className="hero-image">
            <img src="bat.png" alt="" />
          </div>
          <div className="hero-content">
            <p> We are here to help you</p>
            <h1> Get Started Today </h1>
            <p>
             Ready to take the first step towards a more efficient and secure It infrastrucutre ? Contact us today for a free consultation and let's discuss how we can help your business thrive in the digital age.
            </p>
            <div className="btn btn-group">
              <a href="/contact">
                <button className="btn">Connect now</button>
              </a>
              <a href="/services">
                <button className="btn secondary-btn">Learn More</button>
              </a>
            </div>
          </div>
         
        </div>
      </section>
    </>
  );
}

export default Home;
