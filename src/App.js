import React from 'react';
import logo from './logo.svg';
import './App.css';

class GetLeagues extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: [],
      teams: null,
    };
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    const options = {
      method: 'GET',
      headers: { "X-Auth-Token": "55e2b001494e4a19b5ea2aa10ada3c7e" },
    };
    const url = 'http://api.football-data.org/v2/competitions?plan=TIER_ONE';
    fetch(url, options)
      .then(response => response.json())
      .then((data) => {
        this.setState({
          isLoaded: true,
          items: data.competitions,
          //teams: null,
        })
      })
  }

  handleClick(e) {
    const competitionId = e.target.getAttribute('id');
    console.log(e.target.getAttribute('id'));
    console.log('this', this);
    const options = {
      method: 'GET',
      headers: { "X-Auth-Token": "55e2b001494e4a19b5ea2aa10ada3c7e" },
    };
    const url = `http://api.football-data.org/v2/competitions/${competitionId}/standings`;
    fetch(url, options)
      .then(response => response.json())
      .then(data => {
        this.setState({ teams: data });
      });
  }

  render() {
    const items = this.state.items;
    return (
      <section className="standings-grid">
        <ul>
        {items.map(item => (
          <li key={item.id}>
            <a href="#" id={item.id} onClick={this.handleClick}>
              {item.area.name} - {item.name}
            </a>
          </li>
        )
        )}
      </ul>
        {console.log('before calling GetTeams', this.state.teams)}
        <GetTeams teams={this.state.teams} />
      </section>)
  }

}

class GetTeams extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log('render GetTeams');
    if (this.props.teams) {
      const teamStandings = this.props.teams.standings[0].table;
      console.log('this.props.teams in GetTeams', this.props.teams);
      return (<table className="standings">
        <thead>
          <tr>
            <th>#</th>
            <th>team</th>
          </tr>
        </thead>
        <tbody>
          {teamStandings.map((team) => {
            return (<tr><td>{team.position}</td><td>{team.team.name}</td></tr>);
          })}
        </tbody>
      </table>);
    }
    console.log('this.props.teams in GetTeams', this.props.teams);
    return (<div></div>);
  }
}

function App() {
  return (
    <main>
        <GetLeagues />
    </main>
  );
}

export default App;
