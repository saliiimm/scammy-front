'use client';
import Aurora from '@/components/Backgrounds/Aurora/Aurora';
import Orb from '@/components/Backgrounds/Orb/Orb';
import SplitText from '@/components/TextAnimations/SplitText/SplitText';
import { FaSearch } from 'react-icons/fa';
import { useState, useRef } from 'react';
import axios from 'axios';

interface APIResultIT {
  name : string;
  remark : string;
  isScam : string;
  images : string[];
  stats :{
    total_reviews: number;
    average_rating : number
  }
}
export default function Home() {
  const [productName, setProductName] = useState('');
  const [loading, setLoading] = useState(false); 
  const [result, setResult] = useState<APIResultIT | null>(null); 
  const resultRef = useRef<HTMLDivElement>(null); 
console.log(process.env.NEXT_PUBLIC_API_URL)
  const handleSearch = async () => {
    if (!productName.trim()) {
      alert('Please enter a product name');
      return;
    }

    setLoading(true);
    setResult(null); 

    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/products/`, {
        name: productName,
      });

      setResult(response.data.product); 

      setTimeout(() => {
        if (resultRef.current) {
          resultRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    } catch (error) {
      console.log('Error fetching product data:', error);
      alert('An error occurred while fetching the product data');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen flex flex-col justify-center items-center relative bg-[#131921] gap-3 font-inter overflow-hidden">
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
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
        />
        {loading ? (
          <div className="w-8 h-8 border-4 border-t-transparent border-white rounded-full animate-spin" />
        ) : (
          <Orb
            hoverIntensity={0.5}
            rotateOnHover={true}
            icon={<FaSearch size={18} />}
            onClick={handleSearch}
          />
        )}
      </div>

      {result && (
        <div
          ref={resultRef}
          className="w-[80%] mt-8 p-6 rounded-lg border border-white/10 bg-gradient-to-r from-[rgba(0,196,255,0.1)] to-[rgba(255,0,255,0.1)] backdrop-blur-md text-white"
        >
          <h2 className="text-2xl font-bold mb-4">{result.name}</h2>
          <p className="text-lg mb-2">
            <span className="font-semibold">Scam Likelihood: </span>
            {result.isScam ? (
              <span className="text-red-400">High (Potential Scam)</span>
            ) : (
              <span className="text-green-400">Low (Likely Safe)</span>
            )}
            {' '}{result.remark} 
          </p>
          <p className="text-lg mb-2">
            <span className="font-semibold">Total Reviews: </span>
            {result.stats?.total_reviews}
          </p>
          <p className="text-lg mb-4">
            <span className="font-semibold">Average Rating: </span>
            {result.stats?.average_rating ? result.stats?.average_rating.toFixed(1) : 0} / 5
          </p>
          {result.images && result.images.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold mb-2">Product Images:</h3>
              <div className="flex gap-4 overflow-x-auto">
                {result.images.map((img, idx) => (
                  <img
                    key={idx}
                    src={img}
                    alt={`Product ${idx + 1}`}
                    className="w-44 h-44 object-cover rounded-md"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement; 
                      target.src = 'https://via.placeholder.com/96'; 
                    }}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}