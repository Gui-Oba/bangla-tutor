import '../App.css';
import Header from '../components/Header';
import Footer from '../components/Footer';


export default function Quizzes(){

    return (

        <main className="flex-grow bg-white">
            <Header />
            <section
                id="about"
                className="relative flex items-center justify-center h-screen bg-white text-black"
            >
                <div className="-translate-y-[8vh] sm:-translate-y-[6vh] lg:-translate-y-[10vh] px-6 text-center">
                    <h1 className="flex items-center text-6xl mb-6 justify-center">
                        Quizzes
                    </h1>
                </div>
            </section>
            <Footer/>
        </main>
        
    );
}