import React, { Component } from 'react';
import './App.css';
import web3 from './web3';
import lottery from './lottery';

class App extends Component {
  state = {
    manager: '',
    players: [],
    balance: '',
    value: '',
    message: ''
  };

  async componentDidMount() {
    // when using metamask dont have to specify from
    const manager = await lottery.methods.manager().call();
    const players = await lottery.methods.getPlayers().call();
    const balance = await web3.eth.getBalance(lottery.options.address);

    this.setState({ manager, players, balance });
  }

  onSubmit = async event => {
    event.preventDefault();

    const accounts = await web3.eth.getAccounts();

    this.setState({ message: 'Waiting on transaction success...' });

    await lottery.methods.enter().send({
      from: accounts[0],
      value: web3.utils.toWei(this.state.value, 'ether')
    });

    this.setState({ message: 'You have been entered!' });
  };

  onClick = async () => {
    const accounts = await web3.eth.getAccounts();

    this.setState({ message: 'Waiting on transaction success...' });

    await lottery.methods.pickWinner().send({
      from: accounts[0]
    });

    this.setState({ message: 'A winner has been picked!' });
  };

  render() {
    return (
      <div>
        <br />
        <div className="ui container">
          <h2>Lottery Contract</h2>
          <br />
          <p>
            This is a simple Lottery App built on the Rinkeby Test Ethereum
            Network. You will need the Metamask browser extension to interact
            with this app.
          </p>
          <br />
          <p>This contract is managed by {this.state.manager}.</p>
          <br />
          <p>
            There are currently {this.state.players.length} people entered,
            competing to win {web3.utils.fromWei(this.state.balance, 'ether')}{' '}
            ether!
          </p>
          <hr />
          <form onSubmit={this.onSubmit}>
            <h4>Want to try your luck?</h4>
            <div>
              <label>Amount of ether to enter</label>
              <div className="ui small icon input">
                <input
                  value={this.state.value}
                  onChange={event =>
                    this.setState({ value: event.target.value })
                  }
                />
              </div>
            </div>
            <button className="ui button">Enter</button>
          </form>
          <hr />
          <h4>Ready to pick a winner?</h4>
          <button className="ui button" onClick={this.onClick}>
            Pick a winner!
          </button>
          <hr />
          <h1>{this.state.message}</h1>
        </div>
      </div>
    );
  }
}

export default App;
