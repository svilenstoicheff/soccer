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
      teamsComponentCalled: false,
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
        this.setState({ teams: data, teamsComponentCalled: true });
      });
  }

  render() {
    const items = this.state.items;
    return (
      <nav className="standings-grid">
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
        <GetTeams teams={this.state.teams} called={this.state.teamsComponentCalled} />
      </nav>)
  }

}

class GetTeams extends React.Component {
  constructor(props) {
    super(props);
    this.state = {nodataClass: 'noData'};
  }

  componentDidMount() {
    if (this.props.called && (!this.props.teams || !this.props.teams.standings.length > 0)) {
      this.setState({nodataClass: ''});
    }
  }

  render() {
    console.log('render GetTeams');
    if (this.props.teams && this.props.teams.standings.length > 0) {
      const teamStandings = this.props.teams.standings[0].table;

      console.log('this.props.teams in GetTeams', this.props.teams);
      if (!teamStandings) {
        this.setState({nodataClass: ''});
        return (<div className={this.state.nodataClass}>No data</div>);
      }
      
      return (
      <table className="standings">
        <thead>
          <tr>
            <th>#</th>
            <th>team</th>
            <th>points</th>
            <th>games played</th>
            <th>W</th>
            <th>T</th>
            <th>L</th>
          </tr>
        </thead>
        <tbody>
          {teamStandings.map((team) => {
            return (<tr key={team.position}><td>{team.position}</td>
              <td>{team.team.name}</td>
              <td>{team.points}</td>
              <td>{team.playedGames}</td>
              <td>{team.won}</td>
              <td>{team.draw}</td>
              <td>{team.lost}</td>
            </tr>);
          })}
        </tbody>
      </table>);
    } else {
    return (<div className={this.state.nodataClass}>No data</div>);
    }
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
