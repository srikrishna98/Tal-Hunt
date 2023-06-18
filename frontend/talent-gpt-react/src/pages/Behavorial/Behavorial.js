import "./Behavorial.css";
import interviewer from "../../assets/interviewer.jpg";
import record from "../../assets/record.png";
import recording from "../../assets/recording.json";
import Lottie from "lottie-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import VideoCam from "../../components/VideoCam/VideoCam";
import AudioEngine from "../../components/AudioEngine/AudioEngine";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export default function Behaviorial() {
  const [isRecording, setIsRecording] = useState(false);
  const [initialVideoRender, setInitialVideoRender] = useState(true);
  const [audioTranscript, setAudioTranscript] = useState([]);
  const [question, setQuestion] = useState("");
  const [videoData, setVideoData] = useState(null);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8080/generate/behavequestion")
      .then((response) => {
        let qn = JSON.stringify(response.data.question);
        setQuestion(qn);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const submitAudioRecording = () => {
    // console.log(audioTranscript)
    let tempString = audioTranscript;
    axios
      .post("http://127.0.0.1:8080/generate/behavequestion", {
        answer: tempString,
        question: question,
      })
      .then((response) => {
        console.log(JSON.stringify(response.data));
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      <div>
        <div id="app">
          <div
            className="dev"
            style={{
              display: "flex",
              justifyContent: "space-around",
              height: "80vh",
            }}
          >
            <div
              style={{
                //   border: "solid",
                // borderWidth: "2px",
                // borderRadius: "20px",
                padding: "20px",
                // backgroundColor: "white",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-around",
                width: "25%",
              }}
            >
              <img
                src={interviewer}
                style={{
                  height: "300px",
                  width: "380px",
                  borderRadius: "15px",
                }}
                alt="Interviewer bot face"
              />
              <p style={{ wordWrap: "break-word", height: "150px" }}>
                {question}{" "}
              </p>
            </div>
            <div
              style={{
                //   border: "solid",
                // borderWidth: "2px",
                // borderRadius: "20px",
                padding: "20px",
                marginTop: "30px",
                // backgroundColor: "white",
                // display: "flex",
                // flexDirection: "column",
                // justifyContent: "space-around",
                width: "25%",
              }}
            >
              <VideoCam
                style={{ height: "400px" }}
                isRecording={isRecording}
                initialVideoRender={initialVideoRender}
                setInitialVideoRender={setInitialVideoRender}
                setVideoData={setVideoData}
              />
              <Container>
                <Row className="justify-content-md-center">
                  <Col xs lg="2">
                    {!isRecording ? (
                      initialVideoRender && (
                        <img
                          src={record}
                          style={{ height: "100px" }}
                          alt="Record"
                          onClick={() => setIsRecording(true)}
                        />
                      )
                    ) : (
                      <Lottie
                        animationData={recording}
                        loop={true}
                        style={{ height: "100px", width: "100px" }}
                        onClick={() => setIsRecording(false)}
                      />
                    )}
                  </Col>
                </Row>
                <Row className="justify-content-md-center">
                  <AudioEngine
                    isRecording={isRecording}
                    initialAudioStart={initialVideoRender}
                    setInitialAudioStart={setInitialVideoRender}
                    initialTranscript={""}
                    setAudioTranscript={setAudioTranscript}
                  />
                  {!isRecording && !initialVideoRender && (
                    // <Col xs lg="2">
                    <Link to="/coding">
                      <Button
                        variant="success"
                        style={{
                          backgroundColor: "#265284",
                          color: "white",
                          border: "none",
                          padding: "10px 20px",
                          borderRadius: "5px",
                          cursor: "pointer",
                        }}
                      >
                        Submit
                      </Button>
                    </Link>
                    // </Col>
                  )}
                </Row>
              </Container>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
