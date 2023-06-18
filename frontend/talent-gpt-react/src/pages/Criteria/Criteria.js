import { Link } from 'react-router-dom';


export default function Criteria() {
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
            border: "solid",
          borderWidth: "2px",
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
            border: "solid",
          borderWidth: "2px",
          borderRadius: "20px",
          padding: "20px",
          backgroundColor: "white",
        }}><h3>Evaluation Criteria:</h3><form style={{display: "flex", flexDirection: "column",
        justifyContent: "space-around",backgroundColor: "white",}}>
          
        <label for="document">From the job description, we identified the</label>
        <h4>Skills</h4>
        <ul>
        <li>Programming</li>
  <li>Communication</li>
  <li>Problem Solving</li>
  <li><label for="name">Add more:</label>
        <input type="text" id="name" name="name" /></li>
</ul>
<h4>Values</h4>
        <ul>
  <li>Collaboration</li>
  <li>Continuous Learning</li>
  <li>Integrity</li>
  <li><label for="name">Add more:</label>
        <input type="text" id="name" name="name" /></li>
</ul>
        
        <div style={{
          alignItems: "center",
        }}>
        <Link to="/candidates"><input type="submit" value="Confirm" /></Link>
        </div>
    </form></div>
          
          
        </div>
    </>
  );
}
