import merge from 'merge';

import OpenStadComponent from 'openstad-component/src/index.jsx';
import OpenStadComponentChoices from './choices.jsx';
import OpenStadComponentChoicePlane from './choice-plane.jsx';

const capitalize = (s) => {
  if (typeof s !== 'string') return ''
  return s.charAt(0).toUpperCase() + s.slice(1)
}


'use strict';

export default class OpenStadComponentResult extends OpenStadComponent {

  constructor(props) {

    super(props);
//        '':

    this.defaultConfig = {
      tabs: {
        'metrostad': {
          html: (
            <div id="accordeon-1" className="osc-accordeon osc-closed">
              <div onClick={ () =>  { var element = document.getElementById('accordeon-1');  if( element.className.match(' osc-closed') ){ element.className = element.className.replace(' osc-closed', ' osc-open');  } else { element.className = element.className.replace(' osc-open', ' osc-closed'); } } } className="osc-accordeon-button">Lees meer over scenario metrostad</div>
              <div className="osc-accordeon-content">
                Deze tekst is er nog niet.
              </div>
            </div>
          ),
          image: { "src":"https://image-server.staging.openstadsdeel.nl/image/719fd5b8dc6953db41b187723d3fc5c9" },
          iframe:  { "src":"https://player.vimeo.com/video/360838768" },
          shareText: 'Deel metrostad'
        },
        'moza&iuml;ekstad': {
          html: (
            <div id="accordeon-1" className="osc-accordeon osc-closed">
              <div onClick={ () =>  { var element = document.getElementById('accordeon-1'); if( element.className.match(' osc-closed') ){ element.className = element.className.replace(' osc-closed', ' osc-open');  } else { element.className = element.className.replace(' osc-open', ' osc-closed'); } } } className="osc-accordeon-button">Lees meer over scenario moza&iuml;ekstad</div>
              <div className="osc-accordeon-content">
                Deze tekst is er nog niet.
              </div>
            </div>
          ),
          image: { "src":"https://image-server.staging.openstadsdeel.nl/image/01484fc7716420635beab879658e00b1" },
          shareText: 'Deel moza&iuml;ekstad'
        },
        'museumstad': {
          html: (
            <div id="accordeon-1" className="osc-accordeon osc-closed">
              <div onClick={ () =>  { var element = document.getElementById('accordeon-1'); if( element.className.match(' osc-closed') ){ element.className = element.className.replace(' osc-closed', ' osc-open');  } else { element.className = element.className.replace(' osc-open', ' osc-closed'); } } } className="osc-accordeon-button">Lees meer over scenario museumstad</div>
              <div className="osc-accordeon-content">
                Deze tekst is er nog niet.
              </div>
            </div>
          ),
          image: { "src":"https://image-server.staging.openstadsdeel.nl/image/85ef5669d9a5db2f0ec2adb6310620be" },
          shareText: 'museumstad'
        },
        'buurtenstad': {
          html: (
            <div id="accordeon-1" className="osc-accordeon osc-closed">
              <div onClick={ () =>  { var element = document.getElementById('accordeon-1'); if( element.className.match(' osc-closed') ){ element.className = element.className.replace(' osc-closed', ' osc-open');  } else { element.className = element.className.replace(' osc-open', ' osc-closed'); } } } className="osc-accordeon-button">Lees meer over scenario buurtenstad</div>
              <div className="osc-accordeon-content">
                Deze tekst is er nog niet.
              </div>
            </div>
          ),
          image: { "src":"https://image-server.staging.openstadsdeel.nl/image/befd03bc1a415bd767f9912e3dcd18a8" },
          shareText: 'buurtenstad'
        },
      }
    };

    // hier gebeurt iets heel raars: hij komt hier twe keer, en dan gaat de regel hieronder mis op too much recursion
    // this.config = merge.recursive(this.defaultConfig, this.config, props.config || {});
    this.config = merge(this.defaultConfig, this.config, props.config || {});

    this.state = {
      selectedTab: '',
    };

  }

  setSelectedTab(which) {
    this.setState({ selectedTab: which });
  }

  render() {
    const self = this;
    const selectedTab = self.state.selectedTab || (self.props.data.preferedChoice && self.props.data.preferedChoice.title ) || document.location.hash.replace(/^#/, ''); // zucht...
    const useTab = selectedTab || Object.keys(self.config.tabs)[0];
    const resultShareText = self.config.tabs[useTab].shareText;
    const iframe = self.config.tabs[useTab].iframe;

    let imageHTML, iframeHTML = '';
    let images = self.config.tabs[useTab].image;

    if (images) {
      if (!Array.isArray(images)) images = [images];
      let image = images[0];

      imageHTML = (
        <div>
          <img className="osc-image" src={image.src}/>
          <br />
        </div>
      );
    }

    let choicesHTML = null;
    if (self.props.data.choices) {

      switch (self.config.type) {

        case 'plane':
          choicesHTML = self.props.children;
          break;

        default:
          choicesHTML = (
            <div>default result moet nog</div>
          );

      }
    }

    return (
      <div className="osc-result">
        <div className="osc-result-content">
          <h3>Jouw resultaat</h3>
          <div>
            Geweldig, je bent er bijna!
            Lees hieronder meer over jouw voorkeur, of ga terug om je voorkeur aan te passen.

            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Maecenas vel nulla eget justo imperdiet eleifend.
            Sed molestie lectus in pulvinar aliquam.
            Nunc eu volutpat magna, in molestie enim. Suspendisse vel maximus purus. Morbi maximus feugiat nibh, quis faucibus quam eleifend vel. Vivamus non tellus et massa aliquet tempus.
          </div>

          <h2>Jouw favoriete scenario</h2>
          {choicesHTML}

          <div className="osc-explanation">
            <div className="osc-tabs">
              {Object.keys(self.config.tabs).map((tab) => {
                return (
                  <div
                    className={ 'osc-tab' + ( tab == selectedTab ? ' osc-active' : '' ) }
                    onClick={ () => self.setSelectedTab(tab) }
                    key={`osc-tab-${tab}`}
                    dangerouslySetInnerHTML={{ __html:capitalize(tab) }}
                  />
              )})}
            </div>
            <br />
            {iframe ? (
              <div class="osc-result-resp-container">
                <iframe className="osc-iframe" src={iframe.src} frameborder="0"/>
                <br />
              </div>
            ) : ''}

            {imageHTML}
            {self.config.tabs[useTab].html}
          </div>

          <div className="osc-newsletter">
            <h3>Wil je op de hoogte blijven van de omgevingsvisie?</h3>
            <a href="#newsletter">
              <strong>&gt; Schrijf je in voor de nieuwsbrief</strong>
            </a>
          </div>

          <div className="osc-sharebuttons">
            <h3>Deel jouw resultaat!</h3>
            Laat aan mede-Amsterdammers weten hoe jij de toekomst van de stad voor je ziet.
            <ul>
			        <li><a className="osc-facebook" target="_blank" href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(document.location.href)}`}>Facebook</a></li>
			        <li><a className="osc-twitter" target="_blank" href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(resultShareText + ': ' + document.location.href)}`}>Twitter</a></li>
			        <li><a className="osc-email" target="_blank" href={`mailto:?subject=${encodeURIComponent(resultShareText)};body=${encodeURIComponent(document.location.href)}`}>Email</a></li>
			        <li><a className="osc-whatsapp" target="_blank" href={`https://api.whatsapp.com/send?phone=&amp;text=${encodeURIComponent(resultShareText + ': ' +document.location.href)}&amp;source=&amp;data=`}>WhatsApp</a></li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}
