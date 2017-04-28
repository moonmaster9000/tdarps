const RPS = require("../src/rps")
const Round = require("../src/Round")
const FakeRoundRepo = require("./FakeRoundRepo")

describe("history", function () {
    let rps

    beforeEach(function () {
        rps = new RPS(new FakeRoundRepo())
    })

    describe("when no rounds have been played", function () {
        it("then the UI should be told there are no rounds", function () {
            const ui = jasmine.createSpyObj("ui", ["noRounds"])

            rps.history(ui)

            expect(ui.noRounds).toHaveBeenCalled()
        })
    })

    describe("when rounds have been played", function () {
        it("then the UI should receive those rounds", function () {
            let playRoundUI = {winner(){}}
            let historyUI = jasmine.createSpyObj("historyUI", ["rounds"])

            rps.playRound("rock", "paper", playRoundUI)

            rps.history(historyUI)

            expect(historyUI.rounds).toHaveBeenCalledWith([
                new Round("rock", "paper", "p2")
            ])
        })

    })
})