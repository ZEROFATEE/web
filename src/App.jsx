import { useState } from 'react'
import Pricing from './components/Pricing'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Hero from './components/Hero'
import Service from './components/Service'
import Models from './components/Models'

function App() {

  return (
   
    <div className = "min-h-screen bg-slate-950 text-white overflow-hidden">
     <Navbar/>
     <Hero/>
     <Pricing/>
     <Service/>
     <Models/>
     <Footer/>
     <Route path="/models/:slug" element={<ModelDetail />}> </Route>            
    </div>
    
  )
}

export default App
