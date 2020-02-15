import React, { useState } from "react";
import Example001 from "./components/props/Example001";
import { ThemeProvider, createMuiTheme, Button } from "@material-ui/core";
import { teal, purple, blue } from "@material-ui/core/colors";

const mainTheme = createMuiTheme({
  palette: {
    primary: {
      main: blue[500]
    }
  }
});

const contentTheme = createMuiTheme({
  palette: {
    primary: {
      main: purple[500]
    }
  }
});

const propsEditorTheme = createMuiTheme({
  palette: {
    primary: {
      main: teal[500]
    },
    background: {
      default: "#333",
      paper: "#333"
    },
    text: {
      primary: "#fff",
      secondary: "#fff",
      hint: "#fff"
    }
  }
});

const App = () => {
  const [editorType, setEditorType] = useState("");

  return (
    <div style={{ overflow: "hidden" }}>
      <ThemeProvider theme={mainTheme} key={"main"}>
        <div style={{ height: "100vh" }}>
          <ThemeProvider theme={contentTheme} key={"main"}>
            <Button
              onClick={event => setEditorType("example001")}
              variant="contained"
              color="primary"
            >
              example001
            </Button>
          </ThemeProvider>
        </div>

        <div
          style={{
            width: 300,
            background: propsEditorTheme.palette.background.default,
            position: "absolute",
            height: "100%",
            overflowY: "auto",
            top: 0,
            right: 0
          }}
        >
          <ThemeProvider theme={propsEditorTheme} key={"props_edit"}>
            {editorType === "example001" && <Example001 />}
          </ThemeProvider>
        </div>
      </ThemeProvider>
    </div>
  );
};

export default App;
