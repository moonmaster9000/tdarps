const React = require("react")
const ReactDOM = require("react-dom")

class PlayForm extends React.Component {
    constructor(){
        super()

        this.state = {}
    }

    submitPlayForm(){
        this.props.rps.playRound("p1 throw placeholder", "p2 throw placeholder", this)
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

    render(){
        return <div>
                {this.state.result}
                <button onClick={this.submitPlayForm.bind(this)}></button>
            </div>
    }
}

describe("play form", function () {
    describe("when the playRound use case decides the round is invalid", function () {
        beforeEach(function () {
            renderApp({
                playRound(p1, p2, ui){
                    ui.invalid()
                }
            })
        })

        it("then the UI displays 'INVALID'", function () {
            expect(page()).not.toContain("INVALID")

            submitPlayForm()

            expect(page()).toContain("INVALID")
        })
    })

    describe("when the playRound use case decides the round is tie", function () {
        beforeEach(function () {
            renderApp({
                playRound(p1, p2, ui){
                    ui.tie()
                }
            })
        })

        it("then the UI displays 'TIE'", function () {
            expect(page()).not.toContain("TIE")

            submitPlayForm()

            expect(page()).toContain("TIE")
        })
    })

    describe("when the playRound use case decides p1 wins", function () {
        beforeEach(function () {
            renderApp({
                playRound(p1, p2, ui){
                    ui.winner("p1")
                }
            })
        })

        it("then the UI displays 'p1 Wins'", function () {
            expect(page()).not.toContain("p1 Wins")

            submitPlayForm()

            expect(page()).toContain("p1 Wins")
        })
    })

    describe("when the playRound use case decides p2 wins", function () {
        beforeEach(function () {
            renderApp({
                playRound(p1, p2, ui){
                    ui.winner("p2")
                }
            })
        })

        it("then the UI displays 'p2 Wins'", function () {
            expect(page()).not.toContain("p2 Wins")

            submitPlayForm()

            expect(page()).toContain("p2 Wins")
        })
    })

    let domFixture

    function setupDOM() {
        domFixture = document.createElement("div")
        domFixture.id = "testApp"
        document.querySelector("body").appendChild(domFixture)
    }

    function renderApp(rps) {
        ReactDOM.render(
            <PlayForm rps={rps}/>,
            domFixture
        )
    }

    beforeEach(function () {
        setupDOM()
    })

    function page() {
        return domFixture.innerText;
    }

    function submitPlayForm() {
        document.querySelector("button").click()
    }

    function tearDownDOM() {
        domFixture.remove()
    }

    afterEach(function () {
        tearDownDOM()
    })
})