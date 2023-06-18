from flask_restx import Namespace, Resource, fields

api = Namespace("test", description="Test Endpoint")


@api.route("/")
class Test(Resource):
    def get(self):
        return "Hello World"
