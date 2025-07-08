import '../App.css'; // Ensure styles are applied

import Header from '../components/Header';

export default function Home() {
  return (

    
    <div className="min-h-screen flex flex-col bg-white">
      
      <Header />

      {/* Main Content */}
      <main className="flex-grow">

        {/* Hero */}
        <section
          id="about"
          className="relative flex items-center justify-center h-screen  bg-white text-black"
        >
          {/* This ensures title is always centered, with the projects outside of view */}
          <div className="-translate-y-[8vh] sm:-translate-y-[6vh] lg:-translate-y-[10vh] px-6 text-center">
            <h1 className="flex items-center text-6xl mb-6 justify-center">
              Your Personal AI Tutor
            </h1>
          </div>
        </section>





      </main>

      {/* Footer */}
      <footer className="bg-white mt-auto">
        <div className="container mx-auto px-6 py-6 text-center text-gray-500 text-sm">
          © {new Date().getFullYear()} BridgeAI. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
