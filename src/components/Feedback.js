import React from 'react';
import Mailto from 'react-mailto';

class Feedback extends React.Component{
    render(){
        return(
            <div>
                <div className = "title">
                    <div className = "title-font">FEEDBACK</div>
                </div>
                <div>
                    <div className = "container-title">
                        문의 또는 건의 하고 싶으신가요?
                    </div>
                    <div className = "container-font">
                        개발자에게 E-Mail을 보내려면 <Mailto email = "kaspi6000@gmail.com" obfuscate = {true}>여기를</Mailto> 클릭하세요.
                    </div>
                </div>
            </div>
        );
    }
}

export default Feedback;
