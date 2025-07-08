import '../App.css';

export default function Footer() {
    return (
        <footer className="bg-white mt-auto">
            <div className="container mx-auto px-6 py-6 text-center text-gray-500 text-sm">
                © {new Date().getFullYear()} BridgeAI. All rights reserved.
            </div>
        </footer>
    );
}
