/* React */
import React                                               from 'react';
import ReactDOM                                            from 'react-dom';
import injectTapEventPlugin                                from 'react-tap-event-plugin';
import { Router, Route, browserHistory, IndexRoute, Link } from 'react-router';

/* material-ui */
import MuiThemeProvider                                    from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme                                         from 'material-ui/styles/getMuiTheme';
import FlatButton from 'material-ui/FlatButton';

/* Babble */
import TextInput                                           from './components/text_input';
import Button                                              from './components/button';
import BestTopic                                           from './components/best_topic';
import UserMenu                                            from './components/user_menu';
import ChatApp                                             from './components/chat';

injectTapEventPlugin();

const muiTheme = getMuiTheme({
  appBar: {
    height: 50,
  },
});

const styles = ({
    contentStyle : {
        boxSizing : 'border-box',
        position : 'relative',
        width : 250,
        overflow : 'hidden',
        margin : '0 auto',
        paddingBottom : 200,
        paddingTop : 100,
    }
});


class App extends React.Component{

    constructor(props){
        super(props);

        this.state = {

            values : {},
            main : 'Babble',
        };

        this.updateValue = this.updateValue.bind(this);
        this.onClickValue = this.onClickValue.bind(this);
    }

    updateValue ( name, value ) {

        var newValues = Object.assign( {}, this.state.values );

        newValues[ name ] = value;

        this.setState({

            values : newValues

        })

        console.log(newValues);
    }

    onClickValue ( ) {

        var newValues = this.state.values;

        console.log("this : "+this.state.values);
        console.log(newValues);
    }

    onClick(e){
        this.props.onClick();
    }

    render(){

        return(

            <MuiThemeProvider muiTheme={getMuiTheme(muiTheme)}>
                <div>
                    <div>
                        <div>
                            <UserMenu/>
                        </div>
                        <div style = {styles.contentStyle}>
                            <TextInput
                                update = {this.updateValue}
                            />
                            <Button
                                onClick = {this.onClickValue}
                                label = "Signin"
                                name = "signin"
                            />
                        </div>
                    </div>
                    <Link to = {"/chat"}>
                        Chat start!
                    </Link>
                    <div>
                        <BestTopic/>
                    </div>
                </div>
            </MuiThemeProvider>
        )
    }
}

ReactDOM.render(
    <Router history = { browserHistory } >
        <Route path="/" component={App} />
        <Route path="/chat" component={ChatApp} />
    </Router>
    ,
    document.getElementById('babble'));
