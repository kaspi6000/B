import React from 'react';

class Wall extends React.Component{

    render(){

        return(
            <div>
                {this.props.params.username}
            </div>
        );
    }
}

export default Wall;
