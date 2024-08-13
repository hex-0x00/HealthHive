import React from 'react';

const ArrowDownIcon = ({ className = '', width = 24, height = 24, isRotated = false }) => {
  const rotationStyle = {
    transform: isRotated ? 'rotate(180deg)' : 'rotate(0deg)',
    transition: 'transform 0.3s ease-in-out'
  };

  const theme = document.getElementById('root').classList.contains('dark')
  
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      width={width}
      height={height}
      x="0"
      y="0"
      viewBox="0 0 24 24"
      style={{ ...rotationStyle, enableBackground: 'new 0 0 512 512' }}
      xmlSpace="preserve"
      className={className}
    >
      <g>
        <path
          d="M12 16a1 1 0 0 1-.71-.29l-6-6a1 1 0 0 1 1.42-1.42l5.29 5.3 5.29-5.29a1 1 0 0 1 1.41 1.41l-6 6a1 1 0 0 1-.7.29z"
          data-name="16"
          fill={theme ? "#fff" : "#000"}
          opacity="1"
          data-original="#000000"
        />
      </g>
    </svg>
  );
};

export default ArrowDownIcon;