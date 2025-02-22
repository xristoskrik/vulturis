import React from "react";
import './styles.css'; 

const VlogPage = () => {
  return (
    <div className="vlog-container">
      <h2 className="vlog-heading">VLOG</h2>
      <p className="ponawpsyxika">
        A News website its contents can be replaced
	      
	</p>
      <div className="vlog-video-wrapper">
        <iframe
          width="100%"
          height="500"
          src="https://www.youtube.com/embed/dQw4w9WgXcQ" 
          title="Vlog Video"
          frameBorder="1"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
};

export default VlogPage;

