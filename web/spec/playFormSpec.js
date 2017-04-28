const React = require("react")
const ReactDOM = require("react-dom")
const PlayForm = require("../src/PlayForm")
const {Round} = require("rps")

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

    describe("when the history use case says there are no rounds", function () {
        beforeEach(function () {
            renderApp({
                history(ui){
                    ui.noRounds()
                }
            })
        })

        it("displays NO ROUNDS", function () {
            expect(page()).toContain("NO ROUNDS")
        })
    })

    describe("when the history use case says there are rounds", function () {
        const p1Throw = "p1's throw"
        const p2Throw = "p2's throw"
        const result = "the result"

        beforeEach(function () {
            renderApp({
                history(ui){
                    ui.rounds([
                        new Round(p1Throw, p2Throw, result)
                    ])
                }
            })
        })

        it("displays the round details on the page", function () {
            expect(page()).toContain(p1Throw)
            expect(page()).toContain(p2Throw)
            expect(page()).toContain(result)
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

    it("sends the user input to the playRound use case", function () {
        const playRoundSpy = jasmine.createSpy("playRound")

        renderApp({
            playRound: playRoundSpy
        })

        fillIn("p1Throw", "rock")
        fillIn("p2Throw", "paper")

        submitPlayForm()

        expect(playRoundSpy).toHaveBeenCalledWith("rock", "paper", jasmine.any(Object))
    })

    let domFixture

    function setupDOM() {
        domFixture = document.createElement("div")
        domFixture.id = "testApp"
        document.querySelector("body").appendChild(domFixture)
    }

    function renderApp(rps) {
        rps.history = rps.history || function(){}
        rps.playRound = rps.playRound || function(){}
        
        ReactDOM.render(
            <PlayForm rps={rps}/>,
            domFixture
        )
    }

    beforeEach(function () {
        setupDOM()
    })

    afterEach(function () {
        tearDownDOM()
    })

    function page() {
        return domFixture.innerText;
    }

    function fillIn(inputName, inputValue){
        let input = document.querySelector(`input[name='${inputName}']`)
        input.value = inputValue
        input.dispatchEvent(new Event("input", {bubbles: true, cancelable: false}))
    }

    function submitPlayForm() {
        document.querySelector("button").click()
    }

    function tearDownDOM() {
        domFixture.remove()
    }

})