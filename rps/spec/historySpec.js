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
            let playRoundUI = {
                winner(){},
                tie(){},
                invalid(){}
            }
            let historyUI = jasmine.createSpyObj("historyUI", ["rounds"])

            rps.playRound("rock", "paper", playRoundUI)
            rps.playRound("paper", "paper", playRoundUI)
            rps.playRound("scissors", "paper", playRoundUI)
            rps.playRound("rock", "sailboat", playRoundUI)

            rps.history(historyUI)

            expect(historyUI.rounds).toHaveBeenCalledWith([
                new Round("rock", "paper", "p2"),
                new Round("paper", "paper", "tie"),
                new Round("scissors", "paper", "p1"),
                new Round("rock", "sailboat", "invalid")
            ])
        })

    })
})