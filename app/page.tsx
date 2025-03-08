'use client';
import Aurora from '@/components/Backgrounds/Aurora/Aurora';
import Orb from '@/components/Backgrounds/Orb/Orb';
import SplitText from '@/components/TextAnimations/SplitText/SplitText';
import { FaSearch } from 'react-icons/fa';

export default function Home() {
  return (
    <div className="w-full h-screen flex flex-col justify-center items-center relative bg-black gap-3 font-inter">
      <Aurora colorStops={['#00C4FF', '#FF00FF', '#4A00E0']} />

      <SplitText
        text="Scammy"
        textAlign="center"
        className="text-8xl text-white font-extrabold tracking-tight drop-shadow-[0_0_2px_#00C4FF] font-rubik-bubbles"
      />

      <p className="text-lg text-white/80 font-normal max-w-md text-center">
        The best Amazon and TikTok products scam detector you can use
      </p>

      <div className="w-[40%] h-16 rounded-lg border border-white/10 bg-gradient-to-r from-[rgba(0,196,255,0.1)] to-[rgba(255,0,255,0.1)] backdrop-blur-md mt-4 px-4 flex gap-3 items-center">
        <input
          type="text"
          placeholder="Enter your product name..."
          className="grow h-full focus:outline-none bg-transparent text-white text-base font-medium placeholder-white/50"
        />
        <Orb
          hoverIntensity={0.5}
          rotateOnHover={true}
          icon={<FaSearch size={18} />}
          onClick={() => alert('Button clicked!')}
        />
      </div>
    </div>
  );
}
