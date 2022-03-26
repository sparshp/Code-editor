import React, { useEffect, useRef, useState } from 'react';
import Codemirror from 'codemirror';
import 'codemirror/lib/codemirror.css';
//autocomplete
import 'codemirror/addon/hint/show-hint'
import 'codemirror/addon/hint/show-hint.css'
import 'codemirror/addon/hint/anyword-hint'
import 'codemirror/addon/hint/css-hint'
import 'codemirror/addon/hint/html-hint'
import 'codemirror/addon/hint/javascript-hint'

//coding Languages
import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/clike/clike';
import 'codemirror/mode/css/css';
import 'codemirror/mode/dart/dart';
import 'codemirror/mode/django/django';
import 'codemirror/mode/php/php';
import 'codemirror/mode/python/python';
import 'codemirror/mode/xml/xml';
//themes
import 'codemirror/theme/duotone-light.css';
import 'codemirror/theme/dracula.css';
import 'codemirror/theme/3024-night.css';
import 'codemirror/theme/abbott.css';
import 'codemirror/theme/eclipse.css';
import 'codemirror/theme/base16-dark.css';
import 'codemirror/theme/the-matrix.css';
import 'codemirror/theme/tomorrow-night-bright.css';



import 'codemirror/addon/edit/closetag';
import 'codemirror/addon/edit/closebrackets';
import ACTIONS from '../Actions';


const Editor = ({ socketRef, roomId, onCodeChange }) => {
   
    const [code, setCode] = useState('')
    const [theme, setTheme] = useState(' ')
    const editorRef = useRef(null);
    const len = code;
    console.log("len",len)
    console.log("code",`${code}`)
    useEffect(() => { 
        async function init() {
           editorRef.current= Codemirror.fromTextArea(document.getElementById("realtimeEditor"), {
                mode: { name: 'javascript', json: true },
                theme: 'dracula',
                autoCloseTags: true,
                autoCloseBrackets: true,
                lineNumbers: true,
                matchBrackets: true,
                extraKeys: {"Ctrl-Space": "autocomplete"},
           }
           );
            
           editorRef.current.on('change', (instance, changes) => {
            const { origin } = changes;
            const code = instance.getValue();
            onCodeChange(code);
            if (origin !== 'setValue') {
                socketRef.current.emit(ACTIONS.CODE_CHANGE, {
                    roomId,
                    code,
                });
            }
           });
            
         }

        init()
        
     }, [])

    useEffect(() => {
        if (socketRef.current) {
            socketRef.current.on(ACTIONS.CODE_CHANGE, ({ code }) => {
                if (code !== null) {
                    editorRef.current.setValue(code);
                }
            });
        }

        return () => {
            socketRef.current.off(ACTIONS.CODE_CHANGE);
        };
    }, [socketRef.current]);
    


    const handleCode = (e) => {
        const value = e.target.value;
        if (value == "clike") {
            setCode(value)
        } else if (value == "css") {
            setCode("css")
        } else if (value == "dart") {
            setCode("dart")
        } else if (value == "django") {
            setCode("django")
        } else if (value == "java") {
            setCode("java")
        } else if (value == "javascript") {
            setCode("javascript")
        } else if (value == "php") {
            setCode("php")
        } else if (value == "python") {
            setCode("python")
        } else if (value == "xml") {
            setCode("xml")
        }

        console.log("112",value)
    }
    const handleTheme = (e) => {
        const value = e.target.value;
        setTheme(value);
        console.log(theme);
    }

   
    



    return (
        <div className="editor">
            <div className="top__editor">
                <select onChange={handleCode} className="function" >
                    <option value="clike">C</option>
                    <option value="clike">C++</option>
                    <option value="css">CSS</option>
                    <option value="dart">Dart</option>
                    <option value="django">Django</option>
                    <option value="java">Java</option>
                    <option value="javascript" selected>Javascript</option>
                    <option value="php">Php</option>
                    <option value="python">Python</option>
                    <option value="xml">XML</option>
                </select>

                <select name="theme" id="" onChange={handleTheme} className="function" >
                    <option value="duotone-light">duotone-light</option>
                    <option value="3024-night">3024-night</option>
                    <option value="abbott">abbott</option>
                    <option value="dracula" selected>dracula</option>
                    <option value="ambiance">ambiance</option>
                    <option value="ayu-dark" >ayu-dark</option>
                    <option value="eclipse">eclipse</option>
                    <option value="base16-dark">base16-dark</option>
                    <option value="the-matrix" >the-matrix</option>
                    <option value="tomorrow-night-bright">tomorrow-night-bright</option>
                   
                </select>
            </div>
        <textarea id="realtimeEditor">
          
        </textarea>
            
      </div>
      
  )
}

export default Editor