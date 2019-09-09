import React, {useState, useContext} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {  AuthContext } from '../context/Authcontext'

function Copyright() {
    return (
      <Typography variant="body2" color="textSecondary" align="center">
        {"Copyright © "}
        <Link
          color="inherit"
          href="http://skp-suomenkuvapalvelu.s3-website-eu-west-1.amazonaws.com/"
        >
          Suomen Kuvapalvelu
        </Link>{" "}
        {new Date().getFullYear()}
        {". Built with "}
        <Link color="inherit" href="https://material-ui.com/">
          Material-UI.
        </Link>
      </Typography>
    );
}

const useStyles = makeStyles(theme => ({
    '@global': {
        body: {
            backgroundColor: theme.palette.common.white,
        },
    },
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
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export default function SignUp(props) {
    const classes = useStyles();
    /* const modalContext = useContext(ModaloContext) */
    const test = useContext(AuthContext)
    const [values, setValues] = useState({
        username: '',
        email: '',
        password: '',
        errors: ''
    })

    const handleChange = name => e => {
        setValues({ ...values, [name]: e.target.value, errors: "" })
        
        console.log(values)
    }

    const createUser = e => {
        e.preventDefault();
        test.signUp(values)
        .then(res => test.logIn(values.username, values.password))
        .then(props.closeSignupModal)
             .catch(
                err => {
                     console.log(err)
                     console.log(values)
                    setValues({...values, errors: String(err)})
                }
            )
        
        /* return new Promise((resolve, reject) => {
            test.signUp(values)
         }) */
    }
    console.log(props)
    console.log(props.context)

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign up
        </Typography>
                <form className={classes.form} noValidate onSubmit={createUser}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                autoComplete="fname"
                                name="firstName"
                                variant="outlined"
                                required
                                fullWidth
                                id="username"
                                label="Username"
                                value={values.username}
                                onChange={handleChange('username')}
                                error={values.errors}
                                helperText={values.errors}
                                autoFocus
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                value={values.email}
                                onChange={handleChange('email')}
                                autoComplete="email"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                value={values.password}
                                onChange={handleChange('password')}
                                autoComplete="current-password"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FormControlLabel
                                control={<Checkbox value="allowExtraEmails" color="primary" />}
                                label="I want to receive inspiration, marketing promotions and updates via email."
                            />
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={createUser}
                        
                    >
                        Sign Up
          </Button>
                    <Grid container justify="flex-end">
                        <Grid item>
                            <Link href="#" variant="body2">
                                Already have an account? Sign in
              </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
            <Box mt={5}>
                <Copyright />
            </Box>
        </Container>
    );
}

SignUp.contextType = AuthContext;
/* SignUp.contextType = ModaloContext; */