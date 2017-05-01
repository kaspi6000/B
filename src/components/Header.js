import React from 'react';
import { Link } from 'react-router';
import CONFIG from '../models/m-config';
import Mailto from 'react-mailto';

/*Material Drawer*/
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import Subheader from 'material-ui/Subheader';
import Avatar from 'material-ui/Avatar';

import SocialPersonadd from 'material-ui/svg-icons/social/person-add';
import SocialPerson from 'material-ui/svg-icons/social/person';
import ActionGrade from 'material-ui/svg-icons/action/grade';
import CommunicationChatBubble from 'material-ui/svg-icons/communication/chat-bubble';

/*Material Dialog*/
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

injectTapEventPlugin();

const muiTheme = getMuiTheme({
  appBar: {
    height: 50,
  },
});

class Header extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            open: false
        };

        this.handleToggle = this.handleToggle.bind(this);
        this.handleClose = this.handleClose.bind(this);
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

    componentDidMount(){
        function getCookie(name) {
            var value = "; " + document.cookie;
            var parts = value.split("; " + name + "=");
            if (parts.length == 2) return parts.pop().split(";").shift();
        }

        let loginData = getCookie('key');

        if(typeof loginData === "undefined") return;

        loginData = JSON.parse(atob(loginData));
    }

    render() {

        const loginButton = (
            <div>
            <li>
                <Link to="/login">
                    <i className="material-icons">vpn_key</i>
                </Link>
            </li>
            </div>
        );

        const logoutButton = (
            <div>
            <li>
                <a onClick={this.props.onLogout}>
                    <i className="material-icons">lock_open</i>
                </a>
            </li>
            </div>
        );

        const status = (
            <div><li>
                <div onTouchTap = {this.handleToggle}>
                    <IconButton style = {{marginTop : '-12px'}}><i className="material-icons">menu</i></IconButton>
                </div>
                    <Drawer
                        docked={false}
                        width={300}
                        open={this.state.open}
                        onRequestChange={(open) => this.setState({open})}
                    >
                        <Subheader>User Info</Subheader>
                        <MenuItem primaryText="Favorite List" leftIcon={<ActionGrade />} />
                        <MenuItem primaryText="Person Add" leftIcon={<SocialPersonadd />} />
                        <UserDialog />
                        <Subheader>Connect</Subheader>
                        <MenuItem
                            style = {{textAlign : 'center'}}
                            primaryText="BABBLE"
                            leftAvatar={<Avatar src={CONFIG.backendUrl + "img/B.jpg"} />}
                            rightIcon={<Mailto email = "kaspi6000@gmail.com" obfuscate = {true}><i className="material-icons menuicon" >email</i></Mailto>}
                        />
                    </Drawer>
            </li></div>
       );

       const registerStatus = (
            <div><li>
                <div onTouchTap = {this.handleToggle}>
                    <IconButton style = {{marginTop : '-12px'}}><i className="material-icons">menu</i></IconButton>
                </div>
                    <Drawer
                        docked={false}
                        width={300}
                        open={this.state.open}
                        onRequestChange={(open) => this.setState({open})}
                    >
                        <Link to = '/login' className = "brand-logo center" style = {{color : 'black', marginTop : '200px'}}>Start</Link>
                    </Drawer>
            </li></div>
       );

        return (
            <div>
            <MuiThemeProvider muiTheme={getMuiTheme(muiTheme)}>
                <div className = "navbar-fixed">
                    <nav>
                        <div className="nav-wrapper blue-grey darken-4">
                            <Link to="/" className="brand-logo center">BABBEL</Link>
                            <ul>
                                { this.props.isLoggedIn ? status : registerStatus}
                                <li><a><i className="material-icons">search</i></a></li>
                            </ul>
                            <div className="right">
                                <ul>
                                    { this.props.isLoggedIn ? logoutButton : loginButton }
                                </ul>
                            </div>
                        </div>
                    </nav>
                </div>
            </MuiThemeProvider>
            </div>
        );
    }
}

export class UserDialog extends React.Component{

    constructor(props){
        super(props);

        this.state = {
            open : false,
        };

        this.handleOpen = this.handleOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }

    handleOpen(){
        this.setState({open: true});
    };

    handleClose(){
        this.setState({open: false});
    };

    render(){

        function getCookie(name) {
            var value = "; " + document.cookie;
            var parts = value.split("; " + name + "=");
            if (parts.length == 2) return parts.pop().split(";").shift();
        }

        let loginData = getCookie('key');

        if(typeof loginData === "undefined") return;

        loginData = JSON.parse(atob(loginData));

        const actions = [
            <FlatButton
                label="Cancel"
                primary={true}
                onTouchTap={this.handleClose}
            />
        ];

        return(
            <div>
                <MenuItem primaryText="Personal Info" leftIcon={<SocialPerson />} onTouchTap={this.handleOpen} />
                <Dialog
                    title="Your Information"
                    actions={actions}
                    modal={false}
                    open={this.state.open}
                    onRequestClose={this.handleClose}
                >
                    <ul>
                        <li>ID : {loginData.userid}</li>
                        <li>E-mail : </li>
                        <li>Gender : </li>
                    </ul>
                </Dialog>
            </div>
        );
    }
}

Header.propTypes = {
    isLoggedIn: React.PropTypes.bool,
    onLogout: React.PropTypes.func
};

Header.defaultProps = {
    isLoggedIn: false,
    onLogout: () => { console.error("logout function not defined");}
};

export default Header;
