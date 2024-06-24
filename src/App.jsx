import { useCallback, useEffect, useState, useRef } from 'react'

import './App.css'

function App() {

  const [length, setLength] = useState(8)
  const [numberAllowed, setNumberAllowed] = useState(false)
  const [charAllowed, setCharAllowed] = useState(false)
  const [password, setPassword] = useState("")

  const [copy, setCopy] = useState(null)

  const passwordRef = useRef(null)

  const passwordGenerator = useCallback(() => {
    let password = ""
    let string = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    // If numbers are Allowed it will add numbers in string
    if(numberAllowed) string += "0123456789"

    // if characters are alowed it will add characters in string
    if(charAllowed) string += "!@#$%^&*_-=?"

    for (let index = 0; index < length; index++) {
      let char = Math.floor(Math.random() * string.length + 1)
      password += string.charAt(char)
      setPassword(password)      
    }

  }, [length, numberAllowed, charAllowed, setPassword])
  

  const copyPasswordToClipboard = useCallback(() => {
    window.navigator.clipboard.writeText(password)
    setTimeout(() => {
      setCopy('Copied!')
      passwordRef.current?.select()
    }, 500)

    setTimeout(() => {
      setCopy('')
    }, 2500)
  })


  // These will refresh the page due to every change because of these specific fields
  useEffect(() =>{
    passwordGenerator();

  }, [length, numberAllowed, charAllowed, passwordGenerator])

  return (
    <>
      <div className="mainContainer w-full h-screen bg-zinc-900 text-white">

        <div className="container w-[30vw] h-80 bg-zinc-800 border-[1px] border-zinc-600 rounded-md absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-2">

          <h1 className='text-center font-semibold text-3xl text-blue-600 mt-3 rounded-md bg-zinc-700/30 w-full py-2'>Password Generator</h1>
          
          <div className="flex flex-col items-center justify-center mx-5">

            <div className="password-copyBtn w-full mt-[6vh] flex relative">
              <input type="text"
                value={password}
                ref={passwordRef}
                placeholder='Password'
                className='w-full
                  readOnly 
            bg-white py-3 rounded-md px-4 outline-none rounded-r-none text-blue-500 font-semibold text-3xl'
              />
              <button onClick={copyPasswordToClipboard} className="copy bg-blue-500 rounded-md px-3 text-xl font-semibold py-3 rounded-l-none">Copy</button>
            <p className='absolute top-[-45px] right-0 font-medium text-white p-2 rounded-md flex items-center justify-center'>{copy}</p>
            </div>

            <div className="tools flex gap-5 mt-10 flex-wrap">

              <div className="range flex items-center gap-3">
                <label>Length: {length}</label>
                <input type="range"
                  name="passLength"
                  id="passLength"
                  min={6} max={100}
                  className='cursor-pointer' 
                  onClick={(e) => {setLength(e.target.value)}}/>
              </div>

              <div className="numberCheck flex items-center gap-3">
              <label className='font-semibold'>Numbers</label>
              <input type="checkbox"  
              id="numberInput"
              defaultChecked = {numberAllowed}
              onChange={() => {setNumberAllowed(
                (prev) => !prev 
              )}} />
              </div>

              <div className="charCheck flex items-center gap-3">
              <label className='font-semibold'>Characters</label>
              <input type="checkbox"
              id="characterInput" 
              defaultChecked = {charAllowed}
              onChange={() => {setCharAllowed(
                (prev) => !prev 
              )}} />
              </div>

            </div>

          </div>
        </div>
      </div>
    </>
  )
}

export default App
