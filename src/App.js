import React from 'react';
import logo from './logo.svg';
import './App.css';

class GetLeagues extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: [],
    }
  }

  componentDidMount() {
    const options = {
      method: 'GET',
      mode: 'no-cors'
    };
      const url = 'http://api.football-data.org/v2/competitions?plan=TIER_ONE'; 
      fetch(url, { 
        headers: {"X-Auth-Token": "55e2b001494e4a19b5ea2aa10ada3c7e"}})
      .then(response => response.json())
      .then((data) => {
     this.setState({
       isLoaded: true,
       items: data.competitions
     })
  })
}

handleClick(e) {
  console.log(e.target.getAttribute('id'));
}

render () {
  const items = this.state.items;
    return (<ul>
      {items.map(item => (
        <li key={item.id}>
          <a href="#"  id={item.id} onClick={this.handleClick}>
          {item.area.name} - {item.name}
          </a>
        </li>
      )
    )}
    </ul>)
}  

}

function App() {
  return (
    <div className="App">
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
      <section>
        <GetLeagues />
      </section>
    </div>
  );
}

export default App;
