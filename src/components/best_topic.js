import React from 'react';
import CONFIG from '../models/m-config.js';
import { Link } from 'react-router';

class ContentsCard extends React.Component {
    render(){
        return(
            <div style = {{margin : '20px 0px 20px 20px', width : '300px', height : 'auto', marginBottom : '100px', float : 'left'}} className="card small">
                <div className="card-image waves-effect waves-block waves-light">
                    <img style = {{maxWidth : 300, height : 300}} className="activator" src={this.props.value}/>
                </div>
                <div className="card-content">
                    <span className="card-title activator grey-text text-darken-4">{this.props.title}<i className="material-icons right">more_vert</i></span>
                    <p><Link to = {this.props.chatUrl}>Chatting start!</Link></p>
                </div>
                <div className="card-reveal">
                    <span className="card-title grey-text text-darken-4">{this.props.title}<i className="material-icons right">close</i></span>
                    <p>{this.props.text}</p>
                </div>
            </div>
        );
    }
}

class BestTopic extends React.Component{

    constructor(props){
        super(props);
    }
    render(){

        return(
            <div className = "topic">
                <ContentsCard title = "박근혜 탄핵" chatUrl = "/realchat" value = {CONFIG.backendUrl + "img/park.jpg"} text = "agfgasenkflaseknflsaerklsnerl" />
                <ContentsCard title = "최순실 게이트" chatUrl = "/" value = {CONFIG.backendUrl + "img/choi.jpg"} text = "agfgasenkflaseknflsaerklsnerl" />
                <ContentsCard title = "김정남 암살" chatUrl = "/" value = {CONFIG.backendUrl + "img/kim.jpg"} text = "agfgasenkflaseknflsaerklsnerl" />
                <ContentsCard title = "Test" chatUrl = "/" value = {CONFIG.backendUrl + "img/cancel.png"} text = "text input" />
                <ContentsCard title = "Test" chatUrl = "/" value = {CONFIG.backendUrl + "img/cancel.png"} text = "text input" />
                <ContentsCard title = "Test" chatUrl = "/" value = {CONFIG.backendUrl + "img/cancel.png"} text = "text input" />
                <ContentsCard title = "Test" chatUrl = "/" value = {CONFIG.backendUrl + "img/cancel.png"} text = "text input" />
                <ContentsCard title = "Test" chatUrl = "/" value = {CONFIG.backendUrl + "img/cancel.png"} text = "text input" />
                <ContentsCard title = "Test" chatUrl = "/" value = {CONFIG.backendUrl + "img/cancel.png"} text = "text input" />
            </div>
        );
    }
}

export default BestTopic;
