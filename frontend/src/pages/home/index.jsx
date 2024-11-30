import React from 'react'
import Navbar from "../../components/navbar";
import Restaurants from '../../components/restaurants';
import Deals from '../../components/deals';
import HeroSection from '../../components/heroSection';
import Design from '../../components/design';
import About from '../../components/about';

function Home() {
  return (
    <div>
        
        <Navbar/>
        <HeroSection/>
        <Deals/>
        <Restaurants/>
        <Design/>
        <About/>
       
    </div>
  )
}

export default Home