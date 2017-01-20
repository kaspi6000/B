import React from 'react';
import TextField from 'material-ui/TextField';

class TextInput extends React.Component{

    constructor(props){
        super(props);

        this.state = {
            value : '',
            error : ''
        };

        this.onChange = this.onChange.bind(this)
    }

    onChange(e){
        var name = this.props.name;
        var value = e.target.value;

        this.props.update(name, value);
    }
    render(){
        return(
            <div>
                <TextField
                    style = {{display : 'block'}}
                    floatingLabelText = "User-ID"
                    onChange = { this.onChange }
                    errorText = { this.state.error }
                />
                <TextField
                    style = {{display : 'block'}}
                    floatingLabelText = "Password"
                    onChange = {this.onChange}
                    errorText = {this.state.error}
                    type = "password"
                />
            </div>
        );
    }
}

export default TextInput;
