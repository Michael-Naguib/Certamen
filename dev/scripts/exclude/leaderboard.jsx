//Header
const LeaderboardHeader = <div id="leaderboard-header">Leaderboards</div>;

class LeaderboardAside extends React.Component{
        constructor(props){
        super(props);
        this.state ={
            userData: undefined,
            spamed: false,
            genDataUrl: "./assets/genleaderboards.php",
            retrievalErr: false
        };
        this.getUserData = this.getUserData.bind(this);
    }
    getUserData(){
        this.setState({spammed:true});
        $.ajax({url:this.state.genDataUrl, success: function(result){
            try{
                this.setState({userData:Json.parse(result)});
            }catch(e){
                this.setState({retrievalErr: true});
            }

        }, error: function(xhrr,statuss,errorr){
            this.setState({retrievalErr: true});
        }});
    }
    render(){
        return(<div id="leaderboard-aside"></div>);
    }
}
//Main Component
class Leaderboard extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return(<div id="leaderboard-container">
            <LeaderboardHeader></LeaderboardHeader>

            </div>);
    }
}
