import React, { useState, useEffect } from 'react'
import { createFFmpeg, fetchFile } from '@ffmpeg/ffmpeg'
import './App.css'

const ffmpeg = createFFmpeg({log: true});
function App() {
  const [ready, setReady] = useState(false);
  const [video, setVideo] = useState();
  const [gif, setGif] = useState();

  const load = async () => {
    await ffmpeg.load();
    setReady(true);
    console.log(ffmpeg)
  }

  const convertToGif = async () => {
    ffmpeg.FS('writeFile', 'test.mp4', await fetchFile(video));
    await ffmpeg.run('-i', 'test.mp4', '-t', '2.5', '-ss', '2.0', '-f', 'gif', 'out.gif');
    const data = ffmpeg.FS('readFile', 'out.gif');
    const url = URL.createObjectURL(new Blob([data.buffer], {type: 'image/gif'}));
    setGif(url)
  }

  useEffect(() => {
    load();
  }, [])

  return (<>
    {ready ?
    <div className='app'>
      {video && <video controls width="500" src={URL.createObjectURL(video)}></video>}
      <input type='file' onChange={(event) => setVideo(event.target.files?.item(0))}></input>
      <h3>Result</h3>
      <button onClick={convertToGif}>Convert</button>
      { gif && <img src={gif} width="250" />}
    </div>
    
    : <p>Loading...</p>}
  </>)
}

export default App
