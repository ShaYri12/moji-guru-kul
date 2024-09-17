import React from 'react';

const ProfileCard = () => {
  return (
    <div className="bg-white shadow-lg rounded-xl p-6 max-w-full mx-auto border-2 border-gray-200 w-full">
      <div className="flex justify-center mb-4">
        <img src="/img/profile.png" alt="Profile" className="w-[80px] h-[80px] ml-4" />
      </div>
      <div className="text-center mb-4">
        <h2 className="text-xl font-semibold text-purple">Carisa Maya</h2>
        <p className="text-black">@carisamaya</p>
      </div>
      <div className="flex justify-around mb-4 text-gray-500">
        <div className="text-center">
          <p className="text-lg font-semibold text-black">100</p>
          <p>Post</p>
        </div>
        <div className="text-center">
          <p className="text-lg font-semibold text-black">100</p>
          <p>Point</p>
        </div>
      </div>
      <div className="flex justify-center">
        <button className="w-full bg-purple text-white font-semibold py-3 px-4 rounded-lg">
          View Profile
        </button>
      </div>
    </div>
  );
}

export default ProfileCard;
