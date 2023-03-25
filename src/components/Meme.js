import React from 'react'
export default function Meme() {
  
  const [meme,setMeme] = React.useState({
    topText : "",
    bottomText : "",
    randomimg : "https://i.imgflip.com/30b1gx.jpg"
  })
  const [allMemes, setAllMemes] = React.useState("https://i.imgflip.com/30b1gx.jpg")
    
    React.useEffect(() => {
        fetch("https://api.imgflip.com/get_memes")
            .then(res => res.json())
            .then(data => setAllMemes(data.data.memes))
    }, [])
    /* 
     React.useEffect(() => {
        async function getMemes() {
            const res = await fetch("https://api.imgflip.com/get_memes")
            const data = await res.json()
            setAllMemes(data.data.memes)
        }
        getMemes()
    }, [])
    */
    function getmemeImg() {
        const randomNumber = Math.floor(Math.random() * allMemes.length)
        const url = allMemes[randomNumber].url
        setMeme(prevMeme => ({
            ...prevMeme,
            randomImage: url
        }))
        
    }
    function handleChange(event) {
        const {name, value} = event.target
        setMeme(prevMeme => ({
            ...prevMeme,
            [name]: value
        }))
    }
  return (
    <div>
      <div className='form'>
        <div>
            <input 
              type="text" 
              placeholder='Top Text'
              className='form--input'
              name='topText'
              value={meme.topText} 
              onChange={handleChange}
            />
            <input 
              type="text" 
              placeholder='Bottom Text'
              className='form--input'
              name='bottomText'
              value={meme.bottomText} 
              onChange={handleChange}
            />
        </div>
        <div>
            <button type='submit' onClick={getmemeImg}>Generate a new Meme Image</button>
        </div>
        <div >
            <img src={meme.randomImage} alt="the _momo" className='meme-img' />
            <h2 className='meme--text top'>{meme.topText}</h2>
            <h2 className='meme--text bottom'>{meme.bottomText}</h2>
        </div>
      </div>
    </div>
  )
}

