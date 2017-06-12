"use strict";

// ============== Set up imports for webpack bundle... explicitly list======================

//========== REACT==================
import React from 'react';
import ReactDOM from 'react-dom';

//========== Material ui ===========
import AppBar from 'material-ui/AppBar';
import injectTapEventPlugin from 'react-tap-event-plugin';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import TextField from 'material-ui/TextField';
import Chip from 'material-ui/Chip';
import FlatButton from 'material-ui/FlatButton';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
injectTapEventPlugin();

// ================================== Main Code =========================================

//==================== Question Form Page =======================
    /*
        goals:  good ux, auto check on user stop typing, store files in a global object
    */

    //Header Component
    var QuestionFormHeader = <div id="QuestionForm-Header"> 
            <h2> Question Form </h2>
        </div>;
    // Tags Component       give props of takeData
    class TagsComponent extends React.Component{
        
        //Setup initialize state and explicitly bind the context of 'this'
        constructor(){
            super();
            
            //Explicitly Bind
            this.updateInputTagValue = this.updateInputTagValue.bind(this);
            this.submitTag = this.submitTag.bind(this);
            this.addTag = this.addTag.bind(this);
            this.enterKeySubmitHelper = this.enterKeySubmitHelper.bind(this);
            this.giveData = this.giveData.bind(this);
            
            //Set the initial state
            this.state={
                allTags:[]
            }
            
            //helper object (acts like a storage space...)
            this.inputTextValue = undefined;
        }
        
        //this is called when the add button is pressed or when the 'enter' key is pressed it is called by updateInputTagValue
        // this function also determines if the state needs to be updated 
        submitTag(){
            // make sure we are not submitting an empty undefined tag nor one that is all just spaces
            if((this.inputTextValue) && (!(this.inputTextValue.split(" ").length === this.inputTextValue.length ))){
                //add
                this.addTag(this.inputTextValue);
                //reset its value
                this.inputTextValue = undefined;
            }
            
        //For the users Convienence delete the text in the input form (FIND a way to implement this)
        }
        
        //in case the user thinks hittig the enter key while the text field is active will work (which it will now...)
        enterKeySubmitHelper(fevent){
            //Check if the user is pressing the enter key thinking it will auto add
            // debugging purposes // console.log("enterKeySubmit was called because a key was released with code: " + fevent.keyCode);
            if(fevent.keyCode === 13){
                this.submitTag();
            }
        }
        
        //This is called everytime there is a text value change
        updateInputTagValue(fevent,textValue){

            // updates a TagComponent scope variable so it can be accessed by submitTag and addTag when needed...
            this.inputTextValue = textValue;
            
            //debug
            //console.log(fevent);
        }
        
        // this function adds a tag and changes the state... only when submitTag calls it
        addTag(tagName){
            //update state
            this.setState((prevState,props)=>{
                // add the item to the list
                prevState.allTags.push(tagName);
                //console.log("[Added Tag]: "+ tagName);
    
                return prevState;
            });
            //GiveData
            this.giveData();
        }
        
        //returns a function bound to the 'this' of TagsComponent that is generated to delete the index 'tagIndex'
        //Every time state is redone durring rendering this is redefined for each chip --> it deletes correctly
        removeTag(tagIndex){
            return ()=>{
                
                //return a function with 'this' un attatched to local context... is attached to TagComponent
                this.setState((prevState,props)=>{

                    //remove a tag...
                    prevState.allTags.splice(tagIndex,1);
                    return prevState;
                });
                
                //GiveData
                this.giveData();
            };
        }
        
        // pass the a function explicitly bound to its parent in reference to 'this' as  the prop 'takeData' 
        //,then it will always recieve the latest which this function sends it (allChips....)
        giveData(){
            //this method will be called when the state is computed...
            if(this.props.takeData){
                
                //Get the data because 'this' is defined by this functions scope...explicitly in constructor
                var passedValue = this.state.allTags;
            
                //takeData is an method bound to 'this' of the parent of TagsComponent
                this.props.takeData(passedValue);
            }
            
        }
        
        //render function.. compute chips.. ect....
        render(){
            //=== TagsComponent-tags-container ===
                // Temp chip styling.... move to index.scss..... borrowed directly from Material UI website...
                    const styles = {
                      chip: {
                        margin: 4,
                      },
                      wrapper: {
                        display: 'flex',
                        flexWrap: 'wrap',
                      },
                    };
                // A place to store the compleated react chip jsx
                    var tagsToBeRendered = [];
                //Iterate and setup the tags (chips)
                    for(var i=0; i<this.state.allTags.length; i++){

                        // Create the chip and add its binding 
                        /*      UNTESTED  README!!!!!!!!!!
                            !!!!!!!!!!! onRequestDelete={this.removeTag(i)} may not work because this.removeTag is being called!!!!
                            this.removeTag may need to be a function constructor and return a function with 'i' tagIndex as a set value!!!!

                            also is it ok to change the classname of a react element in material ui?? className="TagsComponent-Chip" see below

                        */
                        var currentChip = <Chip onRequestDelete={this.removeTag(i)} key={i} className="TagsComponent-Chip" style={styles.chip}>{this.state.allTags[i]}</Chip>

                        //Add to the Render List
                        tagsToBeRendered.push(currentChip);
                    }
            
            //=== TagsComponent-input-container ===
                var hintPrompt;
                if(this.state.allTags.length<1){
                   hintPrompt = "Type the name for a tag here";
                }else{
                    hintPrompt = "Add another tag by typing here";
                }
            
            //return the render ... 
                return(
                    <div className="TagsComponent-main-container">
                        <div className="TagsComponent-title-container">
                            <h3 className="TagsComponent-title" >Tags: </h3>
                        </div>
                        <div className="TagsComponent-tags-container" style={styles.wrapper}>
                            {tagsToBeRendered}
                        </div>
                        <div className="TagsComponent-input-container">
                            <TextField hintText={hintPrompt} onKeyDown={this.enterKeySubmitHelper} onChange={this.updateInputTagValue} underlineFocusStyle={{borderColor:"#8A0113"}} id="TagsComponent-text"/>
                            <FlatButton label="Add" onTouchTap={this.submitTag} className="TagsComponent-button"/>
                        </div>
                    </div>
                );
            //value={this.placeholder} 
        }
    }
 
    // Basic Input     give props of takeData ,hintText and titleText
    class BasicInput extends React.Component{
        constructor(){
            super();
            this.state={};
            
            //explicitly bind
            this.updateStoredValue = this.updateStoredValue.bind(this);
            this.giveData = this.giveData.bind(this);
            
            //storage
            this.value="";
        }
        giveData(){
            
            //check if prop defined
            if(this.props.takeData){
                //get the current state state of this child component
                var passedValue = this.value;
                
                //call the parent method which was passed with this bound...
                this.props.takeData(passedValue);
            }
        }
        updateStoredValue(fevent,newText){
            this.value = newText;
        }
        render(){
            return(
                <div className="BasicInput">
                    <div className="BasicInput-title-container">
                        <h3 className="BasicInput-title" >{this.props.titleText} </h3>
                    </div>
                    <TextField multiLine={true} rowsMax={5} className="BasicInput-TextField" onChange={this.updateStoredValue} hintText = {this.props.hintText} underlineFocusStyle={{borderColor:"#8A0113"}} />
                </div>
            );
        }
    }
    
    //AnswerChoice input pass props answerLabel, takeData ---> also passes labelId!!!   must be placed in a RadioButtonGroup
    class AnswerChoiceInput extends React.Component{
        constructor(){
            super();
            this.state={};
        }
        //add method: getData; also pass the id of this function..... also figure out a way to get the radio value in the parent..
        render(){
            return(
                <div className="AnswerChoiceInput">
                    <span className="AnswerChoiceInput-label-container">
                        <h5 className="AnswerChoiceInput-label" >{this.props.answerLabel}</h5>
                    </span>
                    <TextField className="AnswerChoiceInput-TextField" underlineFocusStyle={{borderColor:"#8A0113"}}/>
                    <RadioButton className="AnswerChoiceInput-RadioButton"/>
                </div>
            );
        };
    }

//Load the tagsComponent after the dom loads
document.addEventListener("DOMContentLoaded",()=>{
    var subMain = <div>
            <BasicInput takeData={false} hintText={"An optional Prompt, Possibly a paragraph of latin?"} titleText="Pre Question Prompt:"/>
            <BasicInput takeData={false} hintText={"The Main Question being asked; include punctuation."} titleText="Question:"/>
            <BasicInput takeData={false} hintText={"An optional Clue as to the meaning of a few words in a paragraph?"} titleText="Helps:"/>
            <TagsComponent takeData={false}/>
        </div>;
    var Main = ()=>(<MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
                {subMain}
        </MuiThemeProvider>);
    //convert mui and tagcomponent into one using it as a inline return function ()=>() and render it into the main container
    ReactDOM.render(<Main/>, document.getElementById("main-container"))
});




