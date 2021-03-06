import React from 'react';

class GetPlayer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: props.isOpen, 
        };
    }

    showTooltip(player) {
        const tooltipStyle = {
            backgroundColor: 'rgb(153, 153, 153)',
            borderRadius: '10px', 
            width: '15em',
            height: '9em',
            position: 'absolute',
            top: this.props.y - 50,
            left: this.props.x + 50,
            padding: '1em',
            border: '1px solid rgb(102, 102, 102)',
            opacity: '0.9',
            color: 'rgb(255, 255, 255)',
            fontWeight: '700',
        }

        const arrowLeft = {
            width: 0,
            height: 0,
            borderTop: '10px solid transparent',
            borderBottom: '10px solid transparent',
            borderRight: '10px solid rgba(153, 153, 153, .9)',
            position: 'absolute',
            top: '40px',
            left: '-10px',
          };
        
        const closeX = {
            top: '5px',
            right: '5px',
            border: '2px solid #fff',
            borderRadius: '1em', 
            position: 'absolute',
            width: '1.2em',
            textAlign: 'center',
            cursor: 'pointer',
            fontWeight: 700,
            lineHeight: '125%'
        };  

        return (
            <div className='tooltip closed' style={tooltipStyle}>
                <p>{player.name}</p>
                <p>{player.position}, #{player.shirtNumber}</p>
                <p>Born: {new Date(player.dateOfBirth).toLocaleDateString()}, {player.countryOfBirth}</p>
                <div style={arrowLeft}></div>
                <div style={closeX}>x</div>
                <div className="loader"><div className="loader-circle"><div></div></div></div>
            </div>);
    }

    componentDidUpdate() {
        let tooltip = document.querySelector('.tooltip');
        if(tooltip) tooltip.classList.add('open');
        let tooltipOpen = tooltip && tooltip.classList.contains('open');
        if(tooltip && tooltipOpen) {
            window.addEventListener('click', () => {
                tooltip.classList.add('closed');
                tooltip.classList.remove('open')}, {once: true});
            
            document.querySelector('main').addEventListener('scroll', (e) => {
                tooltip.classList.add('closed');
                tooltip.classList.remove('open');
            }, {once: true});
                
        } else if (tooltip) {
            tooltip.classList.remove('closed');
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