import React from 'react'
import Navbar from "../../components/navbar";
import Restaurants from '../../components/restaurants';
import Deals from '../../components/deals';
import HeroSection from '../../components/heroSection';
import Design from '../../components/design';
import About from '../../components/about';
import Data from '../../components/data';
import Download from '../../components/download';

function Home() {
  return (
    <div>
        
        <Navbar/>
        <HeroSection/>
        <Deals/>
        <Restaurants/>
        <Download/>
        <Design/>
        <About/>
        <Data/>
       
    </div>
  )
}

export default Home