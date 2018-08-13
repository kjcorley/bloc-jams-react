import React, { Component } from 'react';
import albumData from './../data/albums';
import PlayerBar from './PlayerBar';

class Album extends Component {
  constructor(props) {
    super(props);

    const album = albumData.find( album => {
      return album.slug === this.props.match.params.slug
    });

    this.state = {
      album: album,
      currentSong: album.songs[0],
      currentTime: 0.3,
      duration: album.songs[0].duration,
      isPlaying: false,
      isHover: [].fill(false, 0, album.songs.length),
      currentVolume: 0.3
    };

    this.audioElement = document.createElement('audio');
    this.audioElement.src = album.songs[0].audioSrc;
  }

  play() {
    this.audioElement.play();
    this.setState({ isPlaying: true });
  }

  pause() {
    this.audioElement.pause();
    this.setState({ isPlaying: false });
  }

  componentDidMount() {
    this.eventListeners = {
      timeupdate: e => {
        this.setState({ currentTime: this.audioElement.currentTime });
      },
      durationchange: e => {
        this.setState({ duration: this.audioElement.duration });
      }
    };
    this.audioElement.addEventListener('timeupdate', this.eventListeners.timeupdate);
    this.audioElement.addEventListener('durationchange', this.eventListeners.durationchange);
  }

  componentWillUnmount() {
    this.audioElement.src = null;
    this.audioElement.removeEventListener('timeupdate', this.eventListeners.timeupdate);
    this.audioElement.removeEventListener('duration', this.eventListeners.durationchange);
  }

  setSong(song) {
    this.audioElement.src = song.audioSrc;
    this.setState({ currentSong: song });
  }

  handleSongClick(song) {
    const isSameSong = this.state.currentSong === song;
    if (this.state.isPlaying && isSameSong) {
      this.pause();
    } else {
      if (!isSameSong) { this.setSong(song); }
      this.play();
    }
  }

  handlePrevClick() {
    const currentIndex = this.state.album.songs.findIndex(song => this.state.currentSong === song);
    const newIndex = Math.max(0, currentIndex-1);
    const newSong = this.state.album.songs[newIndex];
    this.setSong(newSong);
    this.play();
  }

  handleNextClick() {
    const currentIndex = this.state.album.songs.findIndex(song => this.state.currentSong === song);
    const newIndex = Math.min(this.state.album.songs.length-1, currentIndex+1);
    const newSong = this.state.album.songs[newIndex];
    this.setSong(newSong);
    this.play();
  }

  handleTimeChange(e) {
    const newTime = this.audioElement.duration * e.target.value
    this.audioElement.currentTime = newTime;
    this.setState({ currentTime: newTime});
  }

  handleSongHover(index) {
    let isHover = this.state.isHover;
    isHover[index] = true;
    this.setState({ ...this.state, isHover })
  }

  handleSongLeave(index) {
    let isHover = this.state.isHover;
    isHover[index] = false;
    this.setState({ ...this.state, isHover})
  }

  handleVolumeChange(e) {
    const newVolume = e.target.value;
    this.audioElement.volume = newVolume;
    this.setState({ currentVolume: newVolume })
  }

  formatTime(timeSeconds) {
    if (isNaN(timeSeconds)) {
      return '-:--';
    }
    else {
      let minutes = Math.floor(timeSeconds / 60);
      let seconds = Math.floor(timeSeconds % 60);
      if (seconds < 10) {
        return minutes + ':0' + seconds; 
      } else {
        return minutes + ':' + seconds;
      }
    }
  }
  
  render() {
    return(
      <section className='album'>
        <div class="row">
          <div class="col-md-2"></div>
          <div class="col-md-8">
          <section id="album-info" class="card mx-auto" style={{'max-width': 28 +'rem'}}>
            <img id="album-cover-art" class="card-img-top" src={this.state.album.albumCover} alt={this.state.albumTitle}/>
            <div className="album-details">
              <h1 id="album-title>">{this.state.album.title}</h1>
              <h2 className="artist">{this.state.album.artist}</h2>
              <div id="release-info">{this.state.album.releaseInfo}</div>
            </div>
          </section>
          </div>
        </div>
        <div class="row mt-3">
          <div class="col-md-3"></div>
          <div class="col-md-6">
            <table id="song-list" class="table mx-auto">
              <colgroup>
                <col id="song-number-column" />
                <col id="song-title-column" />
                <col id="song-duration-column" />
              </colgroup>
              <tbody>
                {
                  this.state.album.songs.map( (song, index) => 
                    <tr className="song row" key={ index } onClick={() => this.handleSongClick(song)} onMouseEnter={() => this.handleSongHover(index)} onMouseLeave={() => this.handleSongLeave(index)}>
                      <td class="col-2">
                        <span className={ song === this.state.currentSong ? (this.state.isPlaying ? "ion-pause" : "ion-play") : (this.state.isHover[index] ? "ion-play" : null)}></span>
                        {this.state.isHover[index] || song === this.state.currentSong ? null : index + 1}
                      </td>
                      <td class="col-8">{ song.title }</td>  
                      <td class="col-2">{ this.formatTime(song.duration) }</td>
                    </tr>
                  )
                }
              </tbody>
            </table>
          </div>
        </div>
        <PlayerBar 
          isPlaying={this.state.isPlaying}
          currentSong={this.state.currentSong}
          currentTime={this.state.currentTime}
          duration={this.state.duration}
          handleSongClick={() => this.handleSongClick(this.state.currentSong)}
          handlePrevClick={() => this.handlePrevClick()}
          handleNextClick={() => this.handleNextClick()}
          formatTime={(timeSeconds) => this.formatTime(timeSeconds)}
          handleTimeChange={(e) => this.handleTimeChange(e)}
          handleVolumeChange={(e) => this.handleVolumeChange(e)}/>
      </section>
    );
  }
}

export default Album;
