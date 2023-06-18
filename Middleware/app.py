import os
from flask import Flask, request
from flask_cors import CORS, cross_origin
import logging
import configparser
from azure.storage.blob import BlobServiceClient
import shutil

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger('HELLO WORLD')

UPLOAD_FOLDER = './'
ALLOWED_EXTENSIONS = set(['txt', 'pdf', 'png', 'jpg', 'jpeg', 'gif','mp4','mp3'])

app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
config = configparser.ConfigParser()
config.read('config/app.properties')

storageAccountKey = config.get("azure","storage_account_key")
storageAccountName = config.get("azure","storage_account_name")
connection_string = config.get("azure","connection_string")
container_name = config.get("azure","container_name")


@app.route('/upload', methods=['POST'])
def fileUpload():
    target=os.path.join(UPLOAD_FOLDER,'server_docs')
    logger.info("welcome to upload`")
    file = request.files['file'] 
    candidateName = request.form["candidateName"]
    round = request.form["round"]
    filename = candidateName + round + ".mp4"
    destination="/".join([target, filename])
    file.save(destination)
    filePath = "server_docs/"+filename
    uploadToBlobStorage(filePath,filename)
    shutil.rmtree('server_docs')
    response="File successfully uploaded to server"
    return response


def uploadToBlobStorage(filePath,filename):
    blobServiceClient = BlobServiceClient.from_connection_string(connection_string)
    blobClient = blobServiceClient.get_blob_client(container = container_name, blob = filename)
    with open(filePath,"rb") as data:
        blobClient.upload_blob(data)
    logger.info("File Uploaded to Azure")

if __name__ == "__main__":
    app.secret_key = os.urandom(24)
    app.run(debug=True,host="0.0.0.0",use_reloader=False)
    flask_cors.CORS(app, expose_headers='Authorization')