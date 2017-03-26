//Other Code

//import "leaderboard.min"

class MyPage extends React.Component{
    constructor(props){
        super(props);
        this.greetUser = this.greetUser.bind(this);
    }
    render(){
        return(<div><h1>Hello World, {this.props.name}</h1>
            <p>The Site is undergoing Maintinence please check back later!</p>
            </div>);
    };
}

//Main App Rendering
$("document").ready(function(){
    ReactDOM.render(<MyPage name = "Chancellors "></MyPage>, document.getElementById("page-container"));
});
