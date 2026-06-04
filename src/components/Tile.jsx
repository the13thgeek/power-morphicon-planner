import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Tile.scss';

const Tile = ({ children, disabled = false, className = null, linkTo = null, isExternal = false }) => {

  const navigate = useNavigate();

  const goTo = () => {
    if(linkTo) {
      if(isExternal) {
        window.open(linkTo,'_blank');
      } else {
        navigate(linkTo);
      }
    }
    
  }

  if(linkTo) {
    return (
      <button className={`tile ${className} ${disabled ? 'disabled' : ''}`} onClick={goTo} disabled={disabled}>
          {children}
      </button>
    )
  } else {
    return (
      <div className={`tile ${className}`}>
          {children}
      </div>
    )
  }

  
}

export default Tile