import React from 'react';

const CustomPrevArrow = (props) => {
    const { className, style, onClick } = props;
    return (
      <div
        className={`${className} custom-prev-arrow custom-size`} // Added custom-size class
        style={{ 
          ...style, 
          display: "block", 
          zIndex: 2, 
          left: '22px', 
          top: '35%', 
          transform: 'translateY(-50%)',
          cursor: 'pointer'
        }}
        onClick={onClick}
      >
        &#8249;
      </div>
    );
  };
  
  const CustomNextArrow = (props) => {
    const { className, style, onClick } = props;
    return (
      <div
        className={`${className} custom-next-arrow custom-size`} // Added custom-size class
        style={{ 
          ...style, 
          display: "block", 
          zIndex: 2, 
          right: '22px', 
          top: '35%', 
          transform: 'translateY(-50%)',
          cursor: 'pointer'
        }}
        onClick={onClick}
      >
        &#8250;
      </div>
    );
  };
  

export { CustomPrevArrow, CustomNextArrow };
