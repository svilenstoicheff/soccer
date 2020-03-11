import React from 'react';

class GetTeamInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            teamId: this.props.teamId,
            //teamInfo: this.props.teamInfo,
        }
    }
    render() {
        const teamInfo = this.props.teamInfo;
        console.log('teamInfo', this.props.teamInfo);
        const thisYear = new Date().getFullYear();
        const tableId = 'team' + this.props.teamId;
        if (teamInfo) {
            return (
                <section>
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
                                        <td>{player.name}</td>
                                        <td>{player.shirtNumber}</td>
                                        <td>{player.position}</td>
                                        <td>{player.nationality}</td>
                                        <td>{thisYear - new Date(player.dateOfBirth).getFullYear()}</td>
                                    </tr>);
                            })}
                        </tbody>
                    </table>
                </section>
            );
        }
        return null;
    }
}

export default GetTeamInfo;