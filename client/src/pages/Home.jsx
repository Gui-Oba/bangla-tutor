import '../App.css'; // Ensure styles are applied
import Header from '../components/Header';
import Footer from '../components/Footer';
import QuestionBox from '../components/QuestionBox';

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
            <h1 className="flex items-center text-5xl mb-6 justify-center">
              Your Personal AI Tutor
            </h1>
            <QuestionBox />

          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
