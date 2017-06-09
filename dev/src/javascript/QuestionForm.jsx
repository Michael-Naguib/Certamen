"use strict";

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




document.addEventListener("DOMContentLoaded", function(event) {
    var MuiThemeProvider;
    const QuestionFormComponent = ()=> (<MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}><QuestionForm></QuestionForm></MuiThemeProvider>);
    console.log("Before Render");
    ReactDOM.render(React.createElement(QuestionFormComponent, {id: "test"}),document.getElementById("page-container"));
    console.log("After Render");
});

//Module.exports = QuestionForm;
