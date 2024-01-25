import { useEffect, useState, useRef } from "react";

// components
import CodeBlockDetails from '../components/codeblockdetails';

const Lobby = () => {
    const [codeBlocks, setCodeBlocks] = useState([]);
    const codeBlocksRef = useRef();

    useEffect(() => {
        codeBlocksRef.current = codeBlocks;
    }, [codeBlocks]);

    useEffect(() => {
        const fetchCodeBlocks = async () => {
            const response = await fetch('/api/codeblocks');
            const json = await response.json();

            if (response.ok) {
                setCodeBlocks(json);
                console.log("codeBlocks after setting", codeBlocksRef.current);
            }
        };

        fetchCodeBlocks();
    }, []);

    return (
        <div>
            <div className='image-container'>
                <img src="photo.jpg" alt="by Anthony Garand on Unsplash" className='image'/>
            </div>
            <div className="lobby">
                <h2>Choose a code block</h2>
                <div className="codeblock">
                    {codeBlocks && codeBlocks.map((codeBlock) => (
                        <CodeBlockDetails key={codeBlock._id} codeBlock={codeBlock}/>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Lobby;
