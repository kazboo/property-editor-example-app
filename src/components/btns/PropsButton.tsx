import { Button, withStyles } from "@material-ui/core";
import { teal } from "@material-ui/core/colors";

export default withStyles(theme => ({
  root: {
    color: theme.palette.getContrastText(teal[500]),
    backgroundColor: teal[500],
    "&:hover": {
      backgroundColor: teal[700]
    }
  }
}))(Button);
