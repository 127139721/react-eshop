import Directory from "../../components/directory/directory.component";
import { Outlet } from 'react-router-dom';

import React, { Component }  from 'react';

const Home = () => {
  return (
    <>
      <Directory />
      <Outlet />
    </>
    
  );
};

export default Home;
