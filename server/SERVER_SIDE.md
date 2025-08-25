# Server-Side Documentation

## Architecture Overview
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB (Atlas)
- **Data Sync**: Real-time JSON file sync

## Project Structure
```
server/
├── src/
│   ├── config/           # Configuration files
│   ├── controllers/      # Request handlers
│   ├── data/            # JSON data storage
│   ├── models/          # Database models
│   ├── routes/          # API routes
│   └── utils/           # Utility functions
├── .env                # Environment variables
├── app.js              # Express app setup
└── index.js            # Server entry point
```

## Core Components

### 1. Data Models (MongoDB Schema)
```javascript
// models/Employee.js
const employeeSchema = new mongoose.Schema({
  _id: { type: Number, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: String,
  department: String,
  role: String,
  status: { type: String, default: "Active" }
});
```

### 2. API Endpoints

| Method | Endpoint           | Description                |
|--------|--------------------|----------------------------|
| GET    | /api/employees     | Get all employees          |
| GET    | /api/employees/:id | Get single employee        |
| POST   | /api/employees     | Create new employee        |
| PUT    | /api/employees/:id | Update employee            |
| DELETE | /api/employees/:id | Delete employee            |

## Data Flow

### 1. Request Handling
```
Request → Express Middleware → Route Handler → Controller → Database → Response
```

### 2. JSON Sync Process
1. **On Server Start**:
   - Loads data from MongoDB
   - Creates/Updates employees.json

2. **On Data Change**:
   - MongoDB operation completes
   - Fetches fresh data from MongoDB
   - Compares with existing JSON
   - Writes only if changes detected

## Security

### 1. Environment Variables
```
PORT=4000
MONGO_URI=mongodb+srv://...
NODE_ENV=development
```

### 2. Security Middleware
- CORS enabled
- Body parser
- Request validation
- Error handling

## Error Handling

### 1. HTTP Status Codes
- 200: Success
- 201: Created
- 400: Bad Request
- 404: Not Found
- 500: Server Error

### 2. Error Response Format
```json
{
  "message": "Error description",
  "error": "Detailed error info in development"
}
```

## Performance Considerations

### 1. Caching
- JSON file acts as read cache
- Reduces database load

### 2. Database Optimization
- Indexed fields
- Connection pooling
- Query optimization

## Deployment

### 1. Requirements
- Node.js 14+
- MongoDB Atlas account
- Environment variables set

### 2. Start Commands
```bash
# Install dependencies
npm install

# Development
npm run dev

# Production
npm start
```

## Monitoring
- Console logging
- Error tracking
- Request/Response logging

## Best Practices
- RESTful API design
- Input validation
- Proper error handling
- Environment-based configuration
- Code modularity
- Documentation
