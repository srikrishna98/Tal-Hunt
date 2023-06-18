import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useState, useEffect } from "react";
import axios from "axios";

const columns = [
  { field: "interview_id", headerName: "Candidate ID", width: 270 },
  { field: "username", headerName: "Candidate name", width: 270 },
  {
    field: "link",
    headerName: "Download Report",
    width: 270,
    renderCell: (params) => (
      <a
        href={`link/${params.row.interview_id}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        {"Click here to view the report"}
      </a>
    ),
  },
];

export default function DataTable() {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8080/scores/coding")
      .then((response) => {
        setRows(response.data.results);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div style={{ height: "100%", width: "100%", background: "white" }}>
      <DataGrid
        getRowId={(row) => row.interview_id}
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 12 },
          },
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
      />
    </div>
  );
}
