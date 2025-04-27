Health Information System
=========================

A comprehensive health management system for tracking clients and health programs.

Features
--------
- Client registration and profile management
- Health program creation and management
- Client enrollment in programs
- Search functionality for clients/programs
- Responsive web interface

Technologies
------------
Frontend: React, React Bootstrap
Backend: Node.js, Express, MongoDB

Installation
------------
1. Clone the repository:
   git clone https://github.com/Thyshark/Health-info-system.git
   cd Health-info-system

2. Install dependencies:
   npm install
   cd client && npm install
   cd ../server && npm install

3. Configure environment:
   Create .env file in server/ with:
   MONGODB_URI=your_mongodb_connection
   PORT=5000
   JWT_SECRET=your_secret_key

Running the Application
----------------------
Development mode (both frontend and backend):
npm run dev

Or run separately:
Backend: cd server && npm start
Frontend: cd client && npm start

Access at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

API Endpoints
-------------
Clients:
GET/POST /api/clients
GET/PUT/DELETE /api/clients/:id
PUT /api/clients/:id/enroll

Programs:
GET/POST /api/programs
GET/PUT/DELETE /api/programs/:id

Project Structure
----------------
/client - React frontend
/server - Node.js backend
  /models - MongoDB models
  /routes - API endpoints
.env - Environment config

Deployment
---------
1. Build frontend:
   cd client && npm run build

2. Start production server:
   cd ../server && npm start

Contributing
-----------
1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Open a pull request

License
-------
MIT License
