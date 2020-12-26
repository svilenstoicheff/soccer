import React from 'react';
import GetTeams from './GetTeams'; 
import styled from 'styled-components';

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
      const url = '//api.football-data.org/v2/competitions?plan=TIER_ONE';
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
      e.preventDefault();
      const competitionId = e.target.getAttribute('id');
      this.setState({teams: null});
      const options = {
        method: 'GET',
        headers: { "X-Auth-Token": "55e2b001494e4a19b5ea2aa10ada3c7e" },
      };
      const url = `//api.football-data.org/v2/competitions/${competitionId}/standings`;
      fetch(url, options)
        .then(response => response.json())
        .then(data => {
          this.setState({ teams: data, teamsComponentCalled: true });
        });
    }
  
    
    render() {
      const WrapperNav = styled.nav `
      height: 100%;
      background: linear-gradient(225deg, #999, #333);
    `;
      const items = this.state.items;
      return (
        <section className="standings-grid">
          <WrapperNav>
            <ul>
              {items.map(item => (
                <li key={item.id}>
                  <a href="/" id={item.id} onClick={this.handleClick}>
                    {item.area.name} - {item.name}
                  </a>
                </li>
              )
              )}
            </ul>
          </WrapperNav>
          <GetTeams teams={this.state.teams} called={this.state.teamsComponentCalled}  />
        </section>
      )
    }
  }

  export default GetLeagues;