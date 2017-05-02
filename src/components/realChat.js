import React from 'react';
import io from 'socket.io-client';
import CONFIG from '../models/m-config.js';

let socket = io.connect('http://34.192.224.66:3000', {transports : ['websocket', 'polling']});

class RealChat extends React.Component {

    constructor(props){

        super(props);

        this.handleKeyPress = this.handleKeyPress.bind(this);
    }

    componentWillMount(){

        if (self.name != 'reload') {
            self.name = 'reload';
            self.location.reload(true);
        }else
        self.name = '';
    }

    componentDidMount(e){

        function getCookie(username){
            var cookie = document.cookie;
            console.log(cookie.username);
        }

        socket.on('recvmsg', function (username, data) {
            $('#conversation').append('<b>' + username + ' : </b> ' + data + '<br>');
            if ($('#scrolldiv').prop('scrollHeight') > $('#scrolldiv').height())
            $('#scrolldiv').scrollTop($('#scrolldiv').prop('scrollHeight'));
        });

        socket.on('servernoti', function (col, data) {
            $('#conversation').append('<b><font color='+col+'>' + data + '</font></b><br>');
            if ($('#scrolldiv').prop('scrollHeight') > $('#scrolldiv').height())
            $('#scrolldiv').scrollTop($('#scrolldiv').prop('scrollHeight'));
        });

        socket.on('updateuser', function (usernames) {
            $('#userlist').empty();
            $.each(usernames, function (key, value) {
                $('#userlist').append('<a>' + value + ' ' + '</a>');
            });
        });
    }

    handleKeyPress(e){
        if(e.charCode === 13){
            socket.emit('sendmsg', $('#data').val());
            $('#data').val('');
            return false;
        }
    }

    render(){

        return(
            <div>
                <div className = "chat">
                    <div id="scrolldiv" className = "chat-messages">
                        <div id="conversation" className = "chat-message"></div>
                    </div>
                    <div>
                        <input style = {{border : '1px solid #bbb', maxWidth : '300px', backgroundColor : 'white'}} id="data" onKeyPress = {this.handleKeyPress}></input>
                    </div>
                </div>
            </div>
        );
    }
}

class ContentsCard extends React.Component {
    render(){
        return(
            <div style = {{maxWidth : '500px', maxHeight : '500px', left : '0px', right : '0px',  marginRight: 'auto', float : 'left', marginTop : '50px', marginLeft : '100px'}} className="card">
                <div className="card-image waves-effect waves-block waves-light">
                    <img style = {{width : '500px', height : '420px'}} className="activator" src={this.props.value}/>
                </div>
                <div className="card-content">
                    <span className="card-title activator grey-text text-darken-4">{this.props.title}<i className="material-icons right">more_vert</i></span>

                </div>
                <div className="card-reveal">
                    <span className="card-title grey-text text-darken-4">{this.props.title}<i className="material-icons right">close</i></span>
                    <p>{this.props.text}</p>
                </div>
            </div>
        );
    }
}

export class Contents1 extends React.Component{

    componentDidMount(e){

        function getCookie(name) {
            var value = "; " + document.cookie;
            var parts = value.split("; " + name + "=");
            if (parts.length == 2) return parts.pop().split(";").shift();
        }

        let loginData = getCookie('key');

        if(typeof loginData === "undefined") return;

        loginData = JSON.parse(atob(loginData));

        socket.on('connect', function(){
            socket.emit('guestjoin', 'Park');
            socket.emit('userjoin', loginData.userid);
        });

    }

