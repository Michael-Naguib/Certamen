"use strict";

//Import the required components ect...
import React from 'react';
import AppBar from 'material-ui/AppBar';
import injectTapEventPlugin from 'react-tap-event-plugin';

class QuestionForm extends React.Component{
    constructor(){
        super();
    }
    render(){
        var getAnId = this.props.id || "ERROR-NO-ID-ASSIGNED";
        return(
            <div className="QuestionForm" id={getAnId}>
                <AppBar title={<span>Question Form</span>}/>
                
            </div>
        );
    }
}

injectTapEventPlugin();

document.addEventListener("DOMContentLoaded", function(event) {
    console.log("Before Render");
    ReactDOM.render(<QuestionForm id={"test"}/>,document.getElementById("page-container"));
    console.log("After Render");
});