//Other Code

//import "leaderboard.min"

class MyPage extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return(<h1>Hello World, {this.props.name}</h1>);
    };
}

//Main App Rendering
$("document").ready(function(){
    ReactDOM.render(<MyPage name = "Chancellors "></MyPage>, document.getElementById("page-container"));
});
