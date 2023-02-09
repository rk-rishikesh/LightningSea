import React, { useEffect } from 'react';
import '../../src/index.css';

export default function Silder() {
  useEffect(() => {
    var index = 0;
    var slides = document.querySelectorAll('.slides');
    function changeSlide() {
      if (index < 0) {
        index = slides.length - 1;
      }
      if (index > slides.length - 1) {
        index = 0;
      }
      for (let i = 0; i < slides.length; i++) {
        slides[i].className = 'try';
      }
      if (slides[index] !== undefined) {
        slides[index].className = 'try2';
      }
      index++;

      setTimeout(changeSlide, 1000);
    }
    changeSlide();
  });

  return (
    <>
      <div>
        <div className="slides">
          <img
            style={{ margin: '50px 0px 0px 0px' }}
            src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/142996/paris.jpg"
            width="100%"
            height="450px"
          />
        </div>

        <div className="slides">
          <img
            style={{ margin: '50px 0px 0px 0px' }}
            src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/142996/singapore.jpg"
            width="100%"
            height="450px"
          />
        </div>

        <div className="slides">
          <img
            style={{ margin: '50px 0px 0px 0px' }}
            src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/142996/prague.jpg"
            width="100%"
            height="450px"
          />
        </div>
      </div>
    </>
  );
}
