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
            style={{ margin: '40px 0px 0px 0px' }}
            src="https://cdn.naturettl.com/wp-content/uploads/2017/07/22013347/start-here-lead-800x534.jpg?p=8676"
            width="100%"
            height="550px"
          />
        </div>

        <div className="slides">
          <img
            style={{ margin: '40px 0px 0px 0px' }}
            src="https://www.careerguide.com/career/wp-content/uploads/2021/04/tumblr_ms21cuNeJb1qa0ri9o1_1280.jpg"
            width="100%"
            height="550px"
          />
        </div>

        <div className="slides">
          <img
            style={{ margin: '40px 0px 0px 0px' }}
            src="https://youthincmag.com/wp-content/uploads/2014/08/resize.jpg"
            width="100%"
            height="550px"
          />
        </div>
      </div>
    </>
  );
}
