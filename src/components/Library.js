import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import albumData from './../data/albums';

class Library extends Component {
  constructor(props) {
    super(props);
    this.state = { albums: albumData };
  }
  render() {
    return (
      <section className="library">
        {
          this.state.albums.map( (album, index) =>
            <Link to={`/album/${album.slug}`} key={index}>
              <div class="row mt-3">
              <div class="col-md-2"></div>
                <div class="col-md-8">
                  <div class="card mx-auto" style={{'max-width': 30 +'rem'}}>
                    <img src={album.albumCover} alt={album.title} class="card-img-top"/>
                    <div>{album.title}</div>
                    <div>{album.artist}</div>
                    <div>{album.songs.length} songs</div>
                  </div>
                </div>
              </div>
            </Link>
          )
        }
      </section>
    );
  }
}

export default Library;
