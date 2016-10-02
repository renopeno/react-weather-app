// App.js

import React from 'react';
import './App.css';
import xhr from 'xhr';
import myKeys from './config.js';

import Plot from './Plot.js';

class App extends React.Component {

  state = {
    location: '',
    data: {},
    dates: [],
    temps: [],
  };

  fetchData = (e) => {
    e.preventDefault();

    const location = encodeURIComponent(this.state.location);
    const myKey = myKeys.API_KEY;

    const urlPrefix='http://api.openweathermap.org/data/2.5/forecast?q=';
    const urlSufix='&APPID='+ myKey +'&units=metric';

    const self = this;

    const url = urlPrefix+location+urlSufix;

    xhr({
        url: url
      }, function (err, data) {
        const body = JSON.parse(data.body);
        const list = body.list;
        let dates = [];
        let temps = [];

        for (var i = 0; i < list.length; i++) {
          dates.push(list[i].dt_txt);
          temps.push(list[i].main.temp);
        }


        self.setState({
          data: body,
          dates: dates,
          temps: temps,
          selected: {
            date: '',
            temp: null
          }
        });
      }
    );
  };

  changeLocation = (e) => {
    this.setState({
      location: e.target.value
    })
  };

  render() {
    let currentTemp = '';
    let tempSymbol = '';
    let tempMessage = '';
    let tempMessageCity = '';
    const loc = this.state.location;

    if (this.state.data.list) {
      currentTemp = this.state.data.list[0].main.temp;
      tempSymbol = '°C';
      tempMessageCity = loc.charAt(0).toUpperCase() + loc.slice(1,loc.length);
      tempMessage = 'Current temp in ' + tempMessageCity + ' is';
    }

    return (
      <div>

        <h1>Weather</h1>
        <form onSubmit={this.fetchData}>
          <label>I want to know the weather for
            <input
              placeholder={"City, Country"}
              type="text"
              value={this.state.location}
              onChange={this.changeLocation}
               />
          </label>
        </form>
        {(this.state.data.list) ? (
          <div>
            <div className="weather-wrapper">

              <p className="temp-wrapper">
                <span className="temp-message">{tempMessage}</span>
                <span className="temp">{currentTemp}</span>
                <span className="temp-symbol">{tempSymbol}</span>
              </p>
            </div>

            <h2>Forecast</h2>
            <div className="weather-wrapper">
              <Plot
                xData={this.state.dates}
                yData={this.state.temps}
                type="scatter"
              />
            </div>
          </div>
        ) : null }


      </div>
    );
  }
}

export default App;
