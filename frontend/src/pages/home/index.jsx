import React from 'react'
import Navbar from "../../components/navbar";
import Restaurants from '../../components/restaurants';
import Deals from '../../components/deals';
import Footer from '../../components/footer';

function Home() {
  return (
    <div>

        <Navbar/>
        <Deals/>
        <Restaurants/>
       
    </div>
  )
}

export default Home