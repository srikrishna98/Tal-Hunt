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
storageAccountKey = "#StorageAccountKey"
storageAccountName = "#StorageAccountName"
connection_string = "#ConnectionString"
container_name = "#Container_name"


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
            "#HUME_API_KEY")
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
