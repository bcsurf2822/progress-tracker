# Course Progress Tracker App

## Overview
A web application to track progress on remaining courses, visualize completion status, and manage study time effectively before the May 10th deadline.

## Features

### Course Management
- **Course List**: Display all courses with their required hours
- **Course Status**: Toggle completion status (completed/pending)
- **Course Notes**: Add, edit, and view notes for each course
- **Progress Tracking**: Show completion percentage for each course and overall

### Data Visualization
- **Bar Chart**: Display hours required for each course
- **Pie Chart**: Show overall progress (completed vs remaining hours)
- **Timeline**: Visual representation of deadline and daily study goals

### Time Management
- **Deadline Tracker**: Show days remaining until May 10th
- **Study Planner**: Calculate required hours per day to meet the deadline
- **Study Sessions**: Log actual study time for each course

### Data Persistence
- **Local Storage**: Save all progress and notes locally
- **Export/Import**: Option to backup and restore data

## Technical Requirements

### Frontend
- **Framework**: React with functional components and hooks
- **State Management**: Redux for global state management
- **Styling**: Tailwind CSS for responsive design
- **Charts**: Recharts or Chart.js for data visualization

### Data Storage
- **Local Storage API**: Persist data between sessions
- **JSON Schema**: Structured data format for courses and progress

## Course Data Structure
```javascript
[
  { 
    id: "unique-id",
    name: "SharePoint", 
    hours: 22, 
    completed: false,
    notes: "",
    sessions: [],
    completedHours: 0
  },
  { 
    id: "unique-id",
    name: "PowerApps", 
    hours: 26, 
    completed: false,
    notes: "",
    sessions: [],
    completedHours: 0
  },
  // Additional courses...
]
```

## User Interface

### Main Dashboard
- Summary cards showing total hours, completed hours, and remaining hours
- Days remaining until deadline
- Hours needed per day to meet the deadline
- Overall progress pie chart

### Course List
- Filterable table of all courses
- Status toggle buttons
- Progress indicators
- Quick access to notes

### Course Detail View
- Detailed information about a specific course
- Notes editor with markdown support
- Study session log
- Progress tracking for partial completion

### Settings
- Dark/light mode toggle
- Data export/import options
- Reset functionality

## Implementation Roadmap

### Phase 1: Core Functionality
1. Set up React project with Tailwind CSS
2. Implement course data structure and local storage
3. Create basic UI components
4. Implement progress tracking logic

### Phase 2: Enhanced Features
1. Add data visualization components
2. Implement note-taking functionality
3. Add study session logging
4. Create time management features

### Phase 3: Polish and Refinement
1. Add responsive design for mobile devices
2. Implement dark/light mode
3. Add export/import functionality
4. Final testing and bug fixes

## Code Examples

### Local Storage Implementation
```javascript
// Save courses to local storage
const saveCourses = (courses) => {
  localStorage.setItem('courseData', JSON.stringify(courses));
};

// Load courses from local storage
const loadCourses = () => {
  const savedData = localStorage.getItem('courseData');
  return savedData ? JSON.parse(savedData) : defaultCourses;
};
```

### Course Progress Component
```jsx
const CourseProgress = ({ course }) => {
  const percentage = course.completedHours / course.hours * 100;
  
  return (
    <div className="w-full bg-gray-200 rounded-full h-2.5">
      <div 
        className="bg-blue-600 h-2.5 rounded-full" 
        style={{ width: `${percentage}%` }}
      ></div>
      <span className="text-xs text-gray-500">{percentage.toFixed(0)}%</span>
    </div>
  );
};
```

## Bonus Features (If Time Permits)
- **Pomodoro Timer**: Integrated study timer with breaks
- **Notifications**: Reminders for daily study goals
- **Achievement Badges**: Gamification elements for motivation
- **Weekly Reports**: Summary of progress and time spent
