import '../App.css'; // Ensure styles are applied
import Logo from '../assets/Logo.svg'; // Adjust the path as necessary


export default function Header() {
  return (
    <header className="bg-white">
  <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
    <div className="flex lg:flex-1">
      <a href="#" className="flex flex-row items-center gap-2 font-semibold -m-1.5 p-1.5">
        <span className="sr-only">Your Company</span>
        <img className="h-8 w-auto" src={Logo} alt="" />
        BridgeAI
      </a>
    </div>
    <div className="flex lg:hidden">
      <button type="button" className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700">
        <span className="sr-only">Open main menu</span>

      </button>
    </div>
    <div className="hidden lg:flex lg:gap-x-12">


      <a href="#" className="text-sm/6 font-semibold text-gray-900">Lessons</a>
      <a href="#" className="text-sm/6 font-semibold text-gray-900">Exercises</a>
      <a href="#" className="text-sm/6 font-semibold text-gray-900">Quizzes</a>
    </div>
    <div className="hidden lg:flex lg:flex-1 lg:justify-end">
      <a href="#" className="text-sm/6 font-semibold text-gray-900">Log in <span aria-hidden="true">&rarr;</span></a>
    </div>
  </nav>

</header>
  );
}
