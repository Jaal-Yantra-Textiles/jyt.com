// components/Hero.js

function Hero() {
    return (
      <div className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <h1 className="text-5xl font-bold text-white">Checkout Our Cicilabel Journey</h1>
          <p className="text-xl text-white">Discover the story behind our brand and what makes us unique.</p>
          <a href="/learn-more" className="bg-white py-2 px-6 rounded-full hover:bg-gray-200 transition duration-300">
            Learn More
          </a>
        </div>
      </div>
    );
  }
  
  export default Hero;
  