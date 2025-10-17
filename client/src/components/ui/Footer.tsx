export default function Footer() {
  return (
    <>
      <footer className="sticky bottom-0 left-0 w-full bg-white border-t border-gray-200 py-3 text-center text-sm text-gray-600">
        <p className="mb-2">The realm of Elecon • Supporting 40+ languages</p>

        <div className="flex justify-center space-x-5 mb-2">
          <a
            href="https://github.com/Alasiri44"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-indigo-600 transition"
          >
            <i className="fab fa-github text-xl"></i>
          </a>
          <a
            href="https://twitter.com/your-username"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-500 transition"
          >
            <i className="fab fa-twitter text-xl"></i>
          </a>
          <a
            href="https://www.linkedin.com/in/austin-pamba-0845b835a/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-700 transition"
          >
            <i className="fab fa-linkedin text-xl"></i>
          </a>
        </div>

        <p className="text-xs text-gray-400">
          © {new Date().getFullYear()} Elecon Translator. Built by Austin
          Alasiri.
        </p>
      </footer>
    </>
  );
}
