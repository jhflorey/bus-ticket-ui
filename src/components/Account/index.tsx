import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

import FaceIcon from "@material-ui/icons/Face";
import { connect } from "react-redux";
import _ from "lodash";

import { changeUserData, changePassword } from "../../actions/auth";

interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <React.Fragment>
          {children}
        </React.Fragment>
      )}
    </div>
  );
}

function a11yProps(index: any) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    border: '1px solid rgba(0,0,0,0.52)',
    borderRadius: '10px',
    padding: '20px',
    minHeight: '150px',
    maxHeight: '600px',
  },
}));

const Account = (props: any) => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const [dataUser, setDataUser] = React.useState({
    fullName: "",
    phone: "",
  })

  const [dataPassword, setDataPassword] = React.useState({
    password: "",
    newPassword: "",
  })

  React.useEffect(() => {
    setDataUser((prevState) => ({
      ...prevState,
      fullName: _.get(props, "userInformation.fullName", ""),
      phone: _.get(props, "userInformation.phone", ""),
    }))
  }, [props.userInformation]) // eslint-disable-line

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  const handleChangeInput = (e: any) => {
    const { name, value } = e.target;
    setDataUser((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  const handleChangePassword = (e: any) => {
    const { name, value } = e.target;
    setDataPassword((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  const onSave = () => {
    const changeUserData = _.get(props, "changeUserData", _.identity);
    changeUserData(dataUser, _.get(props, "userInformation.userId", ""))
  }

  const onSaveNewPassword = () => {
    const changePassword = _.get(props, "changePassword", _.identity);
    changePassword(dataPassword, _.get(props, "userInformation.userId", ""))
  }

  return (
    <Container maxWidth="md" className="py-2">
      <div className={classes.root}>
        <AppBar position="static" color="inherit" className="second-navbar">
          <Tabs
            value={value} onChange={handleChange}
            indicatorColor="primary"
            textColor="primary"
            aria-label="General"
          >
            <Tab label="General" {...a11yProps(0)} />
            <Tab label="Security" {...a11yProps(1)} />
          </Tabs>
        </AppBar>
        <Grid container spacing={3} className="mt-1">
          <Grid item xs={4}>
            <div className="circle-avatar">
              <FaceIcon />
              <Typography variant="body1" gutterBottom>
                {_.get(props, "userInformation.fullName", "")}
              </Typography>
            </div>
          </Grid>
          <Grid item xs={8}>
            <TabPanel value={value} index={0}>
              <form noValidate autoComplete="off" style={{ padding: '10px' }}>
                <div className="w-100">
                  <TextField id="outlined-basic1"
                    label="Full name" variant="outlined" className="mb-1 w-100" name="fullName"
                    value={dataUser.fullName} onChange={handleChangeInput} />
                </div>
                <div className="w-100">
                  <TextField id="outlined-basic2"
                    label="Phone" variant="outlined" className="w-100 mb-1" name="phone"
                    value={dataUser.phone} onChange={handleChangeInput} />
                </div>
                <Button color="primary" onClick={onSave}>Save</Button>
              </form>
            </TabPanel>
            <TabPanel value={value} index={1}>
              <form noValidate autoComplete="off" style={{ padding: '10px' }}>
                <div className="w-100">
                  <TextField id="outlined-basic3"
                    label="Old password" variant="outlined" className="mb-1 w-100" name="password"
                    type="password"
                    onChange={handleChangePassword} />
                </div>
                <div className="w-100">
                  <TextField id="outlined-basic4"
                    label="New password" variant="outlined" className="w-100 mb-1" name="newPassword"
                    type="password"
                    onChange={handleChangePassword} />
                </div>
                <Button color="primary" onClick={onSaveNewPassword}>Save</Button>
              </form>
            </TabPanel>
          </Grid>
        </Grid>
      </div>
    </Container>
  );
}

const mapStateToProps = (state: any) => {
  return { userInformation: state.userInformation }
}

export default connect(mapStateToProps, { changeUserData, changePassword })(Account);