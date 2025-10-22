# 🧠 HNG Stage 1 — String Analyzer API

This project was built as part of the **HNG 13 Backend Internship (Stage 1 Task)**.  
It’s a RESTful API that receives a string, analyzes it, computes specific properties, stores the result in MongoDB, and allows retrieval, filtering, and deletion through various endpoints.

---

## 🚀 Features

- Analyze and store strings in MongoDB
- Compute the following properties:
  - ✅ Length
  - ✅ Palindrome check (case-insensitive)
  - ✅ Unique character count
  - ✅ Word count
  - ✅ SHA-256 hash for unique identification
  - ✅ Character frequency map
- Retrieve individual strings by value
- Filter all stored strings using query parameters
- Delete specific strings from the system
- Proper error handling and status codes
- Built using **Node.js**, **Express**, and **MongoDB**

---

## 🧩 Folder Structure
```
HNG-STAGE-1/

│── src/
│ ├── controller/
│ │ └── stringController.js
│ ├── model/
│ │ └── stringSchema.js
│ ├── route/
│ │ └── stringRouter.js
│ ├── utils/
│ │ └── stringUtils.js
│ └── app.js
│
│── .env
│── .env.example
│── .gitignore
│── index.js
│── package.json
│── package-lock.json
│── node_modules/
│── README.md



---

## 🧠 Technologies Used

| Category | Tools |
|-----------|-------|
| Runtime Environment | Node.js |
| Framework | Express.js |
| Database | MongoDB (via Mongoose ODM) |
| Hashing | Crypto (SHA-256) |
| Environment Config | Dotenv |
| Middleware | CORS, JSON parser |

```
---

## ⚙️ Installation and Setup

### 1️⃣ Clone the repository
```bash
git clone https://github.com/<your-username>/HNG-STAGE-1.git
cd HNG-STAGE-1
2️⃣ Install dependencies
bash
Copy code
npm install
3️⃣ Create your .env file
Create a .env file in the project root:



PORT=3000
MONGODB_URL=your_mongodb_connection_string
Or copy from .env.example and edit accordingly.
Note You can change the port number if needed

4️⃣ Start the server
bash
Copy code
npm run dev
When successful, you’ll see:

✅ MongoDB connected successfully
🚀 Server running on port 5000
🌐 Base URL
Local Base URL:


http://localhost:5000/api
Deployed Base URL (example):



https://your-app-name.up.railway.app/api

📡 API Endpoints

1️⃣ Create and Analyze String
POST /strings

Request Body:

json

{
  "value": "racecar"
}
Response (201 Created):

json

{
  "id": "sha256_hash_value",
  "value": "racecar",
  "properties": {
    "length": 7,
    "is_palindrome": true,
    "unique_characters": 4,
    "word_count": 1,
    "sha256_hash": "abc123...",
    "character_frequency_map": {
      "r": 2,
      "a": 2,
      "c": 2,
      "e": 1
    }
  },
  "created_at": "2025-10-21T10:00:00Z"
}


2️⃣ Get Specific String
GET /strings/:value

Example:



GET /api/strings/racecar
Response (200 OK):
Returns stored string details.

Response (404 Not Found):

json
Copy code
{ "error": "String not found" }

3️⃣ Get All Strings with Filtering
GET /strings?is_palindrome=true&min_length=5&max_length=20&word_count=1

Response (200 OK):

json

{
  "data": [ /* array of strings */ ],
  "count": 5,
  "filters_applied": {
    "is_palindrome": "true",
    "min_length": "5",
    "max_length": "20",
    "word_count": "1"
  }
}
4️⃣ Delete String
DELETE /strings/:value

Example:


DELETE /api/strings/racecar
Response (204 No Content):
Empty response body.

💾 Example .env File


PORT=5000
MONGODB_URL=mongodb+srv://<username>:<password>@cluster.mongodb.net/hng_stage1

☁️ Deployment Guide (Railway)
Step 1 — Push your code to GitHub
Make sure your repo is public and contains:

index.js

package.json

.env.example

Step 2 — Create a Railway account
Go to https://railway.app and sign up (GitHub login recommended).

Step 3 — Create a new project
Click New Project → Deploy from GitHub repo

Select your HNG-STAGE-1 repository.

Wait for Railway to detect your project and install dependencies automatically.

Step 4 — Add environment variables
In Railway:

Go to Settings → Variables

Add:

PORT = 3000

MONGODB_URL = your MongoDB Atlas connection string

Step 5 — Deploy
Once variables are set, click “Deploy” again.
You’ll get a live URL like:

https://your-app-name.up.railway.app


🧪 Testing
You can test all endpoints locally using Postman or cURL.

⚠️ Note: String lookups are case-sensitive (e.g., "Hannah" ≠ "hannah")

Example:

POST http://localhost:5000/api/strings



🧑🏽‍💻 Author

👤 **[Godly Patrick Udoh]**
- Email: [Udohgary1999@gmail.com]
- LinkedIn: [(http://www.linkedin.com/in/godlypatrickudoh)]
- GitHub: [@GodlyPatrick](https://github.com/GodlyPatrick)

## 🎯 HNG Internship

This project is part of the [HNG Internship](https://hng.tech/internship) program.

Learn more about HNG:
- [HNG Internship](https://hng.tech/internship)
- [HNG Premium](https://hng.tech/premium)

## 🙏 Acknowledgments

- HNG Internship for the learning opportunity
- Express.js community for excellent documentation

---

**Built with ❤️ during HNG13 Internship**
