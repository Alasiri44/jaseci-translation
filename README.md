# Jaseci Translator
## Overview
Jaseci Translator is a simple full-stack application that translates text from one language to another uThe project supports all languages in the world, offering a clean and efficient interface for real-time ---
## Features
- Translate text between any two world languages
- Fast and lightweight backend powered by Flask
- Interactive and responsive frontend built with React
- Jaseci integration for natural language processing and translation logic
- Simple and intuitive user interface
---
## Tech Stack
- Frontend: React
- Backend: Flask (Python)
- AI Logic: Jaseci (Jac language)
- Package Manager: pipenv / npm
- Database (optional): SQLite
---
## Project Structure
```
jaseci-translator/
■
■■■ backend/
■ ■■■ app.py
■ ■■■ Pipfile
■ ■■■ Pipfile.lock
■ ■■■ jac/
■ ■■■ translator.jac
■
■■■ frontend/
■ ■■■ package.json
■ ■■■ src/
■ ■ ■■■ App.js
■ ■ ■■■ components/
■ ■ ■■■ ...
■ ■■■ public/
■
■■■ .gitignore
■■■ README.md
```
---
## Installation
### 1. Clone the Repository
```bash
git clone https://github.com/your-username/jaseci-translator.git
cd jaseci-translator
```
### 2. Set Up the Flask Backend
```bash
cd backend
pipenv install
pipenv shell
python app.py
```
The Flask server will start at http://localhost:5000
### 3. Set Up the React Frontend
In a new terminal:
```bash
cd frontend
npm install
npm start
```
The React app will run on http://localhost:3000
---
## Running the Jaseci Script
Inside the backend/jac/ folder, run:
```bash
jsctl -m run translator.jac
```
This initializes the Jaseci logic for translation.
---
## API Endpoints
POST /translate
Translates text from one language to another.
Request Body:
```json
{
 "source_language": "English",
 "target_language": "French",
 "text": "Hello, how are you?"
}
```
Response:
```json
{
 "translated_text": "Bonjour, comment allez-vous?"
}
```
---
## Future Improvements
- Add speech-to-text and text-to-speech support
- Enable automatic language detection
- Store translation history for users
---
## License
This project is open-source and available under the MIT License.