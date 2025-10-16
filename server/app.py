from flask import Flask
from flask_cors import CORS
import jaclang
from byllm.lib import Model, by

app = Flask(__name__)
CORS(app)
# AIzaSyAVF_mYZeWul5Fn-DcaLIfouqsKGjbHZjU

llm = Model(model_name='gemini/gemini-2.5-flash')

@app.route('/')
def index():
    return '<h1>Welcome to my page!</h1>'

if __name__ == '__main__':
    app.run(port=5555, debug=True)