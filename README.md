# Zen-class-Ticketing-system-for-query-resolving-frontend

The Zen Class Ticketing System is designed to facilitate the resolution of queries within the Zen Class platform. It offers distinct user roles - Admin, Mentor, and Student - each with specific authorization levels.

### User Roles:

1. **Admin**: Admin users have comprehensive rights to manage queries and users within the system. Their responsibilities include:
   - Viewing all queries created by students, along with their status.
   - Assigning queries to mentors for resolution.
   - Creating new mentors within the system.

2. **Mentor**: Mentor users are tasked with resolving queries assigned to them. Their privileges include:
   - Viewing queries assigned to them.
   - Accessing students' phone numbers within the assigned queries.
   - Closing queries upon resolution.

3. **Student**: Student users are the primary users who create queries seeking resolution. Their actions include:
   - Creating queries.
   - Checking the status of their queries.

### User Authorization:

- Each user role is equipped with specific authorization mechanisms tailored to their responsibilities within the system.

### Workflow:

1. **Admin Actions**:
   - Admin logs in to the system.
   - Views all queries created by students.
   - Assigns queries to mentors for resolution.
   - Creates new mentors if necessary.

2. **Mentor Actions**:
   - Mentor logs in to the system.
   - Views queries assigned to them.
   - Accesses students' phone numbers within assigned queries.
   - Resolves queries by closing them upon completion.

3. **Student Actions**:
   - Student logs in to the system.
   - Creates queries seeking resolution.
   - Checks the status of their queries.

### Technologies Used:

- This system is built using Node.js for the backend.
- MongoDB is used as the database.
- Express.js is utilized for server-side routing.
- Authentication and authorization mechanisms are implemented using JSON Web Tokens (JWT).
- Frontend development is done using React.js.

## Logins:
Created a admin login to check:
- Email: admin@gmail.com
- Password: admin@123

## Using Emailjs:
While user signup , forgot password or raise a query they will receive mail with related content.

## Using Chartjs
In the dashboard screen chartjs has been used to show how many queries created , pending queries , assigned queries , closed queries ....



## Dependencies

This project utilizes the following dependencies:

- **@emailjs/browser**: ^4.3.3
- **@emailjs/react-native**: ^4.2.2
- **@emotion/react**: ^11.11.4
- **@emotion/styled**: ^11.11.0
- **@material-ui/core**: ^4.12.4
- **@material-ui/icons**: ^4.11.3
- **@mui/icons-material**: ^5.15.12
- **@mui/material**: ^5.15.12
- **axios**: ^1.6.8
- **bcryptjs**: ^2.4.3
- **bootstrap**: ^5.3.3
- **chart.js**: ^4.4.2
- **chartjs**: ^0.3.24
- **concurrently**: ^8.2.2
- **dotenv**: ^16.4.5
- **dotenv-webpack**: ^8.1.0
- **multer**: ^1.4.5-lts.1
- **next**: ^14.1.4
- **react**: ^18.2.0
- **react-bootstrap**: ^2.10.1
- **react-chartjs-2**: ^5.2.0
- **react-dom**: ^18.2.0
- **react-file-base64**: ^1.0.3
- **react-pro-sidebar**: ^1.1.0
- **react-router**: ^6.22.3
- **react-router-dom**: ^6.22.3
- **socket.io**: ^4.7.5
