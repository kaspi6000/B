import React from 'react';
import { Link } from 'react-router';

class Authentication extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            userid: "",
            password: ""
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
        this.handleRegister = this.handleRegister.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
    }

    handleKeyPress(e) {
        if(e.charCode==13) {
            if(this.props.mode) {
                this.handleLogin();
            } else {
                this.handleRegister();
            }
        }
    }

    handleChange(e) {
        let nextState = {};
        nextState[e.target.name] = e.target.value;
        this.setState(nextState);
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

    handleRegister() {
        let id = this.state.userid;
        let pw = this.state.password;

        this.props.onRegister(id, pw).then(
            (result) => {
                if(!result) {
                    this.setState({
                        userid: '',
                        password: ''
                    });
                }
            }
        );
    }

    signOut() {
        var auth2 = gapi.auth2.getAuthInstance();
        auth2.signOut().then(function () {
            console.log('User signed out.');
        });
    }

    render() {

        const inputBoxes = (
            <div>
                <div className="input-field col s12 userid">
                    <label>Username</label>
                    <input
                        name="userid"
                        type="text"
                        className="validate"
                        onChange={this.handleChange}
                        value={this.state.userid}
                    />
                </div>
                <div className="input-field col s12">
                    <label>Password</label>
                    <input
                        name="password"
                        type="password"
                        className="validate"
                        onChange={this.handleChange}
                        value={this.state.password}
                        onKeyPress={this.handleKeyPress}
                    />
                </div>
            </div>
        );

        const responseGoogle = (response) => {
            console.log(response);
        }

        const loginView = (
            <div>
                <div className="card-content">
                    <div className="row" style = {{marginBottom : '20px'}}>
                        {inputBoxes}
                        <a className="waves-effect blue-grey darken-4 btn" onClick={this.handleLogin}>SUBMIT</a>
                    </div>
                    <div className = "row center" style = {{width : 'auto', display : 'none'}}>
                        <div className="g-signin2" data-onsuccess="onSignIn" data-theme="dark"></div>
                        <a href="#" onClick={this.signOut}>Sign Out</a>
                    </div>
                </div>
                <div className="footer">
                    <div className="card-content">
                        <div className="right" >
                        New Here? <Link to="/register">Create an account</Link>
                        </div>
                    </div>
                </div>

            </div>
        );

        const registerView = (
            <div className="card-content">
                <div className="row">
                    {inputBoxes}
                    <a className="waves-effect blue-grey darken-4 btn" onClick={this.handleRegister}>CREATE</a>
                </div>
            </div>
        );

        return (
            <div className="container auth">
                <Link className="logo" to="/">BABBLE</Link>
                <div className="card">
                    <div className="header blue-grey darken-3 white-text center">
                        <div className="card-content">{this.props.mode ? "LOGIN" : "REGISTER"}</div>
                    </div>
                    {this.props.mode ? loginView : registerView }
                </div>
            </div>
        );
    }
}

Authentication.propTypes = {
    mode: React.PropTypes.bool,
    onLogin: React.PropTypes.func,
    onRegister: React.PropTypes.func
};

Authentication.defaultProps = {
    mode: true,
    onLogin: (id, pw) => { console.error("login function not defined"); },
    onRegister: (id, pw) => { console.error("register function not defined"); }
};


export default Authentication;
