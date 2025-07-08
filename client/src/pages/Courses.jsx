import '../App.css'; // Ensure styles are applied

import Header from '../components/Header';
import Footer from '../components/Footer';


export default function Courses() {
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
                            Courses
                        </h1>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}
