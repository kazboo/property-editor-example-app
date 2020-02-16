import React, { useState } from "react";
import clsx from "clsx";
import Example001 from "./components/props/Example001";
import {
  ThemeProvider,
  createMuiTheme,
  Button,
  makeStyles,
  Drawer,
  withStyles
} from "@material-ui/core";
import { teal, purple, blue } from "@material-ui/core/colors";
import Example002 from "./components/props/Example002";
import MainButton from "./components/btns/MainButton";


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

const drawerWidth = 300;
const useStyles = makeStyles(theme => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth
  },
  content: {
    flexGrow: 1,
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    marginRight: -drawerWidth
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    }),
    marginRight: 0
  }
}));

const App = () => {
  const [editorType, setEditorType] = useState("");
  const classes = useStyles();

  return (
    <div style={{ overflow: "hidden" }}>
        <div
          className={clsx(classes.content, {
            [classes.contentShift]: editorType ? true : false
          })}
          style={{ height: "100vh" }}
          onClick={event => setEditorType("")}
        >
            <MainButton
              onClick={event => {
                setEditorType("example001");
                event.stopPropagation();
              }}
              variant="contained"
              color="primary"
            >
              example001
            </MainButton>
            <MainButton
              onClick={event => {
                setEditorType("example002");
                event.stopPropagation();
              }}
              variant="contained"
              color="primary"
            >
              example002
            </MainButton>
        </div>

        <Drawer
          className={classes.drawer}
          variant="persistent"
          anchor="right"
          open={editorType ? true : false}
          classes={{
            paper: classes.drawerPaper
          }}
        >
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
              {editorType === "example002" && <Example002 />}
            </ThemeProvider>
          </div>
        </Drawer>
    </div>
  );
};

export default App;
