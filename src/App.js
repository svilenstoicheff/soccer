import React from 'react';
import './App.css';
import GetTeamInfo from './GetTeamInfo.js';

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
      <section className="standings-grid">
        <nav>
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
        </nav>
        <GetTeams teams={this.state.teams} called={this.state.teamsComponentCalled} />
      </section>
    )
  }
}

class GetTeams extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nodataClass: 'noData',
      teamId: '',
      teamInfo: null,
    };
    this.handleTeamClick = this.handleTeamClick.bind(this);
  }

  componentDidMount() {
    if (this.props.called && (!this.props.teams || !this.props.teams.standings.length > 0)) {
      this.setState({ nodataClass: '' });
    }
  }

  handleTeamClick(e) {
    e.preventDefault();
    this.setState({
      teamId: e.target.getAttribute('teamid'),
    });
    const teamId = e.target.getAttribute('teamid');
    const url = 'http://api.football-data.org/v2/teams/' + teamId;
    let options = {
      method: 'GET',
      headers: { "X-Auth-Token": "55e2b001494e4a19b5ea2aa10ada3c7e" },
    };

    fetch(url, options)
      .then(response => response.json())
      .then((data) => this.setState({ teamInfo: data }));
  }

  render() {
    console.log('render GetTeams');
    if (this.props.teams && this.props.teams.standings.length > 0) {
      const teamStandings = this.props.teams.standings[0].table;

      console.log('this.props.teams in GetTeams', this.props.teams);
      if (!teamStandings) {
        this.setState({ nodataClass: '' });
        return (<div className={this.state.nodataClass}>No data</div>);
      }

      return (
        <section>
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
                  <td><a href="#" onClick={this.handleTeamClick} teamid={team.team.id}>{team.team.name}</a></td>
                  <td>{team.points}</td>
                  <td>{team.playedGames}</td>
                  <td>{team.won}</td>
                  <td>{team.draw}</td>
                  <td>{team.lost}</td>
                </tr>);
              })}
            </tbody>
          </table>
          <GetTeamInfo teamId={this.state.teamId} teamInfo={this.state.teamInfo} />
        </section>
      );
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
