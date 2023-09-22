import { useState, useCallback, useEffect,useRef } from 'react'
import './App.css'

function App() {
  const [length, setLength] = useState(8)
  const [numallowed, setnumAllowed] = useState(false)
  const [charAllowed, setcharAllowed] = useState(false)
  const [password, setPassword] = useState("")
  const paswdRef=useRef(null)
  const paswdgen = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if (numallowed) str += "0123456789"
    if (charAllowed) str += "()!@#$%^&*[]|"
    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)
    }
    setPassword(pass)

  }, [length, numallowed, charAllowed, setPassword])
  const copyPaswdToClip = useCallback(()=>{
    paswdRef.current?.select();
    paswdRef.current?.setSelectionRange(0,99);
    window.navigator.clipboard.writeText(password)
  },[password])
  
  useEffect(() => { paswdgen() }, [length, numallowed, charAllowed, paswdgen])

  return (
      <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-800 text-orange-500'>
      <h1 className='text-white text-center my-3'>Password Generator</h1>
      <div className='outline-none w-full py-1 px-1'  >
        <input
          type="text"
          value={password}
          className='outline-none w-full py-1 px-3'
          placeholder='password'
          readOnly
          ref={paswdRef}
        />
        <button 
          onClick={copyPaswdToClip}
          className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0' > Copy</button>

      </div>
      <div className='flex text-sm gap-x-2'>
        <div className='flex items-center gap-x-1'
        >
          <input
            type="range"
            min={6}
            max={100}
            value={length}
            className='cursor-pointer'
            onChange={(e) => { setLength(e.target.value) }}
          />
          <label>length:{length}</label>

        </div>
        <div className="flex items-center gap-x-1">
          <input
            type="checkbox"
            defaultChecked={numallowed}
            id="numberinput"
            onChange={() => {
              setnumAllowed((prev) => !prev);
            }}
          />
          <label className="flex items-center gap-x-1">Number</label>
        </div>
        <div className="flex items-center gap-x-1">
          <input
            type="checkbox"
            defaultChecked={charAllowed}
            id="numberinput"
            onChange={() => {
              setcharAllowed((prev) => !prev);
            }}
          />
          <label className="flex items-center gap-x-1">Character</label>
        </div>
      </div>

    </div>
      
     
  )
}
export default App