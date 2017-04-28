const RPS = require("../src/rps")
const FakeRoundRepo = require("./FakeRoundRepo")

describe("playRound", function () {
    let ui, rps

    beforeEach(function () {
        rps = new RPS(new FakeRoundRepo())
    })

    describe("winner scenarios", function () {
        beforeEach(function () {
            ui = jasmine.createSpyObj("ui", ["winner"])
        })
        
        it("rock v. scissors", function () {
            rps.playRound("rock", "scissors", ui)

            expect(ui.winner).toHaveBeenCalledWith("p1")
        })

        it("scissors v. rock", function () {
            rps.playRound("scissors", "rock", ui)

            expect(ui.winner).toHaveBeenCalledWith("p2")
        })

        it("paper v. rock", function () {
            rps.playRound("paper", "rock", ui)

            expect(ui.winner).toHaveBeenCalledWith("p1")
        })

        it("rock v. paper", function () {
            rps.playRound("rock", "paper", ui)

            expect(ui.winner).toHaveBeenCalledWith("p2")
        })

        it("scissors v. paper", function () {
            rps.playRound("scissors", "paper", ui)

            expect(ui.winner).toHaveBeenCalledWith("p1")
        })

        it("paper v. scissors", function () {
            rps.playRound("paper", "scissors", ui)

            expect(ui.winner).toHaveBeenCalledWith("p2")
        })
    })

    describe("tie scenarios", function () {
        beforeEach(function () {
            ui = jasmine.createSpyObj("ui", ["tie"])
        })

        it("rock v. rock", function () {
            rps.playRound("rock", "rock", ui)

            expect(ui.tie).toHaveBeenCalled()
        })

        it("paper v. paper", function () {
            rps.playRound("paper", "paper", ui)

            expect(ui.tie).toHaveBeenCalled()
        })

        it("scissors v. scissors", function () {
            rps.playRound("scissors", "scissors", ui)

            expect(ui.tie).toHaveBeenCalled()
        })
    })

    describe("invalid scenarios", function () {
        beforeEach(function () {
            ui = jasmine.createSpyObj("ui", ["invalid"])
        })

        it("rock v. something invalid", function () {
            rps.playRound("rock", Math.random(), ui)

            expect(ui.invalid).toHaveBeenCalled()
        })

        it("something invalid v. rock", function () {
            rps.playRound(Math.random(), "rock", ui)

            expect(ui.invalid).toHaveBeenCalled()
        })

    })
})