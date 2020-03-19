import React from 'react';
import ReactModal from 'react-modal';

class GetPlayer extends React.Component {
    constructor(props) {
        super(props);
    }

    showTooltip(player) {
        const tooltipStyle = {
            backgroundColor: 'lightblue',
            borderRadius: '10px',
            minWidth: '150px', 
            minHeight: '50px', 
            position: 'absolute',
            top: this.props.y - 50, 
            left: this.props.x + 50,
            padding: '1em'
        };

        const arrowLeft = {
            width: 0,
            height: 0,
            borderTop: '10px solid transparent',
            borderBottom: '10px solid transparent',
            borderRight: '10px solid lightblue',
            position: 'absolute',
            top: '40px',
            left: '-10px',
          };

        //const player = this.props.player;
        return (
            <div className='tooltip' style={tooltipStyle}>
                <p>{player.name}</p>
                <p>{player.position}, #{player.shirtNumber}</p>
                <p>Born: {new Date(player.dateOfBirth).toLocaleDateString()}, {player.countryOfBirth}</p>
                <div style={arrowLeft}></div>
            </div>);
    }

    render () {
        console.log('this.props.player',this.props.player);
        console.log('x', this.props.x);
        console.log('y', this.props.y);
        if(this.props.player){
            console.log('this.props.player',this.props.player);
            return this.showTooltip(this.props.player);
        }
        return null;
    }
}

export default GetPlayer;