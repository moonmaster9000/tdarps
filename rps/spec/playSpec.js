function RPS(){
    this.play = function(p1, p2, ui){
        new PlayUseCase(p1, p2, ui).execute()
    }
}

function PlayUseCase(p1, p2, ui){
    this.execute = function(){
        if (tie()){
            ui.tie()
        } else if(invalid()) {
            ui.invalid()
        } else if (p1Wins()){
            ui.winner("p1")
        } else {
            ui.winner("p2")
        }
    }

    const VALID_THROWS = ["rock", "paper", "scissors"]

    function tie() {
        return p1 === p2
    }

    function invalid() {
        return isThrowInvalid(p1) || isThrowInvalid(p2)
    }

    function p1Wins() {
        return p1 === "rock" && p2 === "scissors" ||
            p1 === "paper" && p2 === "rock" ||
            p1 === "scissors" && p2 === "paper"
    }

    function isThrowInvalid(theThrow) {
        return !VALID_THROWS.includes(theThrow)
    }
}

describe("play", function () {
    let ui, rps

    beforeEach(function () {
        rps = new RPS()
    })

    describe("winner scenarios", function () {
        beforeEach(function () {
            ui = jasmine.createSpyObj("ui", ["winner"])
        })
        
        it("rock v. scissors", function () {
            rps.play("rock", "scissors", ui)

            expect(ui.winner).toHaveBeenCalledWith("p1")
        })

        it("scissors v. rock", function () {
            rps.play("scissors", "rock", ui)

            expect(ui.winner).toHaveBeenCalledWith("p2")
        })

        it("paper v. rock", function () {
            rps.play("paper", "rock", ui)

            expect(ui.winner).toHaveBeenCalledWith("p1")
        })

        it("rock v. paper", function () {
            rps.play("rock", "paper", ui)

            expect(ui.winner).toHaveBeenCalledWith("p2")
        })

        it("scissors v. paper", function () {
            rps.play("scissors", "paper", ui)

            expect(ui.winner).toHaveBeenCalledWith("p1")
        })

        it("paper v. scissors", function () {
            rps.play("paper", "scissors", ui)

            expect(ui.winner).toHaveBeenCalledWith("p2")
        })
    })

    describe("tie scenarios", function () {
        beforeEach(function () {
            ui = jasmine.createSpyObj("ui", ["tie"])
        })

        it("rock v. rock", function () {
            rps.play("rock", "rock", ui)

            expect(ui.tie).toHaveBeenCalled()
        })

        it("paper v. paper", function () {
            rps.play("paper", "paper", ui)

            expect(ui.tie).toHaveBeenCalled()
        })

        it("scissors v. scissors", function () {
            rps.play("scissors", "scissors", ui)

            expect(ui.tie).toHaveBeenCalled()
        })
    })

    describe("invalid scenarios", function () {
        beforeEach(function () {
            ui = jasmine.createSpyObj("ui", ["invalid"])
        })

        it("rock v. something invalid", function () {
            rps.play("rock", Math.random(), ui)

            expect(ui.invalid).toHaveBeenCalled()
        })

        it("something invalid v. rock", function () {
            rps.play(Math.random(), "rock", ui)

            expect(ui.invalid).toHaveBeenCalled()
        })

    })
})