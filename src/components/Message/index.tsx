import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import { connect } from "react-redux";
import { toggleSnackbar } from "../../actions/main";

interface MessageProps {
  snackbarStatus: any,
  toggleSnackbar: (value: boolean, message: string) => void
}

const Message = (props: MessageProps) => {

  const handleClose = () => {
    props.toggleSnackbar(false, "");
  };

  return (
    <React.Fragment>
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        key={`bottom,center`}
        open={props.snackbarStatus.openSnackbar}
        onClose={handleClose}
        message={props.snackbarStatus.message}
      />
    </React.Fragment>
  );
}

const mapStateToProps = (state: any) => {
  return { snackbarStatus: state.main.snackbarStatus }
}

export default connect(mapStateToProps, { toggleSnackbar })(Message);