import React, { useEffect } from "react";
import HeroSection from "./components/HeroSection";
import { useProductContext } from "./context/productcontex";
import { useNavigate} from "react-router-dom";

const About = () => {
 
  const { myName } = useProductContext();
  const data = {
    name: "Nitin Ecommerce",
  };
  const aboutData = {
    description:
      "Nitin Ecommerce is your premier destination for a unique and delightful shopping experience. We pride ourselves in offering a curated selection of high-quality products, ranging from fashion and electronics to home essentials. Our commitment to customer satisfaction is unmatched, ensuring that every visit to Nitin Ecommerce is a journey of discovery and convenience.",
    location: "123 Shopping Street,Bariparao, Haldwani, Uttarakhand",
    contact: "Contact us at:ns129210@gmail.com",
  };
  return (
    <>
      {myName}
      <HeroSection myData={data} />
      <section style={aboutSectionStyle}>
        <div style={aboutContainerStyle}>
          <h2 style={aboutHeadingStyle}>About Us</h2>
          <p style={aboutDescriptionStyle}>{aboutData.description}</p>
          <p style={aboutDescriptionStyle}>{aboutData.location}</p>
          <p style={aboutDescriptionStyle}>{aboutData.contact}</p>
        </div>
      </section>
    </>
  );
};
const aboutSectionStyle = {
  backgroundColor: "#f8f8f8",
  padding: "50px 0",
};

const aboutContainerStyle = {
  maxWidth: "1000px",
  margin: "0 auto",
};

const aboutHeadingStyle = {
  fontSize: "5rem",
  textAlign: "center",
  marginBottom: "20px",
  color: "#333",
};

const aboutDescriptionStyle = {
  fontSize: '2rem',
  lineHeight:' 1.6',
  color: 'rgb(53 37 37)',
  marginBottom: '15px',
};
export default About;

