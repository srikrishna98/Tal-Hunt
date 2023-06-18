import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

// const apiResponse = {
//   results: [
//     {
//       interview_id: "1",
//       question: "Write a program that accepts an input string...",
//       hume_response: "{}",
//       coding_feedback: {
//         response:
//           "The candidate's answer of `print('Hello World')` does not address...",
//         scores: "code_quality,correctness,code_formatting\npoor,incorrect,fine",
//         summary:
//           "The candidate's answer, `print('Hello World')`, is unrelated to the problem statement...",
//       },
//       username: "vikrame",
//     },
//   ],
// };

export default function Results(props) {
  const [rows, setRows] = useState([]);
  const [record, setRecord] = useState({});
  const params = useParams();
  useEffect(() => {
    axios
      .get("http://127.0.0.1:8080/scores/coding")
      .then((response) => {
        setRows(response.data.results);
        let currRecord = response?.data?.results?.filter(
          (elem) => elem.interview_id === params.interview_id
        );
        setRecord(currRecord?.[0]);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // const interview = apiResponse.results[0];
  // const question = interview.question;

  console.log(params.interview_id);
  // const feedback = interview.coding_feedback;
  return (
    <>
      <div
        style={{
          //   border: "solid",
          // borderWidth: "2px",
          boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.3)",
          borderRadius: "20px",
          backgroundColor: "white",
          padding: "20px",
          margin: "20px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-around",
        }}
      >
        <h1>Candidate {record?.interview_id}</h1>
        <div>
          <h5>Coding Question:</h5> <p>{record?.question}</p>
        </div>
        <div
          dangerouslySetInnerHTML={{
            __html: `<h5>Coding Feedback:</h5> ${record?.coding_feedback?.response}<br/>`,
          }}
        />
        <div
          dangerouslySetInnerHTML={{
            __html: `<h5> Summary: </h5> ${record?.coding_feedback?.summary}<br/>`,
          }}
        />
        <div
          dangerouslySetInnerHTML={{
            __html: `<h5>Scores: </h5> ${record?.coding_feedback?.scores} <br/>`,
          }}
        />
      </div>
    </>
  );
}