    render(){
        return(
            <div>
                <div>
                    <ContentsCard
                        title = "박근혜 탄핵"
                        value = {CONFIG.backendUrl + "img/park.jpg"}
                        text = "박근혜 대통령 탄핵은 최순실 게이트, 비선실세 의혹, 대기업 뇌물 의혹 등의 박근혜 대통령의 헌법에 위배되는 범죄 의혹을 사유로 대한민국 국회에서 야당(더불어민주당, 국민의당, 정의당)과 무소속 의원들이 발의한 대통령 탄핵 소추를 발의해 헌법재판소에서 탄핵을 인용한 것이다. 이는 대한민국 헌정 사상 노무현 대통령 탄핵 소추(2004년 3월 12일)에 이어 두 번째로 국회가 현직 대통령에 대한 탄핵 소추를 발의한 것이다.2016년 12월 9일, 탄핵 소추안이 국회에서 가결되었다. 같은 날 오후 7시 3분, 박근혜 대통령은 국회로부터 탄핵 소추 의결서를 받는 동시에 헌법상 대통령 권한 행사가 정지되었다. 이로 인해 앞과 같은 시각부터 황교 안 국무총리가 대통령 권한대행을 맡게 되었다. 박근혜 대통령에 대한 탄핵 심판은 헌법재판소의 판결에서 결정되고, 판결까지는 최대 180일이 걸리며, 박한철 전 소장(2017년 1월 31일 퇴임)이 퇴임한 관계로 8명의 재판관 중 6명 이상이 찬성해야 탄핵이 최종 확정된다. 2017년 3월 10일, 헌법재판소는 재판관 전원일치로 박근혜 대통령 탄핵 소추안을 인용하여 박근혜는 대통령직에서 파면되었다"
                        />
                </div>
                <RealChat/>
            </div>
        );
    }
}

export class Contents2 extends React.Component{

    componentDidMount(e){

        function getCookie(name) {
            var value = "; " + document.cookie;
            var parts = value.split("; " + name + "=");
            if (parts.length == 2) return parts.pop().split(";").shift();
        }

        let loginData = getCookie('key');

        if(typeof loginData === "undefined") return;

        loginData = JSON.parse(atob(loginData));

        socket.on('connect', function(){
            socket.emit('guestjoin', 'Choi');
            socket.emit('userjoin', loginData.userid);
        });

    }

    render(){
        return(
            <div>
                <div>
                    <ContentsCard
                        title = "최순실 게이트"
                        value = {CONFIG.backendUrl + "img/choi.jpg"}
                        text = "최순실 게이트, 박근혜 게이트 또는 박근혜-최순실 게이트는 최순실이 박근혜 정부의 국정에 개입했다는 것과 미르재단·K스포츠재단의 설립에 관여하여 그 재단을 사유화한 사건, 최순실의 딸 정유라가 특혜를 받은 사건 등을 포함하는 사건이다. 박근혜 정부의 최순실 등 민간인에 의한 국정농단 의혹 사건 규명을 위한 특별검사의 임명 등에 관한 법률에 의거하는 공식 명칭은 박근혜 정부의 최순실 등 민간인에 의한 국정농단 의혹 사건이다."
                        />
                </div>
                <RealChat/>
            </div>
        );
    }
}

export class Contents3 extends React.Component{

    componentDidMount(e){

        function getCookie(name) {
            var value = "; " + document.cookie;
            var parts = value.split("; " + name + "=");
            if (parts.length == 2) return parts.pop().split(";").shift();
        }

        let loginData = getCookie('key');

        if(typeof loginData === "undefined") return;

        loginData = JSON.parse(atob(loginData));

        socket.on('connect', function(){
            socket.emit('guestjoin', 'Kim');
            socket.emit('userjoin', loginData.userid);
        });

    }

    render(){
        return(
            <div>
                <div>
                    <ContentsCard
                        title = "김정남 암살"
                        value = {CONFIG.backendUrl + "img/kim.jpg"}
                        text = "2017년 2월 13일 조선민주주의인민공화국 김정은의 이복 형 김정남이 조선민주주의인민공화국 국적자들의 공작으로 인해 말레이시아 영토 내에서 암살당하는 사건이 일어나자, 양국의 관계는 급격히 악화되어 단교 위기에 직면했다."
                        />
                </div>
                <RealChat/>
            </div>
        );
    }
}
