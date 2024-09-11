
// Skeleton.js
import React from 'react';
import './skeleton.css'

const Skeleton = () => {
  return (
    <div className="animate-pulse mt-20">
      <div className="h-4 bg-gray-400 w-1/2 mb-4"></div>
      <div className="flex justify-between mb-4">
        <div className="h-4 bg-gray-400 w-1/4"></div>
        <div className="h-4 bg-gray-400 w-1/4"></div>
      </div>
      <ul>
        {[1, 2, 3, 4, 5].map((item) => (
          <li key={item} className="py-2 border-b border-gray-300">
            <div className="flex justify-between">
              <div className="h-4 bg-gray-400 w-1/2"></div>
              <div className="flex">
                <div className="h-4 bg-gray-400 w-1/4 mr-1"></div>
                <div className="h-4 bg-gray-400 w-1/4"></div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Skeleton;