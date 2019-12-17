import React, { Component } from 'react';
import './BuyCoinsTable.css';

class BuyCoinsTable extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      limit: 10,
      page: 1,
      start: 0
    }
  }

  changePage = (event) => () => {
    let newPage = this.state.page + event;
    if (newPage < 1) newPage = 1;
    const newStart = (newPage - 1) * this.state.limit;
    console.log(newPage, newStart)
    this.setState({
      page: newPage,
      start: newStart,
    }, () => {
      this.loadData()
    });
  }

  loadData = () => {
    console.log(this.state.start)
    const url = `https://api.coinlore.com/api/tickers/?start=${this.state.start}&limit=${this.state.limit}`;
    fetch(url, {
      method: "GET"
    })
      .then(response => response.json())
      .then(json => json.data)
      .then(data => this.setState({ 'data': data }))
  }

  componentDidMount() {
    this.loadData()
  }
  //   const style={background:"#f2f2f2",
  //         height:"20px"

  render() {
    return (
      <table className="BuyCoinsTable">
        <thead>
          <tr>
            <th><span role="img" aria-label="">&#128176;</span> Coin</th>
            <th><span role="img" aria-label="">&#x1F4C4;</span> Code</th>
            <th><img height="14" alt="" src="/icons/money-mouth-face.png" /> Price</th>
            <th><img height="14" alt="" src="/icons/chart.jpg" /> Total Supply</th>
          </tr>
        </thead>
        <tbody>
          {(this.state.data.length > 0) ? this.state.data.map((data, index) => {
            return (
              <React.Fragment>
                <tr key={index}>
                  <td>{data.name}</td>
                  <td>{data.symbol}</td>
                  <td>{data.price_usd}</td>
                  <td>{data.tsupply}</td>
                </tr>
                <tr className="mobile">
                  <td colSpan="2">
                    <p><span role="img" aria-label="">&#128176;</span> Coin</p>
                    <p>{data.name}</p>
                  </td>
                  <td colSpan="2">
                    <p><span role="img" aria-label="">&#x1F4C4;</span> Code</p>
                    <p>{data.symbol}</p>
                  </td>
                </tr>
                <tr className="mobile">
                  <td colSpan="2">
                    <p><img height="14" alt="" src="/icons/money-mouth-face.png" /> Price</p>
                    <p>{data.price_usd}</p>
                  </td>
                  <td colSpan="2">
                    <p><img height="14" alt="" src="/icons/chart.jpg" /> Total Supply</p>
                    <p>{data.tsupply}</p>
                  </td>
                </tr>
              </React.Fragment>
            )
          }) : <tr><td colSpan="4">Loading.....</td></tr>

          }
        </tbody>
        <tfoot>
          <tr>
            <th>{this.state.page > 1 && <button onClick={this.changePage(-1)}>&larr; Previous</button>}</th>
            <th className="mob"></th>
            <th className="mob"></th>
            <th><button onClick={this.changePage(1)}>Next &rarr;</button></th>
          </tr>
        </tfoot>
      </table>
    )
  }
};

export default BuyCoinsTable