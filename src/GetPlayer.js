import React from 'react';

class GetPlayer extends React.Component {
    constructor(props) {
        super(props);

        console.log('constructor',props);
        this.state = {
            isOpen: props.isOpen, 
        };
    }

    showTooltip(player) {
        console.log('inside showTooltip');
        let tooltipDisplay = 'block' ? this.state.isOpen : 'none';
        const tooltipStyle = {
            display: tooltipDisplay,
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
        
        const closeX = {
            top: '5px',
            right: '5px',
            border: '1px solid black',
            borderRadius: '1em', 
            position: 'absolute',
            width: '1.2em',
            textAlign: 'center',
            cursor: 'pointer',
        };  

        return (
            <div className='tooltip' style={tooltipStyle}>
                <p>{player.name}</p>
                <p>{player.position}, #{player.shirtNumber}</p>
                <p>Born: {new Date(player.dateOfBirth).toLocaleDateString()}, {player.countryOfBirth}</p>
                <div style={arrowLeft}></div>
                <div style={closeX}>x</div>
            </div>);
    }

    componentDidUpdate() {
        let tooltip = document.querySelector('.tooltip');
        if(tooltip) tooltip.classList.add('open');
        let tooltipOpen = tooltip && tooltip.classList.contains('open');
        if(tooltipOpen) {
            window.addEventListener('click', () => {
                document.querySelector('.tooltip').classList.add('closed');
                document.querySelector('.tooltip').classList.remove('open')}, {once: true});
            
            document.querySelector('main').addEventListener('scroll', (e) => {
                console.log(window.scrollY);
                document.querySelector('.tooltip').classList.add('closed');
                document.querySelector('.tooltip').classList.remove('open');
            }, {once: true});
                
        } else if (tooltip) {
            console.log('inside else if tooltip');
            document.querySelector('.tooltip').classList.remove('closed');
        }
    }

    render () {
        if(this.props.player){
            return this.showTooltip(this.props.player);
        }
        return null;
    }
}

export default GetPlayer;