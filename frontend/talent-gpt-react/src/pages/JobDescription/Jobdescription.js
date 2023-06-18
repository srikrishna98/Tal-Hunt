import { Link } from 'react-router-dom';


export default function Jobdescription() {
  return (
    <>
      
      <div
        className="div"
        style={{
          display: "flex",
          justifyContent: "space-around",
          margin: "20px",
        }}
      >
          <div style={{
          boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.3)",
          borderRadius: "20px",
          padding: "20px",
          backgroundColor: "white",
        }}>
          <h3>Job Description: Software Engineer I</h3>
            <h2>Company XYZ</h2>

            <h3>Responsibilities:</h3>
            <ul>
                <li>
                    Design, develop, and implement software applications following coding standards and best practices.
                </li>
                <li>
                    Gather requirements and translate them into technical specifications.
                </li>
                <li>
                    Write clean, efficient, and maintainable code using various programming languages and frameworks.
                </li>
                <li>
                    Conduct thorough testing and debugging to ensure high-quality deliverables.
                </li>
                <li>
                    Analyze and optimize application performance, resolving bottlenecks and issues.
                </li>
                <li>
                    Collaborate with the team to troubleshoot and resolve defects and production issues.
                </li>
                <li>
                    Stay up-to-date with industry trends and technologies for process improvement.
                </li>
                <li>
                    Contribute to software documentation, including designs, specifications, and user manuals.
                </li>
                <li>
                    Work in an Agile/Scrum environment, participating in planning and stand-up meetings.
                </li>
            </ul>

            <h3>Requirements:</h3>
            <ul>
                <li>
                    Bachelor's degree in Computer Science or related field (or equivalent work experience).
                </li>
                <li>
                    Strong foundation in computer science fundamentals, data structures, and algorithms.
                </li>
                <li>
                    Proficiency in one or more programming languages such as Java, C++, Python, or JavaScript.
                </li>
                <li>
                    Familiarity with Agile/Scrum, version control systems, and web technologies (HTML, CSS, JavaScript).
                </li>
                <li>Strong problem-solving and analytical skills.</li>
                <li>Excellent communication and teamwork abilities.</li>
                <li>Experience with software testing and debugging is a plus.</li>
                <li>
                    Knowledge of cloud platforms and microservices architecture is a plus.
                </li>
            </ul>

            <p>
                Join Company XYZ to be part of an innovative and inclusive work environment. As a Software Engineer I, <br></br> you'll contribute to exciting projects, learn new technologies, and make a meaningful impact on our products and customers.
            </p>
          </div>
          <div style={{
           boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.3)",
           borderRadius: "20px",
          padding: "20px",
          backgroundColor: "white",
        }}><h3>Upload your resume:</h3><form style={{display: "flex", flexDirection: "column",
        justifyContent: "space-around",backgroundColor: "white",}}>
          
        <label for="document">Select a document to upload:</label>
        <input type="file" id="document" name="document" />
        <label for="name">Email:</label>
        <input type="text" id="name" name="name" />
        <label for="email">Contact Number:</label>
        <input type="email" id="email" name="email" /> <br></br>

        <Link to="/behavorial"><input type="submit" style={{backgroundColor: "#265284",
    color: 'white',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '5px',
    cursor: 'pointer',}}value="Start Interview" /></Link>
    </form></div>
          
          
        </div>
    </>
  );
}
