import CodinWindow from "../../components/CodinWindow/CodinWindow";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import { useState, useEffect } from "react";

import Typography from "@mui/material/Typography/Typography";
import record from "../../assets/record.png";
import recording from "../../assets/recording.json";
import Lottie from "lottie-react";
import HashLoader from "react-spinners/HashLoader";
import { Link } from "react-router-dom";

import axios from "axios";

import VideoCam from "../../components/VideoCam/VideoCam";
import AudioEngine from "../../components/AudioEngine/AudioEngine";

export default function Coding() {
  const [isRecording, setIsRecording] = useState(false);
  const [initialVideoRender, setInitialVideoRender] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [question, setQuestion] = useState("loading...");
  const [audioTranscript, setAudioTranscript] = useState([]);
  const [videoData, setVideoData] = useState(null);
  const [code, setCode] = useState("");

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8080/generate/codingquestion")
      .then((response) => {
        let question = JSON.stringify(response.data.question);
        setQuestion(question);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const submitCode = () => {
    let d = new Date();
    // let data = new FormData();
    // let file = new File([videoData.blob], "rec.mp4");
    // data.append("file", file, "rec.mp4");
    // data.append("candidateName", "Srini");
    // data.append("round", "1" + d.getSeconds());

    axios
      .post("http://127.0.0.1:8080/generate/codingquestion", {
        answer: code,
        interview_id: d.getTime(),
        question: question,
      })
      .then((response) => {
        console.log(JSON.stringify(response.data));
      })
      .catch((err) => {
        console.log(err);
      });
    // axios
    //   .post("http://127.0.0.1:8080/upload/video", data, {
    //     headers: {
    //       "Content-Type": "multipart/form-data",
    //     },
    //   })
    //   .then((response) => {
    //     console.log(JSON.stringify(response.data));
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  };

  return (
    <Container>
      <Row style={{ marginTop: "40px" }}>
        <Col lg="6">
          <Row>
            <Card>
              <Card.Body style={{ overflow: "scroll" }}>
                {question === "loading..." ? (
                  <HashLoader color="#10a37f" />
                ) : (
                  question
                )}
              </Card.Body>
            </Card>
          </Row>
          <Row className="align-items-center justify-content-center">
            {
              <Col>
                <VideoCam
                  style={{ height: "250px" }}
                  isRecording={isRecording}
                  initialVideoRender={initialVideoRender}
                  setInitialVideoRender={setInitialVideoRender}
                  setVideoData={setVideoData}
                />
              </Col>
            }
            {!isRecording ? (
              initialVideoRender && (
                <Col onClick={() => setIsRecording(true)}>
                  <img src={record} style={{ height: "100px" }} alt="Record" />{" "}
                </Col>
              )
            ) : (
              <Col>
                <Lottie
                  animationData={recording}
                  loop={true}
                  style={{ height: "100px", width: "100px" }}
                  onClick={() => setIsRecording(false)}
                />
              </Col>
            )}

            <Col>
              <AudioEngine
                isRecording={isRecording}
                initialAudioStart={initialVideoRender}
                setInitialAudioStart={setInitialVideoRender}
                initialTranscript={""}
                setAudioTranscript={setAudioTranscript}
              />
            </Col>
            {!isRecording && !initialVideoRender && (
              <Col style={{ marginTop: "20px" }}>
                <Link to="/end">
                  <Button variant="success" onClick={() => submitCode()}>
                    Submit
                  </Button>
                </Link>
              </Col>
            )}
          </Row>
        </Col>
        <Col lg="6">
          <CodinWindow setCode={setCode}></CodinWindow>
        </Col>
      </Row>
    </Container>
  );
}
