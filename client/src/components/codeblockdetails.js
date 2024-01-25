import React from 'react';
import { Link } from 'react-router-dom';

const CodeBlockDetails = ({ codeBlock }) => {
    return (
        <Link to={`/codeblockpage/${codeBlock._id}`} className="codeblock-details-link">
          <div className="codeblock-details">
            <h4>{codeBlock.title}</h4>
          </div>
        </Link>
      );
}

export default CodeBlockDetails