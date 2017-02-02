
import React from 'react';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import Subheader from 'material-ui/Subheader';
import Avatar from 'material-ui/Avatar';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';

/*svg-icons*/
import CommunicationChatBubble from 'material-ui/svg-icons/communication/chat-bubble';
import SocialPersonadd from 'material-ui/svg-icons/social/person-add';
import SocialPerson from 'material-ui/svg-icons/social/person';
import ActionGrade from 'material-ui/svg-icons/action/grade';
import NavigationMenu from 'material-ui/svg-icons/navigation/menu';

class UserMenu extends React.Component {

    constructor(props) {

        super(props);

        this.state = {

            open : false

        };

        this.handleToggle = this.handleToggle.bind(this);

        this.handleClose  = this.handleClose.bind(this);

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

    render() {
        return (

            <div>

                <IconButton onTouchTap = {this.handleToggle}>
                    <NavigationMenu />
                </IconButton>

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

            </div>
        );
    }
    }

    export default UserMenu;
