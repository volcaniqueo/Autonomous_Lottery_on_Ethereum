import React, { useState } from 'react';
import './Accordion.css';

const Accordion = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="accordion">
      <button className={`accordion-toggle ${isOpen ? 'open' : ''}`} onClick={handleToggle}>
        {title}
      </button>
      <div className={`accordion-content ${isOpen ? 'open' : ''}`}>{isOpen && children}</div>
    </div>
  );
};

export default Accordion;
