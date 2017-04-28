const React = require("react")

class PlayForm extends React.Component {
    constructor(){
        super()

        this.state = {}
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
        </div>
    }
}

module.exports = PlayForm