
'use client';

import { useState } from 'react';

const SubmitTicket = () => {
  const [type, setType] = useState('');
  const [priority, setPriority] = useState('');
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-2">Submit new ticket</h2>
      <p className="text-gray-500 mb-4">You will get a response.</p>
      
      <label className="block mb-2">Subject</label>
      <input 
        type="text" 
        className="w-full p-2 border rounded mb-4" 
        value={subject} 
        onChange={(e) => setSubject(e.target.value)}
      />
      
      <div className="flex gap-4 mb-4">
        <div className="w-1/2">
          <label className="block mb-2">Type</label>
          <select 
            className="w-full p-2 border rounded" 
            value={type} 
            onChange={(e) => setType(e.target.value)}
          >
            <option value="">Select type</option>
            <option value="Website problem">Website problem</option>
            <option value="Partner request">Partner request</option>
            <option value="Complaint">Complaint</option>
            <option value="Info inquiry">Info inquiry</option>
          </select>
        </div>
        
        <div className="w-1/2">
          <label className="block mb-2">Priority</label>
          <select 
            className="w-full p-2 border rounded" 
            value={priority} 
            onChange={(e) => setPriority(e.target.value)}
          >
            <option value="">Choose priority</option>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>
      </div>
      
      <label className="block mb-2">Description</label>
      <textarea 
        className="w-full p-2 border rounded mb-4 h-24" 
        value={description} 
        onChange={(e) => setDescription(e.target.value)}
      />
      
      <div className="flex justify-between">
        <button className="bg-black text-white px-4 py-2 rounded">Back</button>
        <button className="bg-orange-500 text-white px-4 py-2 rounded">Submit</button>
      </div>
    </div>
  );
};

export default SubmitTicket;
