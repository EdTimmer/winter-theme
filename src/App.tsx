import { useRef, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
// Video file is served from the public folder, so reference via root-absolute path
// const videoFile = '/assets/videos/winter_forest.mp4';
import SnowGroup from './components/SnowGroup';
import './App.css'
// import { OrbitControls } from '@react-three/drei';
import Sliders from './components/Sliders';
import GameGroupWrapper from './components/GameGroup/GameGroupWrapper';

gsap.registerPlugin(useGSAP, ScrollTrigger);



function App() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      // Create a timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: document.body,
          start: "800px",
          end: "1800px",
          scrub: 1,
        }
      });

      // First, ensure text-one starts visible and text-two starts hidden
      gsap.set('.text-one', { opacity: 1 });
      gsap.set('.text-two', { opacity: 0 });
      gsap.set('.text-three', { opacity: 0 });

      // Sequential text animations with extended display time for text-two
      // Text-two now displays for 4 seconds with 0.5s fade transitions
      tl.to('.text-one', { opacity: 0, duration: 0.5 })           // 0-0.5s: fade out text-one
        .to('.text-two', { opacity: 1, duration: 0.5 }, 0.5)     // 0.5-1s: fade in text-two
        .to('.text-two', { opacity: 0, duration: 0.5 }, 4.5)     // 4.5-5s: fade out text-two (displayed for 4s)
        .to('.text-three', { opacity: 1, duration: 0.5 }, 5.0);   // 5-5.5s: fade in text-three

    }
    // Removed scope so it can access elements anywhere in the document
  );

  useEffect(() => {
    if (videoRef.current) {
      // videoRef.current.playbackRate = 0.5;
      videoRef.current.pause(); // Pause the video when component mounts
    }
  }, []);

  useEffect(() => {
    let lastSetTime = -1; // Track the last time we set to avoid redundant updates
    
    const scroll = () => {
      const vid = videoRef.current;
      const section = sectionRef.current;
      
      if (!vid || !section || vid.duration <= 0) return;
      
      const distance = window.scrollY - section.offsetTop;
      const total = section.clientHeight - window.innerHeight;
      let targetTime;

      // Only proceed if we're in the scrollable range of the video section
      if (distance < 0) {
        // Before the video section starts
        targetTime = 0;
      } else if (distance >= total) {
        // After the video section ends
        targetTime = vid.duration;
      } else {
        // We're within the video section, calculate percentage
        let percentage = distance / total;
        percentage = Math.max(0, Math.min(percentage, 1));
        targetTime = vid.duration * percentage;
      }

      // Only update currentTime if it's significantly different to prevent flickering
      const timeDiff = Math.abs(vid.currentTime - targetTime);
      if (timeDiff > 0.016 || lastSetTime !== targetTime) { // ~1 frame at 60fps
        vid.currentTime = targetTime;
        lastSetTime = targetTime;
      }
    };

    scroll();
    window.addEventListener('scroll', scroll);

    // Cleanup function to remove event listener
    return () => {
      window.removeEventListener('scroll', scroll);
    };
  }, []);

  return (
    <div className='page-container'>
      <div className="large-rings">
        <div className='title-container'>
          <h1 className="header">Winter Wonderland</h1>
        </div>
        <div className='scene-container'>
          <Canvas camera={{ position: [60, 10, 40], fov: 20, far: 70 }}>
            {/* Camera will automatically look at the center [0,0,0] when using Canvas camera prop */}
            {/* <Snowflake scale={0.25} position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]} /> */}
            <SnowGroup position={[0, 0, 0]} rotation={[Math.PI / 2, 0.2, 0]} scale={0.145} count={2} rotationSpeed={0.08} />
            <ambientLight intensity={0.5} />
            {/* <OrbitControls enableZoom={true} /> */}
          </Canvas>
        </div>
      </div>

      <Sliders />

      <GameGroupWrapper />

      {/* <div className='row-two'>
        <section ref={sectionRef} className="vid">
          <div className="holder">
            <video ref={videoRef} autoPlay muted loop>
              <source src={videoFile} type="video/mp4" />
            </video>
            <div className="story-container">
              <div className='text-one'>
                <h2>Scroll to Scrub</h2>
              </div>
              <div className='text-two'>
                <h2>This video is linked to the scroll position. Scroll down to scrub through the video.</h2>
              </div>
              <div className='text-three'>
                <h2>Scroll back up to reverse.</h2>
              </div>
              </div>
          </div>
        </section>
      </div> */}
    </div>
  )
}

export default App

