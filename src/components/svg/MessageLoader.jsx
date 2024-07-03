import React from 'react';
import './messageLoader.css'; // Assuming you want to keep the styles in a separate CSS file

export default function MessageLoader() {
  return (
    <svg width="36" height="36" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" >
      <rect className="spinner_zWVm" x="1" y="1" width="10" height="10"/>
      <rect className="spinner_gfyD" x="8.33" y="1" width="10" height="10"/>
      <rect className="spinner_T5JJ" x="1" y="8.33" width="10" height="10"/>
      <rect className="spinner_E3Wz" x="15.66" y="1" width="10" height="10"/>
      <rect className="spinner_g2vs" x="8.33" y="8.33" width="10" height="10"/>
      <rect className="spinner_ctYB" x="1" y="15.66" width="10" height="10"/>
      <rect className="spinner_BDNj" x="15.66" y="8.33" width="10" height="10"/>
      <rect className="spinner_rCw3" x="8.33" y="15.66" width="10" height="10"/>
      <rect className="spinner_Rszm" x="15.66" y="15.66" width="10" height="10"/>
    </svg>
  );
}
