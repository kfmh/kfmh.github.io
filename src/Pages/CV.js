import React from 'react';
import CV from '../cv_certificates/CV.pdf';

const CVPage = () => {
  return (
    <div style={{height:"100vh"}}>
      <iframe src={CV} width="100%" height={"100%"} title="Karl-Fredrik Hagman's CV"></iframe>
    </div>
  );
};

export default CVPage;
