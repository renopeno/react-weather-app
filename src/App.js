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

    const urlPrefix='http://api.openweathermap.org/data/2.5/forecast?q=';
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
    let currentTemp = ' ';
    let tempSymbol = '';

    if (this.state.data.list) {
      currentTemp = this.state.data.list[0].main.temp;
      tempSymbol = '°C';
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
        <div className="weather-wrapper">

          <p className="temp-wrapper">
            <span className="temp">{currentTemp}</span>
            <span className="temp-symbol">{tempSymbol}</span>
          </p>
        </div>

      </div>
    );
  }
}

export default App;
