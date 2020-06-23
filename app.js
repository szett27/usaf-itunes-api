const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const artistInfo = require('./artist.json')
const artistVideo = require('./artistVideo.json')
const { domain } = require('process');
const fs = require('fs');


app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

const port = 3100
app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))

// Download music data for a single artist (of your choosing) and create the following endpoints for your API
// List all songs
app.get('/:artist/songs/', (req, res)=>{

    if(req.query.songName){
    let requestedSong = req.query.songName
    let song = artistInfo.results.find(track=> track.trackName === requestedSong)
    res.send(`Artist: ${req.params.artist}\n
            Song: ${song.trackId}`)

    } else{
    let songArray = artistInfo.results.map(info=>{
        return info.trackName;
    })
    res.send(`Artist: ${req.params.artist}\n
            Songs: ${songArray}`)
 }

})


// Find song by id
app.get('/:artist/songs/:id', (req, res)=>{
    let requestedID = req.params.id
    let song = artistInfo.results.find(track=> track.trackId === parseInt(requestedID))
    res.send(`Artist: ${req.params.artist}\n
            Song: ${song}`)
})


// Find songs by album id (collection id)
app.get('/:artist/albums/:id', (req, res)=>{
    let requestedID = req.params.id
    let album = artistInfo.results.filter(track=> track.collectionId === parseInt(requestedID))

    let songArray = album.map(info=>{
        return info.trackName;
    })

    res.send(`Artist: ${req.params.artist}\n
            Songs: ${songArray} `)
})


// Find songs by album name (collection name)
app.get('/:artist/albums/album/:name', (req, res)=>{
    let requestedAlbum = req.params.name;
    let album = artistInfo.results.filter(track=> track.collectionName === requestedAlbum)
    let songArray = album.map(info=>{
        return info.trackName;
    })

    res.send(`Artist: ${req.params.artist}\n
            Songs: ${songArray} `)
})

// Update song information by id

app.post('/:artist/songs/', (req, res)=>{
    let song = artistInfo.results.find(track=> track.trackId === req.body.id)
    song.trackName = song.trackName + " featured by: Little Wayne";
    console.log(`Song: ${song.trackName}`)
    fs.writeFileSync('./artist.json', JSON.stringify(artistInfo))
    res.send("Updated track info")

})

// Delete a song by id
app.delete('/:artist/songs/', function (req, res) {
    let song = artistInfo.results.find(track=> track.trackId === req.body.id)

    let indexOfSong = artistInfo.results.indexOf(song)
    console.log(`Index ${indexOfSong}`)
    artistInfo.results.splice(indexOfSong, 1)
    fs.writeFileSync('./artist.json', JSON.stringify(artistInfo))
    res.send(`Got a DELETE request for ${req.body.id}`)

  })


// Add a new song
app.post('/:artist/songs/song', (req, res)=>{
    artistInfo.results.push(req.body)
    res.send("Song Updated")
    fs.writeFileSync('./artist.json', JSON.stringify(artistInfo))

})

//Goal 2a
app.get('/:id', (req, res)=>{
    let requestedID = req.params.id
    let album = artistInfo.results.filter(track=> track.artistId === parseInt(requestedID))

    let songArray = album.map(info=>{
        return info.trackName;
    })

    res.send(`Songs: ${songArray} `)
})


//Goal 2b
app.get('/artists/:name', (req, res)=>{
    let requestedName = req.params.name
    let album = artistInfo.results.filter(track=> track.artistName === requestedName)

    let songArray = album.map(info=>{
        return info.trackName;
    })

    res.send(`Songs: ${songArray} `)
})


//Goal 3
app.get('/:artist/videos/', (req, res)=>{

    if(req.query.videoName){
    let requestedVideo = req.query.videoName
    let song = artistVideo.results.find(track=> track.trackName === requestedVideo)
    res.send(`Artist: ${req.params.artist}\n
            Song: ${song.trackId}`)

    } else{
    let VideoArray = artistVideo.results.map(info=>{
        return info.trackName;
    })
    res.send(`Artist: ${req.params.artist}\n
            Videos: ${VideoArray}`)
 }

})


// Find song by id
app.get('/:artist/videos/:id', (req, res)=>{
    let requestedID = req.params.id
    let video = artistVideo.results.find(track=> track.trackId === parseInt(requestedID))
    res.send(`Artist: ${req.params.artist}\n
            Song: ${video.trackName}`)
})


// Find songs by album id (collection id)
app.get('/:artist/albums/videos/:id', (req, res)=>{
    let requestedID = req.params.id
    let album = artistVideo.results.filter(track=> track.collectionId === parseInt(requestedID))

    let songArray = album.map(info=>{
        return info.trackName;
    })

    res.send(`Artist: ${req.params.artist}\n
            Songs: ${songArray} `)
})


// Find songs by album name (collection name)
app.get('/:artist/albums/album/:name', (req, res)=>{
    let requestedAlbum = req.params.name;
    let album = artistInfo.results.filter(track=> track.collectionName === requestedAlbum)
    let songArray = album.map(info=>{
        return info.trackName;
    })

    res.send(`Artist: ${req.params.artist}\n
            Songs: ${songArray} `)
})

// Update song information by id
app.post('/:artist/videos/video/', (req, res)=>{
    let song = artistVideo.results.find(track=> track.trackId === req.body.id)
    song.trackName = song.trackName + " featured by: Little Wayne";
    fs.writeFileSync('./artistVideo.json', JSON.stringify(artistVideo))
    res.send("Updated track info")

})

// Delete a video by id
app.delete('/:artist/videos/', function (req, res) {
    let video = artistInfo.results.find(track=> track.trackId === req.body.id)

    let indexOfVideo = artistVideo.results.indexOf(video)
    artistVideo.results.splice(indexOfVideo, 1)
    artistVideo.resultCount = artistVideo.results.length
    fs.writeFileSync('./artistVideo.json', JSON.stringify(artistVideo))
    res.send(`Got a DELETE request for ${req.body.id}`)

  })


// Add a new song
app.post('/:artist/videos', (req, res)=>{
    artistVideo.results.push(req.body)
    fs.writeFileSync('./artistVideo.json', JSON.stringify(artistVideo))
    res.send("Video Updated")
    

})


