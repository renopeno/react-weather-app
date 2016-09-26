// App.js
import React from 'react';
import './App.css';
import xhr from 'xhr';

class App extends React.Component {

  state = {
    location: '',
    data: {}
  };

  fetchData = (e) => {
    e.preventDefault();

    const location = encodeURIComponent(this.state.location);

    const urlPrefix='http://api.openweathermap.org/data/2.5/weather?q=';
    const urlSufix='&APPID=ebe1b79b67f8cf7cb38c7531a6262f00&units=metric';

    const self = this;

    const url = urlPrefix+location+urlSufix;

    xhr({
        url: url
      }, function (err, data) {
        self.setState({
          data: JSON.parse(data.body)
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

    if (this.state.data.main) {
      currentTemp = this.state.data.main.temp;
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
        <div className={`${this.state.data.main ? "weather-wrapper" : " "}`}>

          <p className="temp-wrapper">
            <span className="temp-message">{tempMessage}</span>
            <span className="temp">{currentTemp}</span>
            <span className="temp-symbol">{tempSymbol}</span>
          </p>
        </div>

      </div>
    );
  }
}

export default App;
