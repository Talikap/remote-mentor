import { useEffect, useState } from "react"

//components
import CodeBlockDetails from '../components/codeblockdetails'

const Lobby = () =>{
    const [codeBlocks, setCodeBlocks] = useState([])
    console.log("codeBlocks before setting",codeBlocks)
    useEffect(() => {
        const fetchCodeBlocks = async () =>{
            const response = await fetch('/api/codeblocks')
            const json = await response.json()
            
            if (response.ok) {
                console.log("response is ok")
                setCodeBlocks(json)
                console.log(codeBlocks)
            }
        }
        fetchCodeBlocks()
    }, [])
    return(
        <div className="lobby">
            <h1>Choose code block</h1>
            <div className="codeblock">
                {codeBlocks && codeBlocks.map((codeBlock) => (
                    <CodeBlockDetails key={codeBlock._id} codeBlock={codeBlock}/>
                ))}
            </div>
        </div>

    )
}

export default Lobby