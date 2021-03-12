//Navbar
//window.scrollY > 0
const navBar = document.querySelector('.navigation');

window.addEventListener('scroll', () => {
  if(window.scrollY > 0){
    navBar.classList.add('navigation__scroll')
  }else{
    navBar.classList.remove('navigation__scroll')
  }
});

const burger = document.getElementById('menu_checkbox');
const responNav = document.getElementById('respon__nav');


burger.addEventListener('click', () => {
  responNav.classList.toggle('show')
})



//Audio Player
const musicContainer = document.querySelector('#music-container');
const title = document.querySelector('#title');
const progressContainer = document.querySelector('#progress-container');
const audioProgress = document.querySelector('#audioProgress');
const preBtn = document.querySelector('#audioPre2');
const playBtn = document.querySelector('#audioPlay2');
const nextBtn = document.querySelector('#audioNext2');
const audio = document.querySelector('#audio');
const cover = document.querySelector('#cover');

const nyePlay = document.getElementById('nye');
nyePlay.addEventListener('click', e => {
  loadSong(songs[0]);
  console.log('nye')
})

const bridgePlay = document.getElementById('bridge');
bridgePlay.addEventListener('click', e => {
  loadSong(songs[1]);
  console.log('bridge')
})

const pianoPlay = document.getElementById('piano');
pianoPlay.addEventListener('click', e => {
  loadSong(songs[2]);
  console.log('piano')
})

// const oldPlay = document.getElementById('old');
// nyePlay.addEventListener('click', e => {
//   loadSong(songs[3]);
// })

const hardPlay = document.getElementById('hard');
hardPlay.addEventListener('click', e => {
  loadSong(songs[1]);
  console.log('hard')
})

const battlePlay = document.getElementById('battle');
battlePlay.addEventListener('click', e => {
  loadSong(songs[4]);
  console.log('battle')
})



//song titles
const songs = ['DJs Unite NYE 2021', 'The Bridge', 'Piano mp3', 'Our Happy Hardcore', 'Battle Of The Giants!'];

//keep track of song
let songIndex = 0;

//Intially load song details into DOM
loadSong(songs[songIndex]);


//Update song details
function loadSong(song){
  title.textContent = song;
  audio.src = `music/${song}.mp3`
  cover.src = `Images/${song}.png`
}

function playSong(){
  musicContainer.classList.add('play');
  playBtn.querySelector('i.fas').classList.remove('fa-play');
  playBtn.querySelector('i.fas').classList.add('fa-play');

  audio.play()
}

function pauseSong(){
  musicContainer.classList.remove('play');
  playBtn.querySelector('i.fas').classList.remove('fa-play');
  playBtn.querySelector('i.fas').classList.add('fa-pause');

  audio.pause()
}

function prevSong(){
  songIndex--;
  if(songIndex < 0){
    songIndex = songs.length -1;
  }
  loadSong(songs[songIndex]);

  playSong()
}

function nextSong(){
  songIndex++;
  if(songIndex > songs.length -1){
    songIndex = 0;
  }
  loadSong(songs[songIndex]);

  playSong()
}

function updateAudioProgress(e){
  const {duration, currentTime} = e.srcElement;
  const progressPercent = (currentTime / duration) * 100;
  audioProgress.style.width = `${progressPercent}%`;
}



//Event Listener
playBtn.addEventListener('click', () => {
  const isPlaying = musicContainer.classList.contains('play');
  

  if(isPlaying){
    pauseSong();
  }else {
    playSong()
  }
})

//Change song
preBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);

//Time/song update
audio.addEventListener('timeupdate', updateAudioProgress);

//click on progress bar
progressContainer.addEventListener('click', e => {
  const width = progressContainer.clientWidth;
  const clickX = e.offsetX
  const duration = audio.duration;

  audio.currentTime = (clickX / width) * duration;
})





// Video Player

const video = document.getElementById('video');
const play = document.getElementById('play');
const stop = document.getElementById('stop');
const progress = document.getElementById('progress');
const timestamp = document.getElementById('timestamp');

//Thumnail Videos
const videos = document.querySelectorAll('video');
const playIcon = document.querySelectorAll('.playIcon');

//Play and pause video
function toggleVideoStatus(){
  if(video.paused){
    video.play()
  }else {
    video.pause()
  }
}


//Update play/paues icon
function updatePlayIcon(){
  if(video.paused){
    play.innerHTML = '<i class="fa fa-play"></i>';
  }else {
    play.innerHTML = '<i class="fa fa-pause"></i>';
  }
}

//Update progress & timestamp
function updateProgress(){
 progress.value = (video.currentTime / video.duration) * 100;

 //Get the minutes
 let mins = Math.floor(video.currentTime / 60);
 if(mins < 10) {
   mins = '0' + String(mins)
 }

 //Get the seconds
 let secs = Math.floor(video.currentTime % 60);
 if(secs < 10) {
   secs = '0' + String(secs)
 }

 timestamp.innerHTML = `${mins}:${secs}`;
}

//set video time to progress
function setVideoProgress(){
  video.currentTime = (+progress.value * video.duration) / 100;
}

//Stop video
function stopVideo(){
  video.currentTime = 0;
  video.pause()
}


//Event Listeners
video.addEventListener('click', toggleVideoStatus);
video.addEventListener('pause', updatePlayIcon);
video.addEventListener('play', updatePlayIcon);
video.addEventListener('timeupdate', updateProgress);

play.addEventListener('click', toggleVideoStatus);

stop.addEventListener('click', stopVideo);

progress.addEventListener('change', setVideoProgress);


//Eventlisteners for thumbnails
playIcon.forEach(play => {
  play.addEventListener('click', e => {
    e.preventDefault()
    video.setAttribute('src', `/videos/${play.id}.mp4`)
    updatePlayIcon()
  })
});

