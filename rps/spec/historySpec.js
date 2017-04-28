const RPS = require("../src/rps")
const Round = require("../src/Round")

describe("history", function () {
    describe("when no rounds have been played", function () {
        it("then the UI should be told there are no rounds", function () {
            const ui = jasmine.createSpyObj("ui", ["noRounds"])

            new RPS().history(ui)

            expect(ui.noRounds).toHaveBeenCalled()
        })
    })

    describe("when rounds have been played", function () {
        it("then the UI should receive those rounds", function () {
            let playRoundUI = {winner(){}}
            let historyUI = jasmine.createSpyObj("historyUI", ["rounds"])
            let roundRepo = {
                isEmpty(){},
                getAll(){},
                save(){}
            }

            new RPS().playRound("rock", "paper", playRoundUI, roundRepo)

            new RPS().history(historyUI, roundRepo)

            expect(historyUI.rounds).toHaveBeenCalledWith([
                new Round("rock", "paper", "p2")
            ])
        })

    })
})