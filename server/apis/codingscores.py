from flask_restx import Namespace, Resource
from flask import request
import json
from .sqlalchemy_engine import cursor, cnxn

api = Namespace("scores", description="Test Endpoint")


@api.route("/coding")
class CodingScores(Resource):
    def get(self):
        cursor.execute("SELECT * FROM coding_stats")
        res = []
        row = cursor.fetchone()
        while row:
            res.append({
                "interview_id": row[0],
                "question": row[1],
                "hume_response": row[2],
                "coding_feedback": json.loads(row[3]),
                "username": row[4]
            })
            row = cursor.fetchone()
        return {"results": res}
