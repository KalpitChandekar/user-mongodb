"use client";
import { useState } from "react";
import axios from "axios";

export default function Home() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async(e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage("");
    
    try{
      const response = await axios.post('/api/users', { name, email });
      console.log(response.data);
      
      // Clear form inputs after successful submission
      setName("");
      setEmail("");
      
      // Show success message
      setMessage("User created successfully!");
      
    }
    catch(error){
      console.error("Error creating user:", error);
      setMessage("Failed to create user. Please try again.");
    }
    finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Create User</h1>
          <p className="text-gray-600">Add a new user to your system</p>
        </div>
        
        {/* Success/Error Message */}
        {message && (
          <div className={`mb-4 p-3 rounded-lg text-center ${
            message.includes("successfully") 
              ? "bg-green-100 text-green-700 border border-green-200" 
              : "bg-red-100 text-red-700 border border-red-200"
          }`}>
            {message}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
              Full Name
            </label>
            <input 
              type="text" 
              id="name"
              value={name}
              required
              placeholder="Enter your full name" 
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 outline-none"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <input 
              type="email" 
              id="email"
              value={email}
              required
              placeholder="Enter your email address" 
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 outline-none"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          
          <button 
            type="submit" 
            disabled={isLoading}
            className={`w-full font-semibold py-3 px-6 rounded-lg transition-all duration-200 transform focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
              isLoading 
                ? "bg-gray-400 cursor-not-allowed" 
                : "bg-blue-600 hover:bg-blue-700 hover:scale-105 text-white"
            }`}
          >
            {isLoading ? "Creating..." : "Create User"}
          </button>
        </form>
        
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500">
            By creating an account, you agree to our terms of service
          </p>
        </div>
      </div>
    </div>
  );
}
