import merge from 'merge';

import OpenStadComponent from 'openstad-component/src/index.jsx';
import OpenStadComponentChoices from './choices.jsx';
import OpenStadComponentChoicePlane from './choice-plane.jsx';

'use strict';

export default class OpenStadComponentResult extends OpenStadComponent {

  constructor(props) {

    super(props);

    this.defaultConfig = {
    };
    this.config = merge.recursive(this.defaultConfig, this.config, props.config || {});

    this.state = {
    };

  }

  componentDidMount(prevProps, prevState) {
    console.log('??');
  }

  render() {

    let data = this.props.data;

    let resultHTML = null;
    if (data.choices) {

      switch (this.config.choices.type) {

        case 'plane':
          resultHTML = (
            <div className="osc-result-content">

              <h3>Jouw resultaat</h3>
              <div>
                Geweldig, je bent er bijna! Lees hieronder meer over jouw voorkeur, of ga terug om je voorkeur aan te passen. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas vel nulla eget justo imperdiet eleifend. Sed molestie lectus in pulvinar aliquam. Nunc eu volutpat magna, in molestie enim. Suspendisse vel maximus purus. Morbi maximus feugiat nibh, quis faucibus quam eleifend vel. Vivamus non tellus et massa aliquet tempus.
              </div>

              <h4>Jouw favoriete scenario</h4>
              {this.props.children}

              <pre><h4>RESULTAAT</h4>{ JSON.stringify(data.result, null, 2) }</pre>
            </div>
          );
          break;

        default:
          resultHTML = (
            <div>default result moet nog</div>
          );

      }
    }

    
    
    return (
      <div className="osc-result">
        {resultHTML}
      </div>
    );

  }

}
