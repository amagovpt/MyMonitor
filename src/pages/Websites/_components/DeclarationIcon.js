import React from 'react';

const DeclarationIcon = ({ value, darkTheme }) => {
  if (!value || value === "0") {
    return null;
  }

  let svgFile;
  let altText;

  switch (value) {
    case "1":
      svgFile = "/img/SVG_Declaracao_Conforme.svg";
      altText = "Declaração conforme";
      break;
    case "2":
      svgFile = "/img/SVG_Declaracao_Parcial_Conforme.svg";
      altText = "Declaração parcialmente conforme";
      break;
    case "3":
      svgFile = "/img/SVG_Declaracao_Nao_Conforme.svg";
      altText = "Declaração não conforme";
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

export default DeclarationIcon; 