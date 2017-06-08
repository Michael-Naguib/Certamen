//Import the required components ect...
//import React from 'react';
//import AppBar from 'material-ui/AppBar';
//import injectTapEventPlugin from 'react-tap-event-plugin';

var React = require("react");
var AppBar = require("material-ui").AppBar;
var injectTapEventPlugin = require('react-tap-event-plugin');

class QuestionForm extends React.Component{
    constructor(){
        super();
    }
    render(){
        var getAnId = this.props.id || "ERROR-NO-ID-ASSIGNED";
        return(
            React.createElement("div", {className: "QuestionForm", id: getAnId}, 
                React.createElement(AppBar, {title: React.createElement("span", null, "Question Form")})
                
            )
        );
    }
}

injectTapEventPlugin();

document.addEventListener("DOMContentLoaded", function(event) {
    console.log("Before Render");
    ReactDOM.render(React.createElement(QuestionForm, {id: "test"}),document.getElementById("page-container"));
    console.log("After Render");
});