const React = require("react")
const ReactDOM = require("react-dom")
const PlayForm = require("./src/PlayForm")
const RPS = require("rps")

ReactDOM.render(<PlayForm rps={new RPS()}/>, document.querySelector("#reactApp"))
