import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { io } from "socket.io-client";
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { EditorView } from "@codemirror/view";
import { tokyoNightStorm } from '@uiw/codemirror-theme-tokyo-night-storm';

const CodeBlockPage = () => {
    const [userType, setUserType] = useState(null);
    const { id } = useParams();
    const [code, setCode] = useState("");
    const [question, setQuestion] = useState("");
    const [loading, setLoading] = useState(true); // Added loading state

    // Create a mutable object that persists across renders
    const socketRef = useRef(null);
    
    useEffect(() => {
        // Create a socket connection if it doesn't exist
        if (!socketRef.current) {
            socketRef.current = io();

            socketRef.current.on('connect', () => {
                console.log('Socket connected:', socketRef.current.id);
            });
        }

        // Listen for 'userType' event from the server
        socketRef.current.on('userType', ({ userType }) => {
            setUserType(userType);
        });

        // Listen for 'codeChange' event from the server
        socketRef.current.on('codeChange', ({ newCode }) => {
            setCode(newCode);
        });

        const fetchCodeBlocks = async () => {
            try {
                const response = await fetch(`/api/codeblocks/${id}`);
                const json = await response.json();
                
                if (response.ok) {
                    setQuestion(json.question);
                    setCode(json.code);
                }
            } finally {
                setLoading(false); // Set loading to false once data is loaded
            }
        };

        fetchCodeBlocks();

        return () => {
            // Disconnect socket when component unmounts
            socketRef.current.disconnect();
            socketRef.current = null;
        };
    }, [id]);

    const handleCodeChange = (value) => {
        setCode(value);
        // Send a socket event to notify the server about the code change
        socketRef.current.emit('codeChange', { newCode: value });
    };

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
    
    return (
        <div className="codeblock-page">
            {loading ? (
                <span class="loader">L &nbsp; ading</span>
            ) : (
                <>
                    <h3>{question}</h3>
                    {userType === 'readOnly' ? (
                        <div className="codeblock">
                            <CodeMirror value={code} height="200px" theme={tokyoNightStorm} extensions={[javascript({ jsx: true }), EditorView.editable.of(false)]} />
                        </div>
                    ) : (
                        <div className="codeblock">
                            <CodeMirror value={code} height="200px" theme={tokyoNightStorm} extensions={[javascript({ jsx: true })]} onChange={handleCodeChange}/>
                            <button onClick={handleSave}>Save</button>
                        </div> 
                    )}
                </>
            )}
        </div>
    );
};

export default CodeBlockPage;
