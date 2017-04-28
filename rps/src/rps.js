const Round = require("./Round")

function RPS(){
    this.playRound = function(p1Throw, p2Throw, ui, roundRepo){
        new PlayUseCase(p1Throw, p2Throw, ui, roundRepo).execute()
    }

    this.history = function(ui, roundRepo){
        if (roundRepo.isEmpty()){
            ui.noRounds()
        } else {
            ui.rounds(roundRepo.getAll())
        }
    }
}

function PlayUseCase(p1Throw, p2Throw, ui, roundRepo){
    this.execute = function(){
        if (tie()){
            ui.tie()
        } else if(invalid()) {
            ui.invalid()
        } else if (p1Wins()){
            ui.winner("p1")
        } else {
            roundRepo.save(new Round(p1Throw, p2Throw, "p2"))
            ui.winner("p2")
        }
    }

    const VALID_THROWS = ["rock", "paper", "scissors"]

    function tie() {
        return p1Throw === p2Throw
    }

    function invalid() {
        return isThrowInvalid(p1Throw) || isThrowInvalid(p2Throw)
    }

    function p1Wins() {
        return p1Throw === "rock" && p2Throw === "scissors" ||
            p1Throw === "paper" && p2Throw === "rock" ||
            p1Throw === "scissors" && p2Throw === "paper"
    }

    function isThrowInvalid(theThrow) {
        return !VALID_THROWS.includes(theThrow)
    }
}

module.exports = RPS