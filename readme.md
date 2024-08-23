# College ERP System Client

This repository contains the client-side implementation of the College ERP (Enterprise Resource Planning) system. The ERP system provides an intuitive and user-friendly interface for admins, teachers, and students to manage and interact with academic information efficiently.

## Features

### Admin
- **(Details will be updated later)**

### Teacher
- **Lecture Management**: View and manage scheduled lectures.
- **Attendance**: Mark and track student attendance.
- **Grades and Assignments**: Update and manage student marks and assignments.
- **Course Content**: Manage and upload course materials and resources.

### Student
- **Attendance Tracking**: Check attendance records.
- **Timetable**: View scheduled lectures (timetable).
- **Grades**: Access marks and performance in assignments.
- **Assignments**: Track and submit assignments.

## Screenshots

### Dashboard
![Dashboard](screenshots/dashboard.png)

### Teacher's View
![Teacher's View](screenshots/teachers-view.png)

### Student's View
![Student's View](screenshots/students-view.png)

*Include additional screenshots to showcase specific features and functionalities.*

## Project Structure

```plaintext
erp-system/
│
├── public/
│   └── index.html
│
├── src/
│   ├── components/
│   │   ├── admin/
│   │   │   ├── AdminHome.js
│   │   │   ├── AdminMenu.js
│   │   │   ├── RegisterAdmin.js
│   │   │   ├── RegisterStudent.js
│   │   │   ├── RegisterTeacher.js
│   │   │   └── userlist.js
│   │   │
│   │   ├── student/
│   │   │   ├── Studenthome.js
│   │   │   └── StudentMenu.js
│   │   │
│   │   ├── teacher/
│   │   │   ├── TeacherHome.js
│   │   │   └── TeacherMenu.js
│   │   │
│   │   ├── Alert.js
│   │   ├── ChangePassword.js
│   │   ├── Login.js
│   │   └── NavBar.js
│   │
│   ├── context/
│   │   ├── alert/
│   │   │   ├── alertcontext.js
│   │   │   └── alertstate.js
│   │   ├── register/
│   │   │   ├── registercontext.js
│   │   │   └── registerstate.js
│   │   └── userlist/
│   │       ├── userlistcontext.js
│   │       └── userliststate.js
│   │
│   ├── App.js
│   ├── config.js
│   ├── index.css
│   ├── index.js
│   ├── input.css
│   └── output.css
│
├── .env
├── db.js
├── package-lock.json
├── package.json
└── tailwind.config.js
```
