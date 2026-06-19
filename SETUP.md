# Simple GUI - Vehicle Manager

A full-stack Angular + FastAPI application for managing vehicles with search and filtering capabilities.

## Project Structure

```
.
├── src/                          # Angular frontend source
│   ├── app/
│   │   ├── models/              # Data models
│   │   │   └── vehicle.model.ts
│   │   ├── services/            # Angular services
│   │   │   └── vehicles.service.ts
│   │   ├── vehicle/             # Vehicle component
│   │   │   ├── vehicle.component.ts
│   │   │   ├── vehicle.component.html
│   │   │   └── vehicle.component.css
│   │   ├── app.component.*      # Root component
│   │   └── app.module.ts        # Root module
│   ├── main.ts                  # Bootstrap entry point
│   ├── index.html               # Root HTML
│   └── styles.css               # Global styles
├── package.json                 # Angular dependencies
├── angular.json                 # Angular CLI config
├── tsconfig.json                # TypeScript config
├── server.py                    # FastAPI backend
├── main.py                      # FastAPI entry point
└── requirements.txt             # Python dependencies
```

## Features

- **Vehicle Management**: Display vehicles in a responsive table
- **Search**: Filter vehicles by ID or city (case-insensitive)
- **Status Filter**: Filter by vehicle status (Active, Offline, Charging, Maintenance)
- **Combined Filters**: Search and status filters work together
- **Mock Data**: Pre-loaded with 9 sample vehicles

## Setup

### Prerequisites

- Node.js 18+ with npm
- Python 3.8+

### Step 1: Install Frontend Dependencies

```bash
npm install
```

### Step 2: Install Backend Dependencies

```bash
python -m venv .venv
.\.venv\Scripts\Activate  # Windows
source .venv/bin/activate  # macOS/Linux
pip install fastapi uvicorn
```

## Running Locally

### Option A: Run Frontend + Backend (Recommended)

#### Terminal 1 - Start the Angular dev server:

```bash
npm start
```

This starts the Angular app on `http://localhost:4200`

#### Terminal 2 - Start the FastAPI backend:

```bash
# Activate venv first
.\.venv\Scripts\Activate  # Windows
source .venv/bin/activate  # macOS/Linux

# Run the server
uvicorn main:app --reload
```

FastAPI will be available at `http://localhost:8000`

### Option B: Frontend Only (for UI development)

```bash
npm start
```

Then open `http://localhost:4200` in your browser.

### Option C: Backend Only (for API development)

```bash
.\.venv\Scripts\Activate
uvicorn main:app --reload
```

FastAPI interactive docs: `http://localhost:8000/docs`

## Available Commands

### Frontend

```bash
npm start              # Start dev server (port 4200)
npm run build          # Build for production
npm run watch          # Watch mode with rebuild
npm test               # Run unit tests
```

### Backend

```bash
uvicorn main:app --reload    # Start with auto-reload
uvicorn main:app             # Start production
```

## Vehicle Component Features

### Table Columns

- **ID**: Vehicle unique identifier
- **Model**: Vehicle model name
- **Battery**: Battery level (0-100)
- **City**: City where vehicle is located

### Filtering

1. **Search Box**: Type ID or city name to filter results
2. **Status Dropdown**: Select vehicle status to filter
3. **Combined Filtering**: Both filters work together

### Helper Methods

- `getActive()`: Filter only active vehicles
- `sortByBatteryAsc()`: Sort by battery (low to high)
- `groupByCity()`: Group vehicles by city
- `countVehiclesByStatus()`: Count vehicles per status
- `removeDuplicateIds()`: Remove duplicate vehicle IDs

## Example Usage

Once the app is running:

1. Open `http://localhost:4200`
2. Type "detroit" in the search box to find vehicles in Detroit
3. Select "charging" from the status dropdown to see only charging vehicles
4. Combine filters: search for "1" and select "active" status

## API Endpoints (FastAPI)

- `GET /`: Root endpoint
- `GET /docs`: Interactive API documentation (Swagger UI)

## Technologies

- **Frontend**: Angular 17, TypeScript
- **Backend**: FastAPI, Python
- **Package Manager**: npm
- **Runtime**: Node.js, Python

## Development Notes

- Hot reload enabled for both frontend and backend
- TypeScript strict mode enabled
- Angular templates with `*ngFor`, `trackBy`, and string interpolation
- Reactive filtering with `applyFilters()` method
- Mock data includes realistic vehicle information

## Troubleshooting

### Port 4200 already in use

```bash
ng serve --port 4300
```

### Port 8000 already in use

```bash
uvicorn main:app --port 8001 --reload
```

### Module not found errors

Make sure to run `npm install` after cloning and before running `npm start`

### Python venv issues

- Windows: Use `.\.venv\Scripts\Activate`
- macOS/Linux: Use `source .venv/bin/activate`

## License

MIT
