import React, { useState, useEffect } from 'react'
import { createFFmpeg, fetchFile } from '@ffmpeg/ffmpeg'
import './App.css'

function App() {
  const [ready, setReady] = useState(false);
  const [video, setVideo] = useState();

  const ffmpeg = createFFmpeg({ log: true });

  const load = async () => {
    await ffmpeg.load();
    setReady(true);
  }

  useEffect(() => {
    load();
  }, [])

  return (<>
    {ready ?
    <div className='app'>
      <input type='file' onChange={(event) => setVideo(event.target.files?.item(0))}></input>
    </div>
    
    : <p>Loading...</p>}
  </>)
}

export default App
