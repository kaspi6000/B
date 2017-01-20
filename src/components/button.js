import React from 'react';
import FlatButton from 'material-ui/FlatButton';

class Button extends React.Component{

    constructor(props){
        super(props);

        this.state = {
            label : 'Default'
        };

        this.onClick = this.onClick.bind(this);
    }

    onClick(){
        this.props.onClick();
    }
    render(){
        let label = this.props.label;

        return(
            <FlatButton
                label = {label}
                onTouchTap = {this.onClick}
                primary = {true}
            />
        );
    }
}

export default Button;
