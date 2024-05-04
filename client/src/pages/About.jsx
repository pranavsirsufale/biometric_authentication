import React from "react";
import Analytics from "../components/Analytics";
import { useAuth } from "../store/Auth";

function About() {
  const { user } = useAuth();

  return (
    <>
      <section className="section-hero">
        <div className="container grid grid-two-cols">
          <div className="hero-content">
            <p> Welcome {user.username || "guest"}</p>
            <h1> Why Choose Us?</h1>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor
              optio deserunt, aliquam iusto odit atque repudiandae
            </p>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor
              optio deserunt, aliquam iusto odit atque repudiandae
            </p>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor
              optio deserunt, aliquam iusto odit atque repudiandae
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
      <Analytics />
    </>
  );
}

export default About;
