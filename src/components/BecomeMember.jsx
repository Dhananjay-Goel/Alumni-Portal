import React, { useState, useEffect } from 'react';
import { useNavigate  } from 'react-router-dom';

function BecomeMember() {
  const navigate = useNavigate(); 
  const [loaded, setLoaded] = useState(false);
  const handlememberClick = () => {
    navigate('/becomeamember');
};

  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => {
      setLoaded(true);
    }, 1000); // Adjust the delay as needed

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`relative border-2 rounded-lg text-left p-4 transition-opacity duration-1000 ${loaded ? 'opacity-100' : 'opacity-0'}`} style={{ height: '600px' }}>
      <div className="absolute inset-0 bg-cover bg-center rounded-lg" style={{ backgroundImage: "url('/images/IIT_Front.webp')", backgroundPosition: 'top' }}>
        {/* <div className="bg-black opacity-50 absolute inset-0"></div> */}
      </div>
      <div className="relative z-10 p-8 text-gray-800">
        <h2 className="text-4xl font-bold mb-6">Become A Member</h2>
        <p className="text-2xl font-semibold text-gray-700 mb-2">Register now and become a member of Alumni Association of IIT Ropar.</p>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4" onClick={handlememberClick}>
          Register Now
        </button>
      </div>
    </div>
  );
}

export default BecomeMember;
