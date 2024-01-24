import { useEffect, useState, useRef } from "react"
import { useParams } from "react-router-dom"
import { io } from "socket.io-client"
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import {EditorView} from "@codemirror/view"

const CodeBlockPage = () => {
    //const [codeBlock, setCodeBlock] = useState([])
    const [userType, setUserType] = useState(null)
    const { id } = useParams()
    const [code, setCode] = useState("")

    // Create a mutable object that persists across renders
    const socketRef = useRef(null);
    
    useEffect(() => {
        // Create a socket connection if it doesn't exist
        if (!socketRef.current) {
            socketRef.current = io()

            socketRef.current.on('connect', () => {
                console.log('Socket connected:', socketRef.current.id);
            });
        }
        socketRef.current.on('userType', ({ userType }) => {
            console.log("userType is: ", userType)
            setUserType(userType)
        })

        socketRef.current.on('codeChange', ({ newCode }) => {
            console.log('Received codeChange event:', newCode);
            setCode(newCode);
        })

        const fetchCodeBlocks = async () =>{
            const response = await fetch(`/api/codeblocks/${id}`)
            const json = await response.json()
            
            if (response.ok) {
                //setCodeBlock(json)
                setCode(json.code);
            }
        }

        fetchCodeBlocks()

        return () => {
            socketRef.current.disconnect();
            socketRef.current = null;
        }
    }, [id])
    

    const handleCodeChange = (value) => {
        //const newCode = event.target.value;
        setCode(value)
        
        // Send a socket event to notify the server about the code change
        socketRef.current.emit('codeChange', { newCode : value });
    }

    const handleSave = async () => {
        // Send a request to update the code in the database
        const response = await fetch(`/api/codeblocks/${id}`, {
            method: "PATCH",
            body: JSON.stringify({
                code: code,
            }),
            headers: {
                "Content-Type": "application/json",
            },  
        });

        if (response.ok) {
            console.log('Code saved successfully!');
          } else {
            console.error('Failed to save code.');
          }
    };
    
    return(
        <div>
            <h1>here will be a question</h1>
            {userType === 'readOnly' ? (
                
                <div className="codeblock">
                    <CodeMirror value={code} height="200px" extensions={[javascript({ jsx: true }), EditorView.editable.of(false)]} />
                 
                </div>
            ) : (
               <div className="codeblock">

                    <CodeMirror value={code} height="200px" extensions={[javascript({ jsx: true })]} onChange={handleCodeChange}/>
                    
                    <button onClick={handleSave}>Save</button>
                </div> 
            )}
            
        </div>
    )
}

export default CodeBlockPage