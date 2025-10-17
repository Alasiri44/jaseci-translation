from flask import Flask, request, make_response
from flask_cors import CORS
import jaclang
from byllm import Model, by
from dotenv import load_dotenv
import os

load_dotenv()  

GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "https://universal-translator-fx40.onrender.com"}})

llm = Model(model_name='gemini/gemini-2.0-flash')

@by(llm)
def translate(source_language: str, target_language: str,  text: str) -> str: ...

@app.route('/')
def index():
    output = translate(source_language="English", target_language="French", text="Hello world")
    return f'<h1>{output}</h1>'

@app.route('/translate', methods=['POST'])
def handle_translation():
    if request.method == 'POST':
        data = request.get_json()
        response = translate(source_language=data.get('source_language'), target_language=data.get('target_language'), text=data.get('text'))
        return make_response({'translated_text': response})

if __name__ == '__main__':
    app.run(port=5555, debug=True)