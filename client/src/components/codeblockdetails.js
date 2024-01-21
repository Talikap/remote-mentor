const CodeBlockDetails = ({ codeBlock}) => {
    return(
        <div className="details">
            <h4>{codeBlock.title}</h4>
            <p>{codeBlock.code}</p>
            <p>{codeBlock.timestamps}</p>
        </div>
    )
}

export default CodeBlockDetails