import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import * as ITF from "../../interface/user";
import { connect } from "react-redux";
import { register } from "../../actions/auth";
import { withRouter, RouteComponentProps } from "react-router-dom";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Jessica
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

interface AuthProps {
  register: (dataUser: ITF.User, callback?: () => void) => void
}

const SignUp = (props: AuthProps & RouteComponentProps) => {
  const classes = useStyles();
  const [dataUser, setDataUser] = React.useState({
    email: "",
    password: "",
    password2: "",
    phone: "",
    fullName: "",
  })

  const onSubmit = (e: any) => {
    e.preventDefault();
    props.register(dataUser, () => { props.history.push("/signin") });
  }

  const handleChange = (e: any) => {
    const { name, value } = e.target
    setDataUser(prevState => ({ ...prevState, [name]: value }))
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={dataUser.email}
            onChange={handleChange}
          />

          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="fullName"
            label="Full Name"
            name="fullName"
            autoComplete="fullName"
            value={dataUser.fullName}
            onChange={handleChange}
          />

          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="phone"
            label="Phone"
            name="phone"
            autoComplete="phone"
            value={dataUser.phone}
            onChange={handleChange}
          />

          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            value={dataUser.password}
            autoComplete="current-password"
            onChange={handleChange}
          />

          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password2"
            label="Confirm password"
            type="password"
            id="password2"
            value={dataUser.password2}
            autoComplete="current-password"
            onChange={handleChange}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={onSubmit}
          >
            Sign Up
          </Button>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}

export default connect(null, { register })(withRouter(SignUp));