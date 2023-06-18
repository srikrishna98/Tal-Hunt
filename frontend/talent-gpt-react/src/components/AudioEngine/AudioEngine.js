import React, { useEffect, useState } from "react";
import { Container } from "reactstrap";
import "./AudioEngine.css";
import {
  SpeechConfig,
  AudioConfig,
  SpeechRecognizer,
  ResultReason,
  NoMatchReason,
  NoMatchDetails,
} from "microsoft-cognitiveservices-speech-sdk";
import Card from "react-bootstrap/Card";
export default function AudioEngine(props) {
  const {
    isRecording,
    initialAudioStart,
    setInitialAudioStart,
    initialTranscript,
    setAudioTranscript
  } = props;
  const [displayText, setDisplayText] = useState(initialTranscript);

  useEffect(() => {
    setAudioTranscript(displayText);
  },[displayText]);
  
  const [speech, setSpeech] = useState({
    subscriptionKey: "1f830dffbe6f4a4f8a7dd5c0bfd04acd",
    region: "westus",
    speechConfig: null,
    audioConfig: null,
    recognizer: null,
    finalText: "",
    transcription: "",
    register: () => {
      console.log("Starting", displayText);
      speech.speechConfig = SpeechConfig.fromSubscription(
        speech.subscriptionKey,
        speech.region
      );
      speech.audioConfig = AudioConfig.fromDefaultMicrophoneInput();
      speech.recognizer = new SpeechRecognizer(
        speech.speechConfig,
        speech.audioConfig
      );
    },
    rec: () => {
      speech.recognizer.recognized = speech.done;
      speech.recognizer.recognizing = speech.recognizing;
      speech.recognizer.startContinuousRecognitionAsync();
      console.log("Recording...");
    },
    done: (s, e) => {
      console.log("s", s, e);

      if (e.result.reason === ResultReason.NoMatch) {
        const noMatchDetail = NoMatchDetails.fromResult(e.result);
        console.log(
          "DDD (recognized)  Reason: " +
            ResultReason[e.result.reason] +
            " | NoMatchReason: " +
            NoMatchReason[noMatchDetail.reason]
        );
      } else {
        console.log(
          `PPP (recognized)  Reason: ${
            ResultReason[e.result.reason]
          } | Duration: ${e.result.duration} | Offset: ${e.result.offset}`
        );
        console.log(`Text: ${e.result.text}`);
        console.log("prev state", displayText);
        speech.finalText += " " + e.result.text;
        //   setDisplayText((displayText) => displayText + " " + e.result.text);
      }
    },
    recognizing: (s, e) => {
      console.log(`BBB: ${e.result.text}`);
    },
    recognized: (s, e) => {
      if (e.result.reason == ResultReason.RecognizedSpeech) {
        console.log(`RECOGNIZED: Text=${e.result.text}`);
        let newState = displayText + e.result.text;
        setDisplayText(newState);
      } else if (e.result.reason == ResultReason.NoMatch) {
        console.log("NOMATCH: Speech could not be recognized.");
      }
    },
    stop: () => {
      speech.recognizer.stopContinuousRecognitionAsync((r) => {
        setDisplayText(displayText + " " + speech.finalText);
        console.log(displayText + " " + speech.finalText);
        console.log(`TTT: stopped | ${r}`);
      });
    },
  });

  useEffect(() => {
    speech.register();
  }, []);

  useEffect(() => {
    if (isRecording === true) {
      speech.rec();
      setInitialAudioStart(false);
    } else if (isRecording === false && !initialAudioStart) {
      speech.stop();
    }
  }, [isRecording]);

  return (
    <>

      {!isRecording && !initialAudioStart && (
        <div style={{marginTop:"10px", display: "flex",
        flexDirection: "column",
        justifyContent: "space-around"}}>
          {/* <h5>
            Your Speech Transcript
          </h5> */}
          <p style={{ wordWrap: 'break-word', background: 'None', height: "150px", overflow: "auto"}}>{displayText}</p>
        </div>
      )}
    </>
  );
}
