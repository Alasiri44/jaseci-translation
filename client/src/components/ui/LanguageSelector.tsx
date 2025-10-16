import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

interface Language {
  name: string;
  code: string;
}

interface Props {
  languages: Language[];
  selectedLanguage: string;
  selectedLanguageCode: string;
  setSelectedLanguage: (lang: string) => void;
  setSelectedLanguageCode: (code: string) => void;
}

const LanguageSelector: React.FC<Props> = ({
  languages,
  selectedLanguage,
  selectedLanguageCode,
  setSelectedLanguage,
  setSelectedLanguageCode,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  
  const filteredLanguages = languages.filter((lang) =>
    lang.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="relative w-full">
      {/* Dropdown Button */}
      <div
        className="flex items-center justify-between border-2 border-indigo-500 rounded-lg p-2 cursor-pointer bg-white focus-within:ring-2 focus-within:ring-indigo-400"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-gray-700" key={selectedLanguageCode}>
          {selectedLanguage || "Select a language"}
        </span>
        <ChevronDown
          className={`w-5 h-5 text-indigo-600 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </div>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute z-10 w-full mt-2 bg-white border border-gray-300 rounded-lg shadow-lg">
          {/* Search Bar */}
          <div className="p-2 border-b border-gray-200">
            <input
              type="text"
              placeholder="Search language..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>

          {/* Language List */}
          <div className="max-h-48 overflow-y-auto">
            {filteredLanguages.length > 0 ? (
              filteredLanguages.map((language, index) => (
                <div
                  key={index}
                  className={`px-3 py-2 hover:bg-indigo-100 cursor-pointer ${
                    selectedLanguage === language.name ? "bg-indigo-50" : ""
                  }`}
                  onClick={() => {
                    setSelectedLanguage(language.name);
                    setSelectedLanguageCode(language.code)
                    setIsOpen(false);
                    setSearchTerm("");
                  }}
                >
                  {language.name}
                </div>
              ))
            ) : (
              <div className="px-3 py-2 text-gray-500 text-sm">
                No results found
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default LanguageSelector;
