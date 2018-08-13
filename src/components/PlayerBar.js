import React, { Component } from 'react';

class PlayerBar extends Component {
    render() {
        return (
            <section className="player-bar bg-light">
                <div class="row">
                    <section id="buttons" class="col-sm">
                        <button id="previous" onClick={this.props.handlePrevClick} class="btn btn-secondary">
                            <span className="ion-skip-backward"></span>
                        </button>
                        <button id="play-pause" onClick={this.props.handleSongClick} class="btn btn-primary">
                            <span className={this.props.isPlaying ? 'ion-pause' : 'ion-play'}></span>
                        </button>
                        <button id="next" onClick={this.props.handleNextClick} class="btn btn-secondary">
                            <span className="ion-skip-forward"></span>
                        </button>
                    </section>
                </div>
                <div class="row">
                    <section class="col-sm-3"></section>
                    <section id="time-control" class="col-sm-3">
                        <div className="current-time">{this.props.formatTime(this.props.currentTime)}</div>
                        <input
                            type="range"
                            className="seek-bar"
                            value={this.props.currentTime / this.props.duration || 0}
                            max="1"
                            min="0"
                            step="0.01"
                            onChange={this.props.handleTimeChange}
                        />
                        <div className="total-time">{this.props.formatTime(this.props.duration)}</div>
                    </section>
                    <section id="volume-control" class="col-sm-3">
                        <div className="icon ion-volume-low"></div>
                        <input
                            type="range"
                            className="seek-bar"
                            value={this.props.currentVolume}
                            max="1"
                            min="0"
                            step="0.01"
                            onChange={this.props.handleVolumeChange}
                        />
                        <div className="icon ion-volume-high"></div>
                    </section>
                    <section class="col-sm-3"></section>
                </div>
            </section>
        );
    }
}

export default PlayerBar;