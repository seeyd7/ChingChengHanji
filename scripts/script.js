const audio = new Audio( 'https://dl.dropboxusercontent.com/s/h8pvqqol3ovyle8/tom.mp3' );
audio.muted = true;

const alert_elem = document.querySelector( '.alert' );

audio.play().then( () => {
  // already allowed
  alert_elem.remove();
  resetAudio();
} )
.catch( () => {
  // need user interaction
  alert_elem.addEventListener( 'click', ({ target }) => {
    if( target.matches('button') ) {
      const allowed = target.value === "1";
      if( allowed ) {
        audio.play()
          .then( resetAudio );
      }
      alert_elem.remove();
    }
  } );
} );

document.getElementById( 'btn' ).addEventListener( 'click', (e) => {
  if( audio.muted ) {
    console.log( 'silent notification' );
  }
  else {
    audio.play();
  }
} );

function resetAudio() {
  audio.pause();
  audio.currentTime = 0;
  audio.muted = false;
}