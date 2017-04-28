const Round = require("./Round")

function RPS(roundRepo){
    this.playRound = function(p1Throw, p2Throw, ui){
        new PlayUseCase(p1Throw, p2Throw, ui, roundRepo).execute()
    }

    this.history = function(ui){
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
            handleTie()
        } else if(invalid()) {
            handleInvalid()
        } else if (p1Wins()){
            handleWinner("p1")
        } else {
            handleWinner("p2")
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

    function handleTie() {
        roundRepo.save(new Round(p1Throw, p2Throw, "tie"))
        ui.tie()
    }

    function handleInvalid() {
        roundRepo.save(new Round(p1Throw, p2Throw, "invalid"))
        ui.invalid()
    }

    function handleWinner(winner) {
        roundRepo.save(new Round(p1Throw, p2Throw, winner))
        ui.winner(winner)
    }
}

module.exports = {
    RPS,
    Round,
}