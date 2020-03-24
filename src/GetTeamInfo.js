import React from 'react';
import GetPlayer from './GetPlayer';
import ReactModal from 'react-modal';

class GetTeamInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            teamId: props.teamId,
            teamInfo: this.props.teamInfo,
            player: null,
            tooltipX: null,
            tooltipY: null, 
        }
        this.handleBack = this.handleBack.bind(this);
        this.handlePlayerClick = this.handlePlayerClick.bind(this);
    }


    componentWillMount() {
        this.props.that.setState({
            teamId: null, 
            teamInfo: null,
            player: null,
        });
    }
    
    handleBack(e) {
        this.props.that.setState({
            teamId: null, 
            teamInfo: null,
            player: null, 
        });
    }

    handlePlayerClick(e) {
        e.preventDefault();
        e.stopPropagation();
        this.setState({
            tooltipX: e.pageX, 
            tooltipY: e.pageY,
        });
        
        const playerId = e.target.id;
        const options = {
            method: 'GET',
            headers: { "X-Auth-Token": "55e2b001494e4a19b5ea2aa10ada3c7e" },
          };
          const url = `http://api.football-data.org/v2/players/${playerId}`;
          fetch(url, options)
          .then(response => response.json())
          .then(data => {
            this.setState({player: data});
          });      
    }

    render() {
        const teamInfo = this.props.teamInfo;
        //console.log('teamInfo', this.props.teamInfo);
        const thisYear = new Date().getFullYear();
        const tableId = 'team' + this.props.teamId;

        if (teamInfo) {
            return (
                <section className={this.props.className}>
                    <a href="#" onClick={this.handleBack}>Back to standings</a>
                    <h2>{teamInfo.shortName}</h2>
                    <table id={tableId}>
                        <thead>
                            <tr>
                                <th>name</th>
                                <th>#</th>
                                <th>position</th>
                                <th>nationality</th>
                                <th>age</th>
                            </tr>
                        </thead>

                        <tbody>

                            {teamInfo.squad.map(player => {
                                return (
                                    <tr key={player.name}>
                                        <td><a className='player' id={player.id} onClick={this.handlePlayerClick}>{player.name}</a></td>
                                        <td>{player.shirtNumber}</td>
                                        <td>{player.position}</td>
                                        <td>{player.nationality}</td>
                                        <td>{thisYear - new Date(player.dateOfBirth).getFullYear()}</td>
                                    </tr>);
                            })}
                        </tbody>
                    </table>
                    <GetPlayer player={this.state.player} x={this.state.tooltipX} y={this.state.tooltipY} isOpen={true}></GetPlayer>
                </section>
            );
        }
        return null;
    }
}

export default GetTeamInfo;