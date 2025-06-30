// src/ui/card.js
import React from 'react';
export const Card = ({ children, ...props }) => (
  <div style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '15px', marginBottom: '20px' }} {...props}>
    {children}
  </div>
);

export const CardContent = ({ children }) => (
  <div>{children}</div>
);
