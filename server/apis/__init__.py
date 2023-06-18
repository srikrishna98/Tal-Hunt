from flask_restx import Api

from .test import api as test_api
from .question import api as question_api
from .domainspecificquestion import api as domain_question_api
from .codingscores import api as coding_score_api
from .videoupload import api as videoupload_api
from .behave import api as behave_question_api

api = Api(
    title="TalentGPT",
    version="1.0",
    description="Lorem Ipsum",
)

api.add_namespace(test_api)
api.add_namespace(question_api)
api.add_namespace(domain_question_api)
api.add_namespace(coding_score_api)
api.add_namespace(videoupload_api)
api.add_namespace(behave_question_api)
