import React, { Component } from 'react';
import sound1 from '../../asset/new-wave-kit.ogg';
import sound2 from '../../asset/synth-organ.ogg';
import './Route2.css';

export class Route2 extends Component {
  constructor (props) {
    super(props)
    this.state = {
      sound1: null,
      sound2: null,
    }
    this.loadSound1 = this.loadSound1.bind(this);
    this.loadSound2 = this.loadSound2.bind(this);
    this.playAudio = this.playAudio.bind(this);
  }

  componentWillMount () {

  }

  loadSound1 () {
    fetch('https://static.bandlab.com/soundbanks//previews/new­wave­kit.ogg')
      .then(
        response => {
          console.log("Sound 1 fetched !!!!");
          this.setState({ sound1: response.url });
        }
      )
      .catch(
        () => {
          console.log("Fetch sound file 1 failed, use local file");
          this.setState({ sound1: sound1 });
        }
      )
  }

  loadSound2 () {
    fetch('https://static.bandlab.com/soundbanks//previews/new­wave­kit.ogg')
      .then(
        response => {
          console.log("Sound 2 fetched !!!!");
          this.setState({ sound2: response.url });
        }
      )
      .catch(
        () => {
          console.log("Fetch sound file 2 failed, use local file");
          this.setState({ sound2: sound2 });
        }
      )
  }

  playAudio (soundTrack) {
    soundTrack.play();
  }

  render() {
    const { sound1, sound2 } = this.state;
    console.log("Sound 1: ", this.state.sound1);
    return (
      <div>
        <h2>Route 2</h2>
        <ul className="soundList">
          <li className={sound1 ? 'loaded' : ''} onClick={!sound1 ? this.loadSound1 : () => {}}>
            {sound1 ? 'Audio 1 loaded' : 'Load Audio 1'}
          </li>
          <li className={sound2 ? 'loaded' : ''} onClick={!sound2 ? this.loadSound2 : () => {}}>
            {sound2 ? 'Audio 2 loaded' : 'Load Audio 2'}
          </li>
        </ul>
        <div className="soundTracksWrap">
          {sound1 &&
          <div className="soundTrack">
            <span className="soundName">Audio 1</span>
            <div className="buttonPlay" onClick={() => this.playAudio(this.audio1)}>Play</div>
            <audio ref={(audio1) => { this.audio1 = audio1; }}><source src={sound1} type="audio/ogg" /></audio>
          </div>}

          {sound2 &&
          <div className="soundTrack">
            <span className="soundName">Audio 2</span>
            <div className="buttonPlay" onClick={() => this.playAudio(this.audio2)}>Play</div>
            <audio ref={(audio2) => { this.audio2 = audio2; }}><source src={sound2} type="audio/ogg" /></audio>
          </div>}

        </div>
      </div>
    );
  }
}
