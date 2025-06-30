// src/ui/button.js
import React from 'react';
export const Button = ({ children, ...props }) => (
  <button style={{ padding: '10px 20px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }} {...props}>
    {children}
  </button>
);
