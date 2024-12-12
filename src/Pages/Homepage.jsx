import React from 'react';
import Navbar from '../components/Navbar';
const HomePage = ({ setUserData }) => {
  return (
    <>
      <Navbar setUserData={setUserData} />
    </>
  );
};

export default HomePage;
