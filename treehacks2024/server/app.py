from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)


@app.route('/')
def hello_world():
    return 'Hello, World!'

@app.route('/api/items')
def items():
  '''Sample API route for data'''
  return jsonify([{'title': 'A'}, {'title': 'B'}])

if __name__ == '__main__':
    app.run(debug=True)