import React from 'react';

class About extends React.Component{

    render(){

        return(
            <div>
                <div className = "title">
                    <div className = "title-font">ABOUT</div>
                </div>
                <div>
                    <div className = "container-title">
                        Q. Babble 이란 ?
                    </div>
                    <div className = "container-font">
                        하나의 주제를 갖고 의견이 다른 여러 사람들이 모여 토론하는 어플리케이션.<br/>
                        각 주제마다 하나 또는 여러개의 채팅방이 존재 합니다.
                    </div>
                    <div className = "container-title">
                        Q. 모바일로는 아직인가요 ?
                    </div>
                    <div className = "container-font">
                        네.. ㅠㅠ 개발중에 있으니 시간을 주세요.
                    </div>
                    <div className = "container-title">
                        현재 Babble 상황...
                    </div>
                    <div className = "container-font" style = {{marginBottom : '150px'}}>
                        지금 각종 오류들을 아직 잡지 못한상태입니다...신속히 해결할게요..ㅠ<br/>
                        아직 개발단계이기 때문에 양호하지 못한점 죄송한 말씀드리면서 점차 나아지겠습니다.<br/>
                        해결하지 못하고 출시한점 양해 부탁드립니다.
                    </div>
                </div>
            </div>
        );
    }
}

export default About;
