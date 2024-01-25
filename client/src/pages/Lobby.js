import { useEffect, useState, useRef } from "react";

// Components
import CodeBlockDetails from '../components/codeblockdetails';

const Lobby = () => {
    // State to store codeBlocks retrieved from the server
    const [codeBlocks, setCodeBlocks] = useState([]);
    
    // Ref to store the latest value of codeBlocks after each render
    const codeBlocksRef = useRef();

    // Effect to update codeBlocksRef whenever codeBlocks changes
    useEffect(() => {
        codeBlocksRef.current = codeBlocks;
    }, [codeBlocks]);

    // Effect to fetch codeBlocks from the server on component mount
    useEffect(() => {
        const fetchCodeBlocks = async () => {
            try {
                // Fetch codeBlocks from the server
                const response = await fetch('/api/codeblocks');
                const json = await response.json();

                // Check if the response is successful
                if (response.ok) {
                    // Update the state with the fetched codeBlocks
                    setCodeBlocks(json);
                    // Log the latest value of codeBlocks (via the ref)
                    console.log("codeBlocks after setting", codeBlocksRef.current);
                }
            } catch (error) {
                console.error('Error fetching codeBlocks:', error.message);
            }
        };

        // Call the fetchCodeBlocks function
        fetchCodeBlocks();
    }, []);

    // Render the component
    return (
        <div>
            <div className='image-container'>
                <img src="photo.jpg" alt="by Anthony Garand on Unsplash" className='image'/>
            </div>
            <div className="lobby">
                <h2>Choose a code block</h2>
                <div className="codeblock">
                    {/* Map through codeBlocks and render CodeBlockDetails component for each */}
                    {codeBlocks && codeBlocks.map((codeBlock) => (
                        <CodeBlockDetails key={codeBlock._id} codeBlock={codeBlock}/>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Lobby;
