#!/bin/bash

# Function to kill process running on port 3000
kill_port_3000() {
  echo "Checking for process running on port 3000..."
  pid=$(lsof -t -i:3000)

  if [ -n "$pid" ]; then
    echo "Process running on port 3000 found (PID: $pid), terminating..."
    sudo kill -9 $pid
    echo "Process terminated."
  else
    echo "No process found running on port 3000."
  fi
}

# Wait until the port is free
wait_for_port_3000() {
  while lsof -i:3000 >/dev/null; do
    echo "Waiting for port 3000 to be free..."
    sleep 1
  done
  echo "Port 3000 is now free."
}

# Deactivate processes running on port 3000
kill_port_3000

# Ensure port 3000 is free before proceeding
wait_for_port_3000

# Navigate to backend and install dependencies
echo "Installing backend dependencies..."
cd backend/src || exit
npm install

# Navigate to frontend and install dependencies
echo "Installing frontend dependencies..."
cd ../../frontend/src || exit
npm install

# Navigate back to backend and install Python dependencies
echo "Installing Python dependencies..."
cd ../../backend/src || exit
python -m pip install --upgrade pip
pip install -r requirements.txt

echo "All dependencies installed successfully."

# Starting backend and frontend
echo "Starting the backend and frontend..."
# Start backend
cd ../../backend/src || exit
nohup npm start &

# Start frontend
cd ../../frontend/src || exit
nohup npm start &

echo "Backend and frontend are now running."