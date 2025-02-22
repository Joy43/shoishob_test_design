import React from 'react';

export default function Contact() {
  return (
    <div className="bg-white">
  
      {/* Contact Info Section */}
      <section className="py-12 px-4">
        <h2 className="text-2xl font-serif font-bold text-center text-green-800">Get in Touch</h2>
        <p className="mt-4 text-gray-600 text-center max-w-2xl mx-auto">
          Reach out via phone, email, or visit us at our location.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-8">
          <div className="p-6 shadow-md border rounded-lg bg-green-50 text-center transition hover:shadow-lg">
            <h3 className="text-lg font-serif font-semibold text-green-700">Call Us</h3>
            <p className="text-gray-700 mt-2">+88 01701677162</p>
          </div>
          <div className="p-6 shadow-md border rounded-lg bg-green-50 text-center transition hover:shadow-lg">
            <h3 className="text-lg font-semibold text-green-700">Email Us</h3>
            <p className="text-gray-700 font-sans mt-2">info@shoishobbd.com</p>
          </div>
          <div className="p-6 shadow-md border rounded-lg bg-green-50 text-center transition hover:shadow-lg">
            <h3 className="text-lg font-semibold text-green-700">Visit Us</h3>
            <p className="text-gray-700 mt-2">123 Health St, Dhaka City</p>
          </div>
        </div>
      </section>

      {/*--------------  Message Form Section -----------------*/}
      <section className="bg-gray-50 py-12 px-4">
        <h2 className="text-2xl font-bold text-center text-green-800">Send Us a Message</h2>
        <form className="max-w-2xl mx-auto mt-8 space-y-6">
          {/* ---------- name section------ */}
          <div>
            <label htmlFor="name" className="block text-gray-700 font-medium">Name</label>
            <input
              type="text"
              id="name"
              className="w-full mt-2 p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400"
              placeholder="Your Full Name"
            />
          </div>
          {/* ---------Email section------------ */}
          <div>
            <label htmlFor="email" className="block text-gray-700 font-medium">Email</label>
            <input
              type="email"
              id="email"
              className="w-full mt-2 p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400"
              placeholder="Your Email Address"
            />
          </div>
          {/* -------------Message-------------------- */}
          <div>
            <label htmlFor="message" className="block text-gray-700 font-medium">Message</label>
            <textarea
              id="message"
              rows="5"
              className="w-full mt-2 p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400"
              placeholder="Write your message here..."
            ></textarea>
          </div>
          {/* --------------send button---------- */}
          <button
            type="submit"
            className="w-full bg-[#2B2D42] text-white py-3 rounded-lg shadow-md hover:bg-green-500 transition"
          >
            Send Message
          </button>
        </form>
      </section>
    </div>
  );
}
