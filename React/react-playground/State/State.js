import React, { Component } from 'react'

class State extends Component {

    constructor(props) { 
        super(props)
        this.state = {
            message: "Subscribe por favor"
        }
    }

    ChangeMessage=()=>{
        this.setState({
            message: "Thank you for Subscribing",
            sub: "Subscribed"
        })
    }

    render() {
        return (
            <div className='App'>
                <h3>{this.state.message}</h3>
                <button onClick={this.ChangeMessage}>{this.state.sub}</button>
            </div>
        )
    }
}
export default State
