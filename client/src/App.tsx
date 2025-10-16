import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import Footer from "./components/ui/Footer";

interface Language {
  name: string;
  code: string;
}

function App() {
  const [languages, setLanguages] = useState<Language[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [homeLanguage, setHomeLanguage] = useState("English");
  const [foreignLanguage, setForeignLanguage] = useState('Spanish');
  const [homeText, setHomeText] = useState("");
  const [translatedText, setTranslatedText] = useState("");

  useEffect(() => {
    const fetchLanguages = async () => {
      try {
        const res = await axios.get("/data.json");
        setLanguages(res.data.languages);
      } catch (err) {
        setError("Failed to fetch languages");
      } finally {
        setLoading(false);
      }
    };
    fetchLanguages();
  }, []);

  loading && <p>Loading....</p>;

  error && <p>{error}</p>;

 
 return (
   <>
     <div className="box flex flex-col items-center text-center p-6 bg-gradient-to-b from-white to-gray-50 min-h-screen">
  <h1 className="text-5xl font-extrabold text-indigo-600 mb-4">Universal Translator</h1>
  <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
    Where knowledge meets intelligence
  </p>

  <div className="flex flex-wrap justify-center gap-8">
    <div className="m-4 p-4 w-full sm:w-[22rem] bg-white rounded-2xl shadow-md border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-700 mb-2">From</h3>
      <select
        name="language"
        id="language"
        value={homeLanguage}
        onChange={(event) => setHomeLanguage(event?.target.value)}
        className="w-full border-2 border-indigo-500 rounded-lg p-2 my-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
      >
        <option value="English">English</option>
        {languages &&
          languages.map((language, index) => (
            <option key={index} value={language.name}>
              {language.name}
            </option>
          ))}
      </select>
      <textarea
        name=""
        id=""
        value={homeText}
        onChange={(e) => setHomeText(e?.target.value)}
        placeholder="Enter text to translate ..."
        className="w-full border-2 border-indigo-500 rounded-lg p-3 mt-2 resize-none focus:outline-none focus:ring-2 focus:ring-indigo-400"
        rows={6}
      />
    </div>

    {/* To Language Box */}
    <div className="m-4 p-4 w-full sm:w-[22rem] bg-white rounded-2xl shadow-md border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-700 mb-2">To</h3>
      <select
        name="language"
        id="language"
        value={foreignLanguage}
        onChange={(event) => setForeignLanguage(event?.target.value)}
        className="w-full border-2 border-indigo-500 rounded-lg p-2 my-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
      >
        <option value="Spanish">Spanish</option>
        {languages &&
          languages.map((language, index) => (
            <option 
            key={index} 
            value={language.name}
            >
              {language.name}
            </option>
          ))}
      </select>
      <textarea
        name=""
        id=""
        readOnly
        value={translatedText}
        onChange={(e) => setTranslatedText(e?.target.value)}
        placeholder="Translation will appear here..."
        className="w-full border-2 border-indigo-500 rounded-lg p-3 mt-2 resize-none bg-gray-50 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-400"
        rows={6}
      />
    </div>
  </div>
</div>
  < Footer/>
   </>
 );
}

export default App;
