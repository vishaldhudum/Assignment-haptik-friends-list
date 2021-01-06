import React from 'react';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Slide from '@material-ui/core/Slide';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDialog(props) {

  return (
    <Dialog
      open={props.open}
      TransitionComponent={Transition}
      keepMounted
      onClose={props.toggleDialoge}
    >
      <DialogContent>
        <DialogContentText>
          {props.dialogeMessage}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        {
          props.showCancel
            ? <React.Fragment>
              <Button
                color="primary"
                onClick={props.handleOk}
              >
                Ok
              </Button>
              <Button
                color="secondary"
                onClick={props.toggleDialoge}
              >
                Cancel
              </Button>
            </React.Fragment>
            : <Button
              color="primary"
              onClick={props.toggleDialoge}
            >
              Ok
            </Button>
        }
      </DialogActions>
    </Dialog>
  );
}