from flask import Flask
from apis import api
from flask_cors import CORS

app = Flask(__name__)
cors = CORS(app, resources={
    r"/*": {
        "origins": "*"
    }
})

api.init_app(app)

app.run(debug=True, port=8080)
