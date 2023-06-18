
import { Link } from 'react-router-dom';

export default function EndInterview() {
    return (
        <>
        <div className="div" style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              padding: "10px",
              alignItems: "center",
              height: '70vh'
            }}>
<h1>Congratulations!</h1>
<h3>You have completed the interview!</h3>
<Link to="/"><button style={{backgroundColor: "#265284",
    color: 'white',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '5px',
    cursor: 'pointer',
    width: '100%'}}>Back Home</button></Link>
</div>
</>

);
}