import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import download from "downloadjs";
import { toPng, toJpeg, toBlob, toPixelData, toSvg } from "html-to-image";

export default function Meme() {
  const [meme, setMeme] = useState({
    topText: "",
    bottomText: "",
    randomImage: "http://i.imgflip.com/1bij.jpg",
  });
  const [allMemes, setAllMemes] = useState([]);
  const ref = useRef(null); // Use useRef without specifying the type.
  const [color, setColor] = useState("white");
  const mystyle = {
    fontSize: 35,
    color: color,
  };

  const handleClick = useCallback(async () => {
    if (ref.current) {
      download(await toJpeg(ref.current), "test.jpg");
      
    }
  }, []);

  useEffect(() => {
    async function getMemes() {
      const res = await fetch("https://api.imgflip.com/get_memes");
      const data = await res.json();
      setAllMemes(data.data.memes);
    }
    getMemes();
  }, []);

  function getMemeImage() {
    const randomNumber = Math.floor(Math.random() * allMemes.length);
    const url = allMemes[randomNumber].url;
    setMeme((prevMeme) => ({
      ...prevMeme,
      randomImage: url,
    }));
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setMeme((prevMeme) => ({
      ...prevMeme,
      [name]: value,
    }));
  }

  return (
    <main>
      
      <div ref={ref} className="meme">
        
        <img src={meme.randomImage} className="meme--image" alt="Meme" />
        <h2 className="meme--text top" style={mystyle}>{meme.topText}</h2>
        <h2 className="meme--text bottom" style={mystyle}>{meme.bottomText}</h2>
        
      </div>
      <div className="form">
        <input
          type="text"
          placeholder="Top text"
          className="form--input"
          name="topText"
          value={meme.topText}
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="Bottom text"
          className="form--input"
          name="bottomText"
          value={meme.bottomText}
          onChange={handleChange}
        />
        
      </div>
      <div className="color-btn">
      <button onClick={() => setColor("Red")} className="red-btn"></button>
      <button onClick={() => setColor("White")} className="white-btn"></button>
      <button onClick={() => setColor("Blue")} className="blu-btn"></button>
      </div>
      <div className="btn-display">
      <button className="form--button" onClick={getMemeImage}>
          Get a new meme image 🖼
        </button>
        <button onClick={handleClick} className="form--button">
          Download Meme <i class="uil uil-download-alt"></i>
        </button>
        </div>
    </main>
  );
}
