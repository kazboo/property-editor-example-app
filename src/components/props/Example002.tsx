import React, { useState } from "react";
import CloseIcon from "@material-ui/icons/Close";
import { useTheme, Dialog, IconButton, Slide, Button, Divider } from "@material-ui/core";
import Editor, { ControlledEditor } from "@monaco-editor/react";
import _ from "lodash";
import PropsButton from "../btns/PropsButton";

const Transition: any = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

/**
 * https://microsoft.github.io/monaco-editor/api/interfaces/monaco.editor.ieditorconstructionoptions.htm
 */
export default () => {
  const [value, setValue] = useState("");
  const [script, setScript] = useState("");
  const [scriptEditorOpen, setScriptEditorOpen] = useState(false);
  const theme = useTheme();

  const handleScriptEditorClose = () => {
    setScriptEditorOpen(false)
  }
  return (
    <div style={{ color: theme.palette.text.primary, margin: 10 }}>
      Expression
      <ControlledEditor
        language="javascript"
        value={value}
        theme="dark"
        height={100}
        options={{
          // 行数表示
          lineNumbers: "off",
          // acceptSuggestionOnEnter: "off",
          // acceptSuggestionOnCommitCharacter: "off",
          suggestOnTriggerCharacters: "off",
          shareSuggestSelections: false,
          showWords: false,
          minimap: {
            enabled: false
          },
          suggest: {
            maxVisibleSuggestions: 0
          }
        }}
        onChange={(event, value) => {
          if (value) {
            setValue(value);
          }
        }}
      />

      <Divider  />

      Script
      <div>
        <PropsButton variant="contained" onClick={() => setScriptEditorOpen(true)}>
          Edit
        </PropsButton>
      </div>

      {/* Script Editor Dialog */}
      <Dialog
        // fullScreen
        fullWidth
        maxWidth={"xl"}
        open={scriptEditorOpen}
        onClose={handleScriptEditorClose}
        TransitionComponent={Transition}
      >
        {/* <IconButton
          edge="start"
          color="inherit"
          onClick={handleScriptEditorClose}
          aria-label="close"
        >
          <CloseIcon />
        </IconButton> */}
        <div style={{margin: 10, height: "100vh"}}>

        <ControlledEditor
          language="javascript"
          value={script}
          theme="dark"
          height={"85vh"}
          onChange={(event, value) => {
            if (value) {
              setScript(value);
            }
          }}
        />
        </div>
      </Dialog>
    </div>
  );
};
