# Student Management System

A modern student management system built with Next.js and connected to a Spring Boot backend.

## Features

- 🌞 Light mode interface
- 📊 Student management dashboard
- ➕ Add new students
- 🗑️ Delete students
- 📈 Statistics and analytics
- 🎨 Modern, responsive UI

## Tech Stack

- **Frontend**: Next.js 16, React 19, TypeScript
- **Backend**: Spring Boot (REST API)
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI, shadcn/ui

## Setup

### Prerequisites

- Node.js 18+ installed
- Spring Boot backend running on `http://localhost:8080`

### Installation

1. Install dependencies:
```bash
npm install --legacy-peer-deps
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

## API Integration

The frontend connects to the Spring Boot backend with the following endpoints:

- `GET /students/all` - Get all students
- `POST /students/save` - Save a new student
- `DELETE /students/delete/{id}` - Delete a student
- `GET /students/count` - Get total student count
- `GET /students/byYear` - Get students grouped by year

## Project Structure

```
├── app/
│   ├── layout.tsx          # Root layout with theme provider
│   ├── page.tsx            # Main dashboard page
│   └── globals.css         # Global styles
├── components/
│   ├── student-dashboard.tsx
│   ├── student-form.tsx
│   ├── student-list.tsx
│   └── sidebar.tsx
├── lib/
│   └── api.ts              # API utility functions
└── components/ui/          # UI components
```

## Features in Detail

### Dashboard
- Real-time student statistics
- Total students count
- Active students tracking
- Enrollment rate calculation

### Student Management
- Add new students with name and email
- View all students in a table
- Delete students with confirmation
- Loading states and error handling

## Development

```bash
# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## Backend Requirements

Make sure your Spring Boot backend is running on `http://localhost:8080` with the following endpoints available:

```json
{
  "openapi": "3.0.1",
  "info": {
    "title": "Student Management API",
    "version": "v0"
  },
  "servers": [
    {
      "url": "http://localhost:8080"
    }
  ]
}
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## License

MIT License
