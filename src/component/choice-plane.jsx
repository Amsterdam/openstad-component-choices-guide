import merge from 'merge';

import OpenStadComponent from 'openstad-component/src/index.jsx';

'use strict';

export default class OpenStadComponentChoicePlane extends OpenStadComponent {

  constructor(props) {

    super(props);

    this.defaultConfig = {
      plane: {
        topleft: {
          title: "metrostad",
          bgImage: { "src":"https://image-server.staging.openstadsdeel.nl/image/719fd5b8dc6953db41b187723d3fc5c9" },
        },
        topright: {
          title: "moza&iuml;ekstad",
          bgImage: { "src":"https://image-server.staging.openstadsdeel.nl/image/01484fc7716420635beab879658e00b1" },
        },
        bottomleft: {
          title: "museumstad",
          bgImage: { "src":"https://image-server.staging.openstadsdeel.nl/image/85ef5669d9a5db2f0ec2adb6310620be" },
        },
        bottomright: {
          title: "buurtenstad",
          bgImage: { "src":"https://image-server.staging.openstadsdeel.nl/image/befd03bc1a415bd767f9912e3dcd18a8" },
        },
      }
    };

    this.config = merge.recursive(this.defaultConfig, this.config, props.config || {});

    this.state = {
    };

  }
  
  getPreferedChoice(score) {

    if (!score) return;

    let prefered;

    let baseSize = document.querySelector(`#${this.divId}`) && ( document.querySelector(`#${this.divId}`).offsetWidth / 2 ) || 90;
    let top = baseSize + ( typeof score.y == 'undefined' ? 0 : score.y ) * ( baseSize / 100 );
    let left = baseSize + ( typeof score.x == 'undefined' ? 0 : score.x ) * ( baseSize / 100 );

    if ( top < baseSize && left < baseSize ) {
      prefered = this.config.plane.topleft;
    }
    if ( top < baseSize && left > baseSize ) {
      prefered = this.config.plane.topright;
    }
    if ( top > baseSize && left < baseSize ) {
      prefered = this.config.plane.bottomleft;
    }
    if ( top > baseSize && left > baseSize ) {
      prefered = this.config.plane.bottomright;
    }

    return prefered;
    
  }

  
  getTitle(score) {

    if (!score) return;

    let prefered = this.getPreferedChoice(score);
    let title = prefered ? 'Je gaat nu richting ' + ( prefered && prefered.title ) : 'Je staat precies tussen meerdere scenario\'s in';

    this.setState({title});
    return title;

    
  }

  render() {

    let score = this.props.score;

    let baseSize = ( this.config.size / 2 ) || document.querySelector(`#${this.divId}`) && ( document.querySelector(`#${this.divId}`).offsetWidth / 2 ) || 90;
    let top = baseSize + ( typeof score.y == 'undefined' ? 0 : score.y ) * ( baseSize / 100 );
    let left = baseSize + ( typeof score.x == 'undefined' ? 0 : score.x ) * ( baseSize / 100 );

    let topleftHTML = null;
    if ( this.config.plane.topleft && this.config.plane.topleft.bgImage ) {
      topleftHTML = (<div style={{ backgroundImage: `url(${this.config.plane.topleft.bgImage.src})` }} className="osc-choice-plane-background-image"/>)
    }
    let toprightHTML = null;
    if ( this.config.plane.topright && this.config.plane.topright.bgImage ) {
      toprightHTML = (<div style={{ backgroundImage: `url(${this.config.plane.topright.bgImage.src})` }} className="osc-choice-plane-background-image"/>)
    }
    let bottomleftHTML = null;
    if ( this.config.plane.bottomleft && this.config.plane.bottomleft.bgImage ) {
      bottomleftHTML = (<div style={{ backgroundImage: `url(${this.config.plane.bottomleft.bgImage.src})` }} className="osc-choice-plane-background-image"/>)
    }
    let bottomrightHTML = null;
    if ( this.config.plane.bottomright && this.config.plane.bottomright.bgImage ) {
      bottomrightHTML = (<div style={{ backgroundImage: `url(${this.config.plane.bottomright.bgImage.src})` }} className="osc-choice-plane-background-image"/>)
    }

    return (
      <div id={this.divId} className="osc-choice-plane-plane" ref={function(el) { self.planePlaneElement = el;}}>
        <div className="osc-choice-plane-background osc-bg-1">{topleftHTML}</div>
        <div className="osc-choice-plane-background osc-bg-2">{toprightHTML}</div>
        <div className="osc-choice-plane-background osc-bg-3">{bottomleftHTML}</div>
        <div className="osc-choice-plane-background osc-bg-4">{bottomrightHTML}</div>
        <div className="osc-point" style={{ top, left }}></div>
        <div style={{ clear: 'both' }}></div>
      </div>
    );

  }

}
