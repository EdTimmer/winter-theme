import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import '../App.css'
import { useRef } from 'react';

gsap.registerPlugin(useGSAP, ScrollTrigger);

const Sliders = () => {
  const container = useRef(null);

  useGSAP(
    () => {
      // Set starting position with margin from left
      gsap.set(['.box5', '.box4', '.box3', '.box2', '.box1'], {
        x: '3vw' // Start at 3% of viewport width
      });
      
      // Use a more conservative end position that works on smaller screens
      gsap.to(['.box5', '.box4', '.box3', '.box2', '.box1'], {
        x: '75vw', // Reduced from 85vw to 75vw for smaller screens
        // rotation: 360 * 4,
        stagger: 0.1, // Stagger the animations by 0.1 seconds
        scrollTrigger: {
          trigger: document.body,
          start: "top top",
          end: "400px",
          scrub: 1,
        }
      });
    },
    { scope: container }
  );

  return (
          <div ref={container} className='row-one'>
        <div className='box box1'>
          <div className='inner-box'>
            Box 1
          </div>
        </div>
        <div className='box box2'>
          <div className='inner-box'>
            Box 2
          </div>
        </div>
        <div className='box box3'>
          <div className='inner-box'>
            Box 3
          </div>

        </div>
        <div className='box box4'>
          <div className='inner-box'>
            Box 4
          </div>
        </div>
        <div className='box box5'>
          <div className='inner-box'>
            Box 5
          </div>
        </div>
      </div>
  )
}

export default Sliders