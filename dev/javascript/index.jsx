//Other Code

//import "leaderboard.min"

class MyPage extends React.Component{
    constructor(props){
        super(props);
        this.greetUser = this.greetUser.bind(this);
    }
    render(){
        return(<h1>The Site is undergoing Maintinence Please check back later :), {this.props.name}</h1>);
    };
}

//Main App Rendering
$("document").ready(function(){
    ReactDOM.render(<MyPage name = "Chancellors "></MyPage>, document.getElementById("page-container"));
});
