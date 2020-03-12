import React from 'react';
import GetTeams from './GetTeams'; 

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
            teams: null,
          })
        })
    }
  
    handleClick(e) {
      const competitionId = e.target.getAttribute('id');
      this.setState({teams: null});
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
          <GetTeams teams={this.state.teams} called={this.state.teamsComponentCalled}  />
        </section>
      )
    }
  }

  export default GetLeagues;