import { useEffect, useRef, useState } from "react";
import axios from "axios";
import "./App.css";
import Footer from "./components/ui/Footer";
import LanguageSelector from "./components/ui/LanguageSelector";
import { recognizeSpeech } from "./components/speechRecognition";

interface Language {
  name: string;
  code: string;
}

interface speakTextProps {
  text: string;
  language: string;
}

function App() {
  const [languages, setLanguages] = useState<Language[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [homeLanguage, setHomeLanguage] = useState("English");
  const [foreignLanguage, setForeignLanguage] = useState("Spanish");
  const [homeText, setHomeText] = useState("");
  const [translatedText, setTranslatedText] = useState("");
  const [homeLanguageCode, setHomeLanguageCode] = useState("en-US");
  const [foreignLanguageCode, setForeignLanguageCode] = useState("es-ES");

  useEffect(() => {
    // Remove any query parameters like ?language=English from the URL
    window.history.replaceState({}, document.title, window.location.pathname);
  }, []);

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

  const translateText = async (e: any) => {
    e.preventDefault();
    try {
      const data = {
        text: homeText,
        source_language: homeLanguage,
        target_language: foreignLanguage,
      };

      axios
        .post("http://127.0.0.1:5000/translate", data)
        .then((response) => {
          setTranslatedText(response.data.translated_text);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    } catch (err) {
      setError("Error translating the language");
    } finally {
      setLoading(false);
    }
  };

  function speakText({ text, language }: speakTextProps) {
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = language;
      speechSynthesis.speak(utterance);
    } else {
      alert("Sorry, your browser doesn't support text-to-speech.");
    }
  }

  const formRef = useRef<HTMLFormElement>(null);
  const handleVoiceInput = async () => {
    try {
      const result = await recognizeSpeech(homeLanguage);
      setHomeText(result.transcript);
      setTimeout(() => {
        formRef.current?.requestSubmit();
      }, 100);

      // Manually call translation
      const data = {
        text: result.transcript,
        source_language: homeLanguage,
        target_language: foreignLanguage,
      };

      const response = await axios.post(
        "https://universal-translator-backend.onrender.com/translate",
        data
      );
      const newTranslation = response.data.translated_text;
      setTranslatedText(newTranslation);

      // Speak the translation immediately
      speakText({
        text: newTranslation,
        language: foreignLanguageCode,
      });
    } catch (error) {
      console.error(error);
    }
  };

  loading && <p>Loading....</p>;

  error && <p>{error}</p>;
  return (
    <>
      <div className="box flex flex-col items-center text-center p-6 bg-gradient-to-b from-white to-gray-50 min-h-screen">
        <h1 className="text-5xl font-extrabold text-indigo-600 mb-4">
          Universal Translator
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
          Where knowledge meets intelligence
        </p>

        <div className="flex flex-wrap justify-center gap-8">
          <div className="m-4 p-4 w-full sm:w-[22rem] bg-white rounded-2xl shadow-md border border-gray-200">
            <form ref={formRef} onSubmit={translateText}>
              <h3 className="text-lg font-semibold text-gray-700 mb-2">From</h3>
              <LanguageSelector
                languages={languages}
                selectedLanguage={homeLanguage}
                selectedLanguageCode={homeLanguageCode}
                setSelectedLanguage={setHomeLanguage}
                setSelectedLanguageCode={setHomeLanguageCode}
              />

              <textarea
                name=""
                id=""
                value={homeText}
                onChange={(e) => setHomeText(e?.target.value)}
                placeholder="Enter text to translate ..."
                className="w-full border-2 border-indigo-500 rounded-lg p-3 mt-2 resize-none focus:outline-none focus:ring-2 focus:ring-indigo-400"
                rows={6}
              />
              <button
                onClick={() =>
                  speakText({ text: homeText, language: homeLanguage })
                }
                className="bg-indigo-500 text-white p-2 rounded-lg hover:bg-indigo-600"
              >
                <i className="fa-solid fa-volume-high"></i>
              </button>
              <button
                type="button"
                onClick={handleVoiceInput}
                className="bg-blue-500 text-white p-2 rounded mx-2"
              >
                🎤 Speak
              </button>

              <button
                className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition duration-200 w-full"
                type="submit"
              >
                Translate
              </button>
            </form>
          </div>

          {/* To Language Box */}
          <div className="m-4 p-4 w-full sm:w-[22rem] bg-white rounded-2xl shadow-md border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">To</h3>
            <LanguageSelector
              languages={languages}
              selectedLanguage={foreignLanguage}
              selectedLanguageCode={foreignLanguageCode}
              setSelectedLanguage={setForeignLanguage}
              setSelectedLanguageCode={setForeignLanguageCode}
            />

            <textarea
              name="translatedText"
              id="translated text"
              readOnly
              value={translatedText ? translatedText : ""}
              placeholder={
                !translatedText ? "Translation will appear here..." : ""
              }
              className="w-full border-2 border-indigo-500 rounded-lg p-3 mt-2 resize-none bg-gray-50 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              rows={6}
            />
            <button
              onClick={() =>
                speakText({
                  text: translatedText,
                  language: foreignLanguageCode,
                })
              }
              className="bg-indigo-500 text-white p-2 rounded-lg hover:bg-indigo-600"
            >
              <i className="fa-solid fa-volume-high"></i>
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default App;
