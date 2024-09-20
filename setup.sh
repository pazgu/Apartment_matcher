#!/bin/bash

# Function to kill processes running on a specified port
kill_process_on_port() {
  local port=$1
  echo "Checking for process running on port $port..."
  pid=$(lsof -t -i:$port)

  if [ -n "$pid" ]; then
    echo "Process running on port $port found (PID: $pid), terminating..."
    sudo kill -9 $pid
    echo "Process on port $port terminated."
  else
    echo "No process found running on port $port."
  fi
}

# Function to wait until the port is free
wait_for_port_to_be_free() {
  local port=$1
  while lsof -i:$port >/dev/null; do
    echo "Waiting for port $port to be free..."
    sleep 1
  done
  echo "Port $port is now free."
}

# Kill processes on port 3000 (Frontend) and port 5000 (Backend)
kill_process_on_port 3000
kill_process_on_port 5000

# Ensure ports 3000 and 5000 are free
wait_for_port_to_be_free 3000
wait_for_port_to_be_free 5000

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
