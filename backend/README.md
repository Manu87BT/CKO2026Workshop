# Backend API for React Workshop

This is the backend API service for the React Workshop project.

## Installation

Install the required dependencies:

```bash
pip install -r requirements.txt
```

## Running the Project

Start the server using uvicorn:

```bash
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

The API will be available at `http://localhost:8000`

## Control the latency

The backend server simulates different latency values for testing purposes.

### Available modes


| Mode | Read (GET) | Write (POST/PATCH/DELETE) | Description |
|------|------------|---------------------------|-------------|
| `NO_LATENCY` | 0ms | 0ms | No latency (default) |
| `LOW_LATENCY` | 100ms | 150ms | Simulates fast connection |
| `MEDIUM_LATENCY` | 250ms | 400ms | Simulates normal connection |
| `HIGH_LATENCY` | 1000ms | 3000ms | Simulates slow connection |


### Latency Endpoints

```bash
# View current status
GET /latency

# View all modes
GET /latency/modes

# Change mode
POST /latency
Body: { "mode": "MEDIUM_LATENCY" }

# Reset to default
POST /latency/reset
```


## Online documentation

The online server documentation is available at `http://localhost:8000`