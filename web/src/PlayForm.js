const React = require("react")

class PlayForm extends React.Component {
    constructor(){
        super()

        this.state = {}
    }

    componentDidMount(){
        this.props.rps.history(this)
    }

    submitPlayForm(){
        this.props.rps.playRound(this.state.p1Throw, this.state.p2Throw, this)
    }

    invalid(){
        this.setState({result: "INVALID"})
    }

    tie(){
        this.setState({result: "TIE"})
    }

    noRounds(){
        this.setState({roundDisplay: "NO ROUNDS"})
    }

    rounds(theRounds){
        this.setState({roundDisplay: theRounds.map(r => `${r.p1Throw} ${r.p2Throw} ${r.result}`)})
    }

    winner(player){
        this.setState({result: `${player} Wins!!!`})
    }

    inputChanged(e){
        this.setState({[e.target.name]: e.target.value})
    }

    render(){
        return <div>
            {this.state.result}
            <input name="p1Throw" onChange={this.inputChanged.bind(this)}/>
            <input name="p2Throw" onChange={this.inputChanged.bind(this)}/>
            <button onClick={this.submitPlayForm.bind(this)}></button>
            <h2>{this.state.roundDisplay}</h2>
        </div>
    }
}

module.exports = PlayForm