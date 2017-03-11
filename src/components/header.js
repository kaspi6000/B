import React from 'react';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import Subheader from 'material-ui/Subheader';
import Avatar from 'material-ui/Avatar';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import { Router, Route, browserHistory, IndexRoute, Link } from 'react-router';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';

/*svg-icons*/
import CommunicationChatBubble from 'material-ui/svg-icons/communication/chat-bubble';
import SocialPersonadd from 'material-ui/svg-icons/social/person-add';
import SocialPerson from 'material-ui/svg-icons/social/person';
import ActionGrade from 'material-ui/svg-icons/action/grade';
import NavigationMenu from 'material-ui/svg-icons/navigation/menu';

import Button from './button';

import { connect } from 'react-redux';
import { loginRequest } from '../actions/authentication';

class Header extends React.Component{

    constructor(props){

        super(props);

        this.state = {

            open : false,
            userid : "",
            password : "",
            error : "",

        };

        this.handleToggle = this.handleToggle.bind(this);
        this.handleClose  = this.handleClose.bind(this);
        this.onClickValue = this.onClickValue.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
    }

    handleToggle(){

        this.setState({

            open : !this.state.open

        });
    }

    handleClose(){

        this.setState({

            open : false

        });
    }

    onClickValue ( ) {

        let newId = this.state.userid;
        let newPw = this.state.password;

        console.log( newId, newPw );
    }

    handleChange (e) {

        let nextState = {};

        nextState[e.target.name] = e.target.value;

        this.setState(nextState);

        console.log(nextState);
    }

    handleLogin() {
        let id = this.state.userid;
        let pw = this.state.password;

        this.props.onLogin(id, pw).then(
            (success) => {
                if(!success) {
                    this.setState({
                        password: ''
                    });
                }
            }
        );
    }

    render(){

        const AppBarBabble = (
            <AppBar
                title = "babble"
                iconClassNameRight="muidocs-icon-navigation-expand-more"
                style = {{textAlign : 'center', marginBottom : 40, textTransform : 'uppercase', padding : '6px 6px 6px 6px', position : 'fixed'}}
                onTouchTap = {this.handleToggle}
            />
        );

        const inputText = (
            <div>
                <TextField
                    style = {{display : 'block'}}
                    className = "validate"
                    floatingLabelText = "User-ID"
                    name = "userid"
                    value = {this.state.userid}
                    onChange = { this.handleChange }
                    errorText = { this.state.error }
                    type = "text"
                />
                <TextField
                    style = {{display : 'block'}}
                    className = "validate"
                    floatingLabelText = "Password"
                    name = "password"
                    value = {this.state.password}
                    onChange = {this.handleChange}
                    errorText = {this.state.error}
                    type = "password"
                />
            </div>
        );

        const signupMenu = (
            <Drawer
                docked={false}
                width={300}
                open={this.state.open}
                onRequestChange={(open) => this.setState({open})}
            >
                <Subheader>User Info</Subheader>

                <MenuItem primaryText="Favorite List" leftIcon={<ActionGrade />} />
                <MenuItem primaryText="Person Add" leftIcon={<SocialPersonadd />} />
                <MenuItem primaryText="Personal Info" leftIcon={<SocialPerson />} />
                <MenuItem primaryText="Sign Out"  />

                <Subheader>Connect List</Subheader>

                <MenuItem
                    primaryText=""
                    leftAvatar={<Avatar src="" />}
                    rightIcon={<CommunicationChatBubble />}
                />
                <MenuItem
                    primaryText=""
                    leftAvatar={<Avatar src="" />}
                    rightIcon={<CommunicationChatBubble />}
                />

            </Drawer>

        );

        const signinMenu = (
            <Drawer
                docked={false}
                width={300}
                open={this.state.open}
                onRequestChange={(open) => this.setState({open})}
            >
                <div style = {{padding : '20px 15px 10px 15px'}}>
                    <Link to = "/login">
                    <p style = {{textAlign : 'center', textTransform : 'uppercase'}}>wellcome</p>
                    </Link>
                    {inputText}<br/>
                    <a onClick = {this.handleLogin} style = {{marginTop : '50px'}}>SUBMIT</a>
                </div>
                <div style = {{textAlign : 'center', padding : '100px 0 20px 0'}}>
                    <p style = {{textAlign : 'center', fontSize : 20, color : 'red'}}>Do not have an ID ?</p>
                    <Link to = "/signup">Create an account</Link>
                </div>
            </Drawer>
        );

        return(
            <div>
                {AppBarBabble}
                {this.props.mode ? signinMenu : signupMenu}
            </div>
        );
    }
}

class Login extends React.Component {

    constructor(props){
        super(props);
        this.handleLogin = this.handleLogin.bind(this);
    }

    handleLogin(id, pw) {
        return this.props.loginRequest(id, pw).then(
            () => {
                if(this.props.status === "SUCCESS") {
                    // create session data
                    let loginData = {
                        isLoggedIn: true,
                        userid: id
                    };

                    document.cookie = 'key=' + btoa(JSON.stringify(loginData));

                    Materialize.toast('Welcome, ' + id + '!', 2000);
                    browserHistory.push('/');
                    return true;
                } else {
                    let $toastContent = $('<span style="color: #FFB4BA">Incorrect userid or password</span>');
                    Materialize.toast($toastContent, 2000);
                    return false;
                }
            }
        );
    }

    render() {
        return (
            <div>
                <Header
                    mode={true}
                    onLogin = {this.handleLogin}
                />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        status: state.authentication.login.status
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        loginRequest: (id, pw) => {
            return dispatch(loginRequest(id,pw));
        }
    };
};

Header.propTypes = {
    mode : React.PropTypes.bool,
    onLogin : React.PropTypes.func,
    onRegister : React.PropTypes.func
};

Header.defaultProps = {
    mode : true,
    onLogin : ( id, pw ) => { console.error("login function not defined"); },
    onRegister : ( id, pw ) => { console.error("register function not defined"); }
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
