import React, {useState} from "react";
import Editor from '@monaco-editor/react';
import Container from 'react-bootstrap/Container';

const CodinWindow = ({ onChange, language, code, theme, setCode }) => {
    const [value, setValue] = useState(code);
  
    const handleEditorChange = (value) => {
      setValue(value);
      setCode(value);
    };
  


    return (
        <Editor
          height="75vh"
          language={"javascript"}
          value={value}
          theme={"solarized-dark"}
          defaultValue="// some comment"
          onChange={handleEditorChange}
          style={{borderRadius:"10px"}}
        />
      
    );
  };
  export default CodinWindow;