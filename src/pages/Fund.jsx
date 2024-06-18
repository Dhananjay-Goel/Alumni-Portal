import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { db, storage } from "../firebase";
import { addDoc, getDocs, collection, query, where } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";

const Fund = () => {
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    shortDescription: "",
    longDescription: "",
  });

  const [cards, setCards] = useState([]);

  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  useEffect(() => {
    checkLoggedIn();
    fetchCards();
  }, []);

  const checkLoggedIn = () => {
    setIsLoggedIn(localStorage.getItem("userId") !== null);
  };

  // Fetching cards data from Firestore
  const fetchCards = async () => {
    try {
      const colRef = collection(db, "Fundraising");
      const querySnapshot = await getDocs(colRef);

      const fetchedCards = querySnapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          title: data.title || "",
          shortDescription: data.shortDescription || "",
          longDescription: data.longDescription || "",
          imageURL: data.imageURL || "",
        };
      });

      setCards(fetchedCards);
    } catch (error) {
      console.error("Error fetching cards:", error);
      toast.error("Error fetching cards.", toastOptions);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
  };

  const openForm = () => {
    setIsFormOpen(true);
  };

  const closeForm = () => {
    setIsFormOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title) {
      toast.error("Please provide a title.", toastOptions);
      return;
    }

    if (!formData.shortDescription) {
      toast.error("Please provide a short description.", toastOptions);
      return;
    }

    if (!formData.longDescription) {
      toast.error("Please provide a long description.", toastOptions);
      return;
    }

    if (!imageFile) {
      toast.error("Please add an image.", toastOptions);
      return;
    }

    try {
      const colRef = collection(db, "Users");
      const userQuery = query(colRef, where("uid", "==", userId));
      const userSnapshot = await getDocs(userQuery);

      if (userSnapshot.empty) {
        toast.error("User not found.", toastOptions);
        return;
      }

      const userData = userSnapshot.docs[0].data();
      const { name, email, phone } = userData;

      // Upload image file to Firebase Storage
      const storageRef = ref(storage, `/fundraising/${imageFile.name}`);
      const uploadTask = uploadBytesResumable(storageRef, imageFile);

      uploadTask.on(
        "state_changed",
        () => {
          // You can implement progress function here if needed
        },
        (error) => {
          console.error("Error uploading image file:", error);
          toast.error("Error in image upload!", toastOptions);
        },
        async () => {
          try {
            const url = await getDownloadURL(uploadTask.snapshot.ref);
            console.log("Image URL:", url);

            // Add document to the "Fundraising" collection in Firestore
            const docRef = await addDoc(collection(db, "Fundraising"), {
              uid: userId,
              email,
              name,
              phone,
              title: formData.title,
              shortDescription: formData.shortDescription,
              longDescription: formData.longDescription,
              imageURL: url,
            });

            // Create a new card and add it to the cards state
            const newCard = {
              id: docRef.id,
              ...formData,
              imageURL: url,
            };

            setCards((prevCards) => [...prevCards, newCard]);

            // Reset form data and image file
            setFormData({ title: "", shortDescription: "", longDescription: "" });
            setImageFile(null);

            closeForm();
            toast.success("Fundraising project added successfully!", toastOptions);
          } catch (error) {
            console.error("Error adding document to Firestore:", error);
            toast.error("Error in adding project!", toastOptions);
          }
        }
      );
    } catch (error) {
      console.error("Error fetching user data:", error);
      toast.error("Error in form submission!", toastOptions);
    }
  };

  const handleCardClick = (cardId) => {
      navigate(`/FundraisingPages/${cardId}`);
  };

  const truncateDescription = (description) => {
    // Truncate the description and add ellipsis if it's longer than 100 characters
    return description.length > 100 ? description.slice(0, 100) + "..." : description;
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex flex-col items-center justify-center bg-gray-200 w-full h-[120px] gap-2 ">
        <p className="text-black font-bold font-serif text-[28px]">Fundraising</p>
        <p className="text-[22px] font-normal font-serif text-gray-500">
          Select one of the initiatives below that you would like to Donate to
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-8">
        {cards.map((card) => (
          <div
            key={card.id}
            className="shadow-lg w-full md:w-1/3 lg:w-1/4 flex flex-col gap-8 mb-8 mt-8 rounded-xl cursor-pointer hover:bg-gray-100"
            onClick={() => handleCardClick(card.id)}
          >
            <div className="w-full h-[200px] rounded-t-lg overflow-hidden">
              <img src={card.imageURL} alt={card.title} className="w-full h-full object-cover" />
            </div>
            <div className="flex flex-col gap-3 p-4">
              <p className="text-xl font-semibold">{card.title}</p>
              <p className="text-sm">{truncateDescription(card.shortDescription)}</p>
            </div>
          </div>
        ))}
      </div>

      {isLoggedIn && (
        <div className="w-full flex justify-center mt-6 mb-6">
        <button
          className="bg-blue-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-700"
          onClick={openForm}
        >
          Add Fundraising Project
        </button>
      </div>
      )}
      

      {/* Form for adding a new fundraising project */}
      {isFormOpen && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50">
          <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50" onClick={closeForm}></div>
          <div className="bg-white p-4 rounded-lg shadow-lg z-50 flex flex-col w-[600px] h-[600px] relative overflow-auto">
            <button
              onClick={closeForm}
              className="absolute top-0 right-0 m-2 w-7 h-8 flex items-center justify-center rounded-full bg-red-500 text-white hover:bg-red-600 focus:outline-none"
            >
              X
            </button>
            <h1 className="text-[28px] ml-[140px] font-bold mb-4 w-[300px] flex items-center justify-center border border-gray-900 p-1">
              Fundraising Form</h1>
            <form onSubmit={handleSubmit}>
              <div>
                <label className="text-semibold text-[18px]">Upload Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="h-10 w-full border border-gray-500 hover:border-indigo-900 cursor-pointer"
                  required
                />
              </div>
              <div className="mb-4">
              <label className="text-semibold text-[18px] mt-3">Title</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="h-[45px] w-full border overflow-x-auto border-gray-500 hover:border-indigo-900"
                  required
                />
              </div>
              <div className="mb-4">
              <label className="block mt-3 text-[18px]">Short Description</label>
                <input
                  type="text"
                  name="shortDescription"
                  value={formData.shortDescription}
                  onChange={handleInputChange}
                  className="w-full h-[100px] max-h-[200px] overflow-auto bg-gray-200 rounded-lg px-4 py-2 focus:bg-white transition-colors duration-300"
                  required
                />
              </div>
              <div className="mb-4">
              <label className="block mt-3 text-[18px]">Long DescriptionLong Description</label>
                <textarea
                  name="longDescription"
                  value={formData.longDescription}
                  onChange={handleInputChange}
                  className="w-full h-[100px] max-h-[200px] overflow-auto bg-gray-200 rounded-lg px-4 py-2 focus:bg-white transition-colors duration-300"
                  required
                />
              </div>
              <div className="flex justify-center">
                <button
                  type="submit"
                  className="bg-blue-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-700"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Display toasts */}
      <ToastContainer {...toastOptions} />
    </div>
  );
};

export default Fund;
