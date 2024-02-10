const now_playing = document.querySelector('.now-playing')
const track_art = document.querySelector('.track-art')
const track_name = document.querySelector('.track-name')
const track_artist = document.querySelector('.track-artist')

const playpause_btn = document.querySelector('.playpause-track')
const next_btn = document.querySelector('.next-track')
const prev_btn = document.querySelector('.prev-track')

const seek_slider = document.querySelector('.seek_slider')
const volume_slider = document.querySelector('.volume_slider')
const curr_time = document.querySelector('.current-time')
const total_duration = document.querySelector('.total-duration')
const wave = document.getElementById('wave')
const randomIcon = document.querySelector('.random-track')
let curr_track = document.createElement('audio')

let track_index = 0
let isRandom = false
let isPlaying = false
let updateTimer

const musicList = [
    {
        img: 'images/Heal.jpg',
        name: 'Heal',
        artist: 'Tom Odell',
        music: 'music/Heal.mp3'
    },
    {
        img: 'images/Falling.jpg',
        name: 'Falling',
        artist: 'Trevor Daniel',
        music: 'music/Falling.mp3'
    },
    {
        img: 'images/Cannon_Beach.jpg',
        name: 'Cannon_Beach',
        artist: 'David Kushner',
        music: 'music/Cannon_Beach.mp3'
    },
]

loadTrack(track_index)

function loadTrack(track_index){
    clearInterval(updateTimer)
    reset()

    curr_track.src = musicList[track_index].music
    curr_track.load()

    track_art.style.backgroundImage = `url("${musicList[track_index].img}")`
    track_name.textContent = musicList[track_index].name
    track_artist.textContent = musicList[track_index].artist
    now_playing.textContent = `Playing music ${track_index +1} of ${musicList.length}`

    updateTimer = setInterval(setUpdate, 1000)
    
    curr_track.addEventListener('ended', nextTrack)
    random_bg_color()
}

function random_bg_color(){
    let hex = ['0','1','2','3','4','5','6','7','8','9','A','B','C','D','E','F']
    // let a 

    function populate (a){
        for(let i=0; i<6; i++){
            let x = Math.round(Math.random() * 14)
            let y = hex[x]
            a+=y
        }
        return a
    }
    function ang(){
        let angs = ['0deg', '45deg', '90deg', '135deg', '180deg', '225deg', '270deg', '315deg']
        let z = Math.round(Math.random() * 7)
        let w = angs[z]
        return w
    } 

    let color1 = populate('#')
    let color2  = populate('#')
    let angle = ang()

    let gradient = 'linear-gradient('+ angle + ',' + color1 + ',' + color2 + ')'
    document.querySelector('body').style.background = gradient
}

function reset(){
    curr_time.textContent = '00:00'
    total_duration.textContent = '00:00'
    seek_slider.value = 0
}
function randomTrack(){
     isRandom? pauseRandom() : playRandom()
}
function playRandom(){
    isRandom = true
    randomIcon.classList.add('randomActive')
}
function pauseRandom(){
    isRandom = false
    randomIcon.classList.remove('randomActive')
}
function repeatTrack(){
    let current_index = track_index
    loadTrack(current_index)
    playTrack()
}
function playpauseTrack(){
    isPlaying? pauseTrack() : playTrack()
}
function playTrack(){
    curr_track.play()
    isPlaying = true
    track_art.classList.add('rotate')
    wave.classList.add('loader')
    playpause_btn.innerHTML = `<i class="fa fa-pause-circle fa-2x"></i>`
}
function pauseTrack(){
    curr_track.pause()
    isPlaying = false
    track_art.classList.remove('rotate')
    wave.classList.remove('loader')
    playpause_btn.innerHTML = `<i class="fa fa-play-circle fa-2x"></i>`
}
function nextTrack(){
    if(track_index < musicList.length - 1 && isRandom == false){
        track_index+=1
    }else if(track_index < musicList.length - 1 && isRandom == true){
        let random = Number.parseInt(Math.random() * musicList.length)
        track_index = random
    }else{
        track_index = 0
    }
    loadTrack(track_index)
    playTrack()
}
function prevTrack(){
    if(track_index > 0){
        track_index-=1
    }else{
        track_index = musicList.length - 1
    }
    loadTrack(track_index)
    playTrack()
}
function seekTo(){
    let seekto = curr_track.duration * (seek_slider.value / 100)
    curr_track.currentTime = seekto
}
function setVolume(){
    curr_track.volume = volume_slider.value/100
}
function increaseVol(){
    volume_slider.value ++
    curr_track.volume = (volume_slider.value/100)
}
function decreaseVol(){
    volume_slider.value --
    curr_track.volume = (volume_slider.value/100)
}
function setUpdate(){
    let seekPosition = 0
    if(!isNaN(curr_track.duration)){
        seekPosition = curr_track.currentTime *(100 / curr_track.duration)
    }
    seek_slider.value = seekPosition

    let currentMinutes = Math.floor(curr_track.currentTime / 60)
    let currentSeconds = Math.floor(curr_track.currentTime - currentMinutes * 60)
    let durationMinutes = Math.floor(curr_track.duration / 60)
    let durationSeconds = Math.floor(curr_track.duration - durationMinutes * 60)

    if(currentMinutes < 10){currentMinutes = '0' + currentMinutes}
    if(currentSeconds < 10){currentSeconds = '0' + currentSeconds}
    if(durationMinutes < 10){durationMinutes = '0' + durationMinutes}
    if(durationSeconds < 10){durationSeconds = '0' + durationSeconds}

    curr_time.textContent = currentMinutes + ':' + currentSeconds
    total_duration.textContent = durationMinutes + ':' + durationSeconds
}