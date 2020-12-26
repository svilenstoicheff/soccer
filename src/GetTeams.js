import React from 'react';
import GetTeamInfo from './GetTeamInfo';

class GetTeams extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        nodataClass: 'noData',
        teamId: null,
        teamInfo: null,
      };
      this.handleTeamClick = this.handleTeamClick.bind(this);
    }
  
    componentDidMount() {
      this.setState({teamId: null, teamInfo: null});
      if (this.props.called && (!this.props.teams || !this.props.teams.standings.length > 0)) {
        this.setState({ nodataClass: '', teamInfo: null });
      }
    }
  
    handleTeamClick(e) {
      e.preventDefault();
      this.setState({
        teamId: e.target.getAttribute('teamid'),
      });
      const teamId = e.target.getAttribute('teamid');
      const url = '//api.football-data.org/v2/teams/' + teamId;
      let options = {
        method: 'GET',
        headers: { "X-Auth-Token": "55e2b001494e4a19b5ea2aa10ada3c7e" },
      };
  
      fetch(url, options)
        .then(response => response.json())
        .then((data) => {
          this.setState({ teamInfo: data });
      });
    }
  
    render() {
      if (this.props.teams && this.props.teams.standings.length > 0) {
        const teamStandings = this.props.teams.standings[0].table;
        const competition = this.props.teams.competition;
  
        if (!teamStandings) {
          this.setState({ nodataClass: '' });
          return (<div className={this.state.nodataClass}>No data</div>);
        }
  
        return (
          <section>
            <GetTeamInfo teamId={this.state.teamId} teamInfo={this.state.teamInfo} className="teamInfo" that={this} />
  
        <h2>{competition.area.name +': '+competition.name}</h2>
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
                    <td><a href="/" onClick={this.handleTeamClick} teamid={team.team.id}>{team.team.name}</a></td>
                    <td>{team.points}</td>
                    <td>{team.playedGames}</td>
                    <td>{team.won}</td>
                    <td>{team.draw}</td>
                    <td>{team.lost}</td>
                  </tr>);
                })}
              </tbody>
            </table>
          </section>
        );
      } else {
        return (<div className={this.state.nodataClass}>No data</div>);
      }
    }
  }

  export default GetTeams;