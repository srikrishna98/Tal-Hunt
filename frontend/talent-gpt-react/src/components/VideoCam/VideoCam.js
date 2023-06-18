import React, { useRef, useState, useCallback, useEffect } from "react";
import Webcam from "react-webcam";

function VideoCam(props) {
  const webcamRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const { isRecording, initialVideoRender, setInitialVideoRender, setVideoData } = props;
  const [capturing, setCapturing] = useState(false);
  const [recordedChunks, setRecordedChunks] = useState([]);
  

  useEffect(() => {
    if (isRecording === true) {
      handleStartCaptureClick();
      setInitialVideoRender(false);
    } else if (isRecording === false && initialVideoRender === false) {
      handleStopCaptureClick();
    }
  }, [isRecording]);

  const handleStartCaptureClick = () => {
    setCapturing(true);
    mediaRecorderRef.current = new MediaRecorder(webcamRef.current.stream, {
      mimeType: "video/webm",
    });
    mediaRecorderRef.current.addEventListener(
      "dataavailable",
      handleDataAvailable
    );
    mediaRecorderRef.current.start();
  };

  const handleDataAvailable = useCallback(
    ({ data }) => {
      if (data.size > 0) {
        setRecordedChunks((prev) => prev.concat(data));
      }
    },
    [setRecordedChunks]
  );

  const handleStopCaptureClick = () => {
    mediaRecorderRef.current.stop();
    setCapturing(false);
    if (recordedChunks.length) {
      const blob = new Blob(recordedChunks, {
        type: "video/webm",
      });
      setVideoData(blob);
      setRecordedChunks([]);
    }
  };

  const handleDownload = () => {
    if (recordedChunks.length) {
      const blob = new Blob(recordedChunks, {
        type: "video/webm",
      });
      setVideoData(blob);
      setRecordedChunks([]);
    }
  };

  return (
    <>
      <Webcam
        audio={false}
        ref={webcamRef}
        height={300}
        style={{ borderRadius: 25, marginTop:"10px" }}
      />

      {/* {recordedChunks.length > 0 && (
        <button onClick={handleDownload}>Download</button>
      )} */}
    </>
  );
}

export default VideoCam;
