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
pip install upgrade pip
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