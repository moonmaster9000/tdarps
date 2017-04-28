const Round = require("../src/Round")

function FakeRoundRepo(){
    let rounds = []

    this.isEmpty = function(){
        return rounds.length === 0
    }

    this.save = function(round){
        rounds.push(round)
    }

    this.getAll = function(){
        return rounds
    }
}

fdescribe("round repo", function () {
    let roundRepo

    beforeEach(function () {
        roundRepo = new FakeRoundRepo()
    })

    it("is empty when no rounds have been saved", function () {
        expect(roundRepo.isEmpty()).toBe(true)
    })

    it("is not empty when rounds have been saved", function () {
        roundRepo.save(new Round())

        expect(roundRepo.isEmpty()).toBe(false)
    })

    it("saves rounds for later retrieval", function () {
        let round = new Round("p1 throw")

        roundRepo.save(round)

        expect(roundRepo.getAll()).toEqual([round])
    })
})