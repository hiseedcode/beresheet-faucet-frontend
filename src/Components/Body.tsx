import React, { Component } from 'react';
import { trackPromise } from 'react-promise-tracker';
import MadeWithLove from 'react-made-with-love';
import ForkMeOnGithub from 'fork-me-on-github';
import { LoadingSpinnerComponent } from '../index';
import './Body.css';

class Body extends Component {
  state = {
    apiResponse: { trxHash: '', msg: '' },
    address: ''
  };
  constructor(props: Readonly<{}>) {
    super(props);
    this.state = { apiResponse: { trxHash: '', msg: '' }, address: '' };
  }
  async callAPI() {
    const { address } = this.state;
    const chain = 'beresheet';
    trackPromise((fetch(`https://faucet.seedcode.io/api/sendTokens?address=${address}&chain=${chain}`)
      .then((res) => res.json())
      .then((res) => {
        this.setState({ apiResponse: res }); if (res.msg !== '') { alert(res.msg) }
      }).catch((error) => {
        alert('Error: We are sorry, something went wrong on our side.')
        console.log(error)
      })));
  }

  handleChange = (e: any) => {
    this.setState({ address: e.target.value });
  }

  componentDidUpdate() {
    setTimeout(() => this.setState({ apiResponse: { trxHash: '', msg: '' } }), 10000);
  }

  render() {
    return (
      <div>
        <div className="boxContainer">
          <div className="box">
            <h4>Beresheet Faucet</h4>
            <label style={{ marginTop: "auto" }}>Enter Wallet Address</label>
            <input onChange={this.handleChange} type="text" placeholder="0x0" style={{ height: '40px' }} />
            <button onClick={this.callAPI.bind(this)} type="button" className="btn_Submit">Submit</button>
            <LoadingSpinnerComponent />
          </div>
        </div >
        <div className="textContainer">
          {/* <MadeWithLove
            by="Furqan"
            emoji
            link='https://flow.page/FurqanAhmed'
          /> */}
          <p className="textContainer">Made with ❤️ by <a href="https://flow.page/FurqanAhmed" target="_blank"> Furqan </a> - Powered by <a href="https://github.com/edgeware-builders" target="_blank"> Edgeware Builders </a></p>
        </div>
        <ForkMeOnGithub repo="https://github.com/nblogist/beresheet-faucet-frontend" />
      </div >
    );
  }
}

export default Body;
