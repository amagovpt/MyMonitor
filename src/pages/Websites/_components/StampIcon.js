import React from 'react';

const StampIcon = ({ value, darkTheme }) => {
  if (!value || value === "0") {
    return null;
  }

  let svgFile;
  let altText;

  switch (value) {
    case "1":
      svgFile = "/img/SVG_Selo_Bronze.svg";
      altText = "Selo Bronze";
      break;
    case "2":
      svgFile = "/img/SVG_Selo_Prata.svg";
      altText = "Selo Prata";
      break;
    case "3":
      svgFile = "/img/SVG_Selo_Ouro.svg";
      altText = "Selo Ouro";
      break;
    default:
      return null;
  }

  return (
    <img 
      src={svgFile} 
      alt={altText}
      style={{ 
        width: '24px', 
        height: '24px',
        filter: darkTheme ? 'invert(1)' : 'none'
      }}
    />
  );
};

export default StampIcon; 