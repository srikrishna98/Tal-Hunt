import os
from flask import request
from flask_restx import Namespace, Resource
from hume import HumeBatchClient
from hume.models.config import FaceConfig
from azure.storage.blob import BlobServiceClient
from .sqlalchemy_engine import cursor, cnxn
import shutil

api = Namespace("upload", description="Test Endpoint")

# UPLOAD_FOLDER = './'
ALLOWED_EXTENSIONS = set(['mp4', 'mp3'])
storageAccountKey = "q5lJY+6eUDWYub+q/7dP6SQCP7Vawhfj1SPcLRA1DO2a4A7hdVa4IBlT0Mwxbn2C1dXVUs7efxxa+ASti0nGSw=="
storageAccountName = "talentgpt"
connection_string = "DefaultEndpointsProtocol=https;AccountName=talentgpt;AccountKey=q5lJY+6eUDWYub+q/7dP6SQCP7Vawhfj1SPcLRA1DO2a4A7hdVa4IBlT0Mwxbn2C1dXVUs7efxxa+ASti0nGSw==;EndpointSuffix=core.windows.net"
container_name = "video-recording"


def uploadToBlobStorage(filePath, filename):
    blobServiceClient = BlobServiceClient.from_connection_string(
        connection_string)
    blobClient = blobServiceClient.get_blob_client(
        container=container_name, blob=filename)
    with open(filePath, "rb") as data:
        blobClient.upload_blob(data)


@api.route("/video")
class VideoUpload(Resource):
    def post(self):
        file = request.files['file']
        candidateName = request.form["candidateName"]
        round = request.form["round"]
        target = os.path.join(os.getcwd(), 'server_docs')
        if not os.path.isdir(target):
            os.makedirs(target)
        filename = f"{candidateName}{round}.mp4"
        file.save(os.path.join(target, filename))
        uploadToBlobStorage(os.path.join(target, filename), filename)
        # shutil.rmtree(target)
        client = HumeBatchClient(
            "OfVIJA7wPGBLoI7YRGELY4rPhMs1I56Z2F8kKfRTgRY0BIDE")
        # urls = ["https://talentgpt.blob.core.windows.net/video-recording/Srini1.mp4"]
        fileURL = [
            f"https://talentgpt.blob.core.windows.net/video-recording/{filename}"]
        print(fileURL)
        config = FaceConfig()
        job = client.submit_job(fileURL, [config])
        print(f"Job created: {job} {type(job)}")
        count = cursor.execute("""INSERT INTO dbStatus VALUES (?, ?, ?, ?, ?)""",
                               job.id, "SRIKI", filename, job.id, "PENDING")
        cnxn.commit()
        return {"message": "File successfully uploaded to server"}
