import React from 'react';
import { useState } from 'react';
import smile from '../../../assets/emoji/sadness.png';
import Emoji from './Emoji';

const EmojiTest = props => {

    const[input, setInput] = useState("some text");
    const test = () =>{
    return <Emoji symbol="😘" label="sheep"/>
}
    return  <>
                <button onClick = {() => setInput(test())}>add emoji</button>
                <input type="text" value = {input} onChange = {(e)=> setInput(e.target.value)}/>
                <img src = {smile} width = "30px" alt = "emoji"/>
            </>
}
  
;
export default EmojiTest;