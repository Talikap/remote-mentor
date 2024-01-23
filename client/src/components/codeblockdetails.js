import React from 'react';
import { Link } from 'react-router-dom';

const CodeBlockDetails = ({ codeBlock }) => {
    return(
        <div className="details">
            <h4>
                <Link to={`/codeblockpage/${codeBlock._id}`}>{codeBlock.title}</Link>
            </h4>
        </div>
    )
}

export default CodeBlockDetails