import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { MdShare } from "react-icons/md";
import { AiFillFacebook } from "react-icons/ai";
import { FaTwitter, FaInstagram } from "react-icons/fa";
import { IoLogoWhatsapp } from "react-icons/io";
import { db } from '../firebase'; // Adjust the import path as needed
import { doc, getDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';

const FundraisingPages = () => {
    const { id } = useParams();
    const [cardData, setCardData] = useState(null);
    const [isSharingOpen, setIsSharingOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const toggleSharing = () => {
        setIsSharingOpen(!isSharingOpen);
    };

    // Fetch card data based on ID
    useEffect(() => {
        const fetchData = async () => {
            try {
                const cardRef = doc(db, 'Fundraising', id);
                const docSnapshot = await getDoc(cardRef);

                if (docSnapshot.exists()) {
                    const data = docSnapshot.data();
                    setCardData({
                        id: docSnapshot.id,
                        title: data.title || '',
                        shortDescription: data.shortDescription || '',
                        longDescription: data.longDescription || '',
                        imageURL: data.imageURL || '',
                    });
                } else {
                    console.error(`Card with ID ${id} does not exist.`);
                    toast.error(`Card with ID ${id} does not exist.`);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
                toast.error('Error fetching data.');
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [id]);

    if (isLoading) {
        return <p>Loading...</p>;
    }

    if (!cardData) {
        return <p>No data found.</p>;
    }
    return (
        <div className="flex flex-col items-center justify-center gap-8 bg-gray-200">
            <div className="w-[1100px] h-[390px] flex flex-col shadow-lg rounded-b-xl bg-white">
                <img
                    src={cardData.imageURL}
                    className="w-[1100px] h-[300px] object-cover rounded-b-xl"
                    alt={cardData.title || 'Fundraising image'}
                />
                <div className="flex flex-row items-center justify-between mt-3 p-2">
                    <p className="font-bold text-indigo-900 text-[30px] ml-5">{cardData.title}</p>
                    <div className="bg-indigo-900 mr-5 text-white rounded-3xl w-[150px] h-[50px] flex items-center justify-center cursor-pointer text-[20px]">
                        Donate (USD)
                    </div>
                </div>
            </div>

            <div className="flex flex-row w-[1100px] gap-[25px] mb-8">
                <div className="w-[730px] flex flex-col shadow-lg rounded-xl bg-white">
                    <p className="text-gray-600 px-8 pt-8">{cardData.shortDescription}</p>
                    <p className="text-gray-600 px-8 pt-4">
                        To donate using your Credit Card or PayPal, please click the{' '}
                        <span className="text-gray-700 font-bold">Donate</span> button above. You can select which program to give how much to in that window.
                    </p>
                    <p className="text-gray-600 px-8 pt-4">
                        You can also{' '}
                        <span className="transition-colors duration-300 hover:text-blue-400 cursor-pointer text-indigo-500">
                            donate in INR or other non-USD currencies.
                        </span>
                    </p>
                    <div className="bg-[#E3FEF7] px-8 py-6 mx-5 my-5 ">
                        <p className="text-gray-600">{cardData.longDescription}</p>
                    </div>
                    <div className="p-8 ml-[250px]">
                        <div className="bg-indigo-900 text-white rounded-3xl w-[150px] h-[50px] flex items-center justify-center cursor-pointer text-[20px]">
                            Donate (USD)
                        </div>
                    </div>
                </div>

                <div className="w-[300px] h-[230px] flex flex-col shadow-lg rounded-xl ml-10 bg-white">
                    <p className="font-semibold text-[20px] mt-5 ml-4">Sharing is caring!</p>
                    <p className="text-gray-600 font-normal ml-4 mt-3">
                        Spreading the word around helps us reach more people that inch us closer to reaching our goals.
                    </p>
                    <div className="ml-4 mt-5">
                        <div className="relative">
                            <div
                                className="w-[120px] h-[50px] bg-gray-400 cursor-pointer text-[18px] flex flex-row items-center justify-center gap-2 rounded-2xl"
                                onClick={toggleSharing}
                            >
                                <MdShare />
                                <p>Share</p>
                            </div>
                            <div
                                className={`absolute top-[60px] left-0 w-[120px] bg-gray-300 rounded-lg transition-all duration-300 ${
                                    isSharingOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
                                }`}
                                style={{ maxHeight: isSharingOpen ? '200px' : '0px' }}
                            >
                                <div className="flex flex-col">
                                    <button className="p-2 hover:bg-gray-200 flex flex-row gap-2">
                                        <AiFillFacebook className="mt-1" /> Facebook
                                    </button>
                                    <button className="p-2 hover:bg-gray-200 flex flex-row gap-2">
                                        <FaTwitter className="mt-1" /> Twitter
                                    </button>
                                    <button className="p-2 hover:bg-gray-200 flex flex-row gap-2">
                                        <FaInstagram className="mt-1" /> Instagram
                                    </button>
                                    <button className="p-2 hover:bg-gray-200 flex flex-row gap-2">
                                        <IoLogoWhatsapp className="mt-1" /> Whatsapp
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FundraisingPages;
