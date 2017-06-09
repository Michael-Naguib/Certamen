import React from 'react';
import AppBar from 'material-ui/AppBar';
import injectTapEventPlugin from 'react-tap-event-plugin';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import TextField from 'material-ui/TextField';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';
import Chip from 'material-ui/Chip';
import FlatButton from 'material-ui/FlatButton';
import Paper from 'material-ui/Paper';

class QuestionForm extends React.Component{
    constructor(){
        super();
    }
    render(){
        var getAnId = this.props.id || "ERROR-NO-ID-ASSIGNED";
        return(
            <div className="QuestionForm" id={getAnId}>
                <Paper zDepth={1} style={{height:"100%",width:"100%"}}>
                <AppBar title={<span>Question Form</span>} iconElementLeft ={<span></span>}/>
                <br/><br/>
                <Subheader>Pre Question Prompt:</Subheader><br/><br/><br/>
                <TextField hintText="This could be text, a paragraph of latin text, or something that changes the way the question is presented."/><br/>
                <br/>
                
                <Subheader>Question:</Subheader><br/><br/><br/>
                <TextField hintText="The main question the user is being asked, be sure to include punctuation."/><br/>
                <br/>
                
                <Subheader>Helps:</Subheader><br/><br/><br/>
                <TextField hintText="Anything to help the user... possibly a hint as to the meaning of a few words in the Pre Question Prompt?"/><br/>
                <br/>
                
                <Subheader>Tags</Subheader>
                <div className="QuestionForm-tags-container">
                    <Chip onRequestDelete={function(){window.alert("This could actually remove the chip from its container... will need work")}}> Example chip</Chip>
                </div>
                <TextField hintText="Type the value of your tag"/>
                <FlatButton label="Add" />
                
                </Paper>
            </div>
        );
    }
}

const QuestionFormComponent = ()=> (<MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}><QuestionForm></QuestionForm></MuiThemeProvider>);
injectTapEventPlugin();

document.addEventListener("DOMContentLoaded", function(event) {
    console.log("Before Render");
    ReactDOM.render(React.createElement(QuestionFormComponent, {id: "test"}),document.getElementById("page-container"));
    console.log("After Render");
});

//Module.exports = QuestionForm;
