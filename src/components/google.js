import React from 'react';

class GoogleLogin extends React.Component{

    constructor(props){
        super(props);
    }

    onSignInCallback(resp) {
      gapi.client.load('plus', 'v1', apiClientLoaded);
    }

    /**
     * Sets up an API call after the Google API client loads.
     */
    apiClientLoaded() {
      gapi.client.plus.people.get({userId: 'me'}).execute(handleEmailResponse);
    }

    /**
     * Response callback for when the API client receives a response.
     *
     * @param resp The API response object with the user email and profile information.
     */
    handleEmailResponse(resp) {
      var primaryEmail;
      for (var i=0; i < resp.emails.length; i++) {
        if (resp.emails[i].type === 'account') primaryEmail = resp.emails[i].value;
      }
      document.getElementById('responseContainer').value = 'Primary email: ' +
          primaryEmail + '\n\nFull Response:\n' + JSON.stringify(resp);
    }

    render(){

        return(
            <div id="gConnect" className="button">
                <button className="g-signin"
                    data-scope="email"
                    data-clientid="1057825330741-d1qd67jl5sljc1ss6fdk43s2g2ogcj94.apps.googleusercontent.com"
                    data-callback={this.onSignInCallback}
                    data-theme="dark"
                    data-cookiepolicy="single_host_origin">
                </button>
                <div id="response" className="hide">
                    <textarea id="responseContainer" style={{width : '100%', height : '150px'}}></textarea>
                </div>
            </div>
        );
    }
}

export default GoogleLogin;
