import '../App.css'; // Ensure styles are applied


export default function Header() {
  return (
    <header className="bg-white">
      <div className="container mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between">
        {/* Left: Logo + Name */}
        <div className="flex items-center space-x-2 group">


          {/* Name wrapper */}
          <span className="relative inline-grid  text-2xl font-bold leading-none text-gray-800 ">
            {/* Original text */}
              BridgeAI
            </span>
        </div>

        {/* Right: Date */}
        <div className=" items-center justify-items-center  mt-4 md:mt-0">
          <div className="mt-2 md:mt-0 text-center md:text-right">
            {new Date().getFullYear()} {new Date().getMonth() + 1}{' '}
            {new Date().getDate()}
          </div>
        </div>    
      </div>
    </header>
  );
}
