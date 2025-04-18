import './App.css'
import Navbar from './components/navbar/navbar'
import Hero from './components/hero-section/hero'
import BannerSection from './components/banner-section/banner-section'
import AboutUs from './components/about-us/about-us'
import Footer from './components/footer/footer'

function App() {

  return (
    <div className="font-family">
      <>
        <Navbar />
        <Hero />
        <BannerSection />
        <AboutUs />
        <Footer />
      </>
    </div>
  )
}

export default App
