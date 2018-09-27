import Sound from 'react-native-sound';
Sound.setCategory('Playback', true);

Array.prototype.sample = function(){
  return this[Math.floor(Math.random()*this.length)];
}

const soundNames = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];

const sounds = soundNames.map(s => new Sound(`${s}.mp3`, Sound.MAIN_BUNDLE, (error) => {
  if (error) {
    console.log('failed to load the sound', error);
    return;
  }
  // loaded successfully
}));

const endSound = new Sound('slut.mp3', Sound.MAIN_BUNDLE, (error) => {
  if (error) {
    console.log('failed to load the ending sound', error);
    return;
  }
});

export default {
  playRandomSound: () => {
    const sound = sounds.sample();
    sound.setVolume(5);
    sound.play((success) => {
      if (success) {
        sound.stop();
        console.log('successfully finished playing');
      } else {
        console.log('playback failed due to audio decoding errors');
        // reset the player to its uninitialized state (android only)
        // this is the only option to recover after an error occured and use the player again
        sound.reset();
      }
    })
  },
  playEndSound: () => {
    const sound = endSound;
    sound.setVolume(5);
    sound.play((success) => {
      if (success) {
        sound.stop();
        console.log('successfully finished playing');
      } else {
        console.log('playback failed due to audio decoding errors');
        // reset the player to its uninitialized state (android only)
        // this is the only option to recover after an error occured and use the player again
        sound.reset();
      }
    })
  }
}