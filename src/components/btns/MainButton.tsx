import { Button, withStyles } from "@material-ui/core";
import { purple } from "@material-ui/core/colors";

export default withStyles(theme => ({
  root: {
    color: theme.palette.getContrastText(purple[500]),
    backgroundColor: purple[500],
    "&:hover": {
      backgroundColor: purple[700]
    }
  }
}))(Button);
