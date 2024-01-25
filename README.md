# Remote Mentor

**Remote Mentor** is an online coding web application that facilitates real-time collaborative coding sessions between a mentor and students. The application includes a Lobby page for choosing code blocks and a Code Block page for viewing and editing code.

## Link deployed website

https://remote-mentor.onrender.com/

## Features

- **Lobby Page:**
  - Lists code blocks.
  - Clicking on a code block takes the user to the Code Block page.

- **Code Block Page:**
  - Two users enter the page: a mentor (first user) and a student (subsequent users).
  - Mentor sees the selected code block in read-only mode.
  - Student sees the code block with the ability to make real-time code changes.
  - Code changes are displayed in real-time using Socket.io.
  - Utilizes codeMirror library for syntax highlighting (JS code only).

## Getting Started

### Prerequisites

Make sure you have the following installed on your machine:

- Node.js
- npm (Node Package Manager)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/remote-mentor.git
   cd remote-mentor

2. Install dependencies listed in the package.json

3. Add a Database

    - Ensure MongoDB is installed and running.
    - Create the necessary documents in the database.
    - Add the MongoDB connection string to your .env file.MONGO_URI=your-mongodb-connection-string 

3. Start server 
    ```bash
    npm start


4. Start server 
    ```bash
    npm start


### Usage
1.Access the Lobby page to choose a code block.
2.Click on a code block to enter the Code Block page.
3.Open two windows for real-time collaboration begins with the mentor and student.