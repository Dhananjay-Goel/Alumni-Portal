import React from 'react';
import image from '.././assets/img5.jpg'

const SignUpPage = () => {
    return (
        <div className="flex justify-center items-center h-screen bg-gray-100" style={{ backgroundImage: `url(${image})`, opacity: '0.7', backgroundSize: 'cover', backgroundPosition: 'center' }}>
            <div className="grid grid-cols-2 gap-8">
                {/* Alumni Sign Up Card */}
                <div className="bg-white p-12 rounded-3xl shadow-md flex flex-col items-center justify-center" style={{ width: "400px", height: "300px" }}>
                    <img src="/images/download.png" alt="Alumni Icon" className="w-24 h-24 rounded-full mb-6" />
                    <h2 className="text-2xl font-bold mb-6">Sign Up as Alumni</h2>
                    <a href="/signup" className="text-white">
                        <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-full focus:outline-none focus:shadow-outline">
                            Sign up
                        </button>
                    </a>
                </div>

                {/* Admin Sign Up Card */}
                <div className="bg-white p-12 rounded-3xl shadow-md flex flex-col items-center justify-center" style={{ width: "400px", height: "300px" }}>
                    <img src="/images/download.png" alt="Admin Icon" className="w-24 h-24 rounded-full mb-6" />
                    <h2 className="text-2xl font-bold mb-6">Sign Up as Admin</h2>
                    <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-full focus:outline-none focus:shadow-outline">
                        Sign up
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SignUpPage;
