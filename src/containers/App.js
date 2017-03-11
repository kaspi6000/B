import React from 'react';
import { Header } from 'components';

class App extends React.Component {

    constructor(props){

        super(props);

    }

    render(){

        let re = /(login|register)/;
        let isAuth = re.test(this.props.location.pathname);

        return (
            <div>
                <div>
                    {isAuth ? undefined : <Header/>}
                    {this.props.children}
                </div>
            </div>
        );
    }
}

export default App;
