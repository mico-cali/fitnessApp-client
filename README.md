# FitTrack

FitTrack is a full-stack fitness tracking application that allows users to log, edit, and delete their workout sessions. Each user can only see their own workout data after logging in.

## Example User Account

Use the following credentials to explore the application:

**User Account:**
- Email: `test@mail.com`
- Password: `password123`

## Features

- User authentication (Login & Signup)
- Add workouts with name and duration
- Edit and delete your workouts
- View only your personal workout history
- Secure and private data access per user

## Tech Stack

- **Frontend:** React.js
- **Backend:** Node.js, Express.js
- **Database:** MongoDB with Mongoose
- **Authentication:** JWT (JSON Web Token)

## Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/yourusername/FitTrack.git
   cd FitTrack
   ```

2. Install dependencies:
   ```sh
   npm install
   ```

3. Set up environment variables in a `.env` file:
   ```sh
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   ```

4. Start the backend server:
   ```sh
   npm run server
   ```

5. Navigate to the frontend folder and install dependencies:
   ```sh
   cd client
   npm install
   ```

6. Start the frontend:
   ```sh
   npm start
   ```

## Sample Login Credentials

Use the following sample email to log in and test the application:
```plaintext
Email: testuser@example.com
Password: password123
```

## API Endpoints

### Authentication
- `POST /api/auth/signup` - Register a new user
- `POST /api/auth/login` - Log in and get a token

### Workouts
- `GET /api/workouts` - Get all workouts for logged-in user
- `POST /api/workouts` - Add a new workout
- `PUT /api/workouts/:id` - Update a workout
- `DELETE /api/workouts/:id` - Delete a workout

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

This project is licensed under the MIT License.
```

