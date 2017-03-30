import React from 'react';
import { BestTopic } from 'components';
import CONFIG from '../models/m-config';

let imgUrl = {
    backImg : CONFIG.backendUrl + 'img/back.jpg'
};

class Home extends React.Component {

    constructor(props){
        super(props);
    }

    componentDidMount(e){

        $(function() {
            $('a.page-scroll').bind('click', function(event) {
                var $anchor = $(this);
                $('html, body').stop().animate({
                    scrollTop: $($anchor.attr('href')).offset().top
                }, 1800, 'easeInOutExpo');
                event.preventDefault();
            });
        });
    }

    render() {

        return (
            <div>
                <div className = "intro" style = {{backgroundImage : 'url(' + imgUrl.backImg + ')'}}>
                    <div className="intro-body">
                        <h1 className="brand-heading">babble.chat</h1>
                        <p className="intro-text">다양한 사람들과 당신의 의견을 공유하세요.</p>
                        <a href="#topic" className="btn btn-circle page-scroll">
                            <i className="material-icons">expand_more</i>
                        </a>
                    </div>
                </div>
                <div id = "topic">
                    <BestTopic/>
                </div>
            </div>
        );
    }
}

export default Home;
