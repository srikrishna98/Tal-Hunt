import DataTable from "../../components/DataTable/DataTable";
import { Link } from 'react-router-dom';
export default function CandidateList() {
    return (
        <>
        <div style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "10px",
            }}>
<h3>Role: Software Engineer I</h3>
<Link to="/criteria"><button style={{backgroundColor: "#265284",
    color: 'white',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '5px',
    cursor: 'pointer',
    width: '100%'}}>Edit Evaluation Criteria</button></Link>
</div>
<DataTable/>
</>

);
}