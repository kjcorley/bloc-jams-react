import React from 'react';

const Landing = () => (
  <section className="landing">
    <h1 className='hero-title display-4'>Turn the music up!</h1>
    <section className='selling-points row'>
      <div class="col-xl-4">
        <div className='point jumbotron bg-dark text-light col-xl-12'>
          <h2 className='point-title'>Choose your music</h2>
          <p className='point-description'>The world is full of music; why should you have to listen to music that someone else chose?</p>
        </div>
      </div>
      <div class="col-xl-4">
        <div className='point jumbotron bg-dark text-light col-xl-12'>
          <h2 className='point-title'>Unlimited, streaming, ad-free</h2>
          <p className='point-description'>No arbitrary limits. No distractions.</p>
        </div>
      </div>
      <div class="col-xl-4">
        <div className='point jumbotron bg-dark text-light col-xl-12'>
          <h2 className='point-title'>Mobile enabled</h2>
          <p className='point-description'>Listen to your music on the go. This streaming service is available on all mobile platforms.</p>
        </div>
      </div>
    </section>
  </section>
);

export default Landing;
