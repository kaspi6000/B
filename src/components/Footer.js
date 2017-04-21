import React from 'react';
import { Link } from 'react-router';

class Footer extends React.Component{
    render(){
        return(
            <div>
                <div className="foot">
                    <ul>
                        <li><Link to = "/about">About</Link></li>
                        <li><Link to = "/feedback">FeedBack</Link></li>
                        <li className="copy">© babble.kr 2017</li>
                    </ul>
                </div>
            </div>
        );
    }
}

export default Footer;
