# Our Voice, Our Rights

“Our Voice, Our Rights” is a multilingual, data-driven civic analytics web application for citizens to view, compare, and listen to development performance of their districts. This project is a full-stack application with a React frontend and a Node.js backend. It was built for the Build for Bharat Fellowship.

## Tech Stack

### Frontend

- **Framework:** React 18 with Vite
- **Language:** TypeScript
- **Styling:** TailwindCSS
- **Routing:** React Router DOM v6
- **Charts:** Recharts
- **Animations:** Framer Motion
- **API Calls:** Axios
- **Internationalization (i18n):** React i18next (EN/HI)
- **Speech Synthesis:** `react-say`
- **Icons:** Lucide React
- **PWA:** manifest.json and service worker

### Backend

- **Framework:** Node.js with Express
- **Language:** TypeScript
- **Database:** MongoDB (via Mongoose)
- **Caching:** Redis
- **Testing:** Jest with `ts-jest`

## Key Features

- **Multilingual:** Supports English and Hindi.
- **Data Visualization:** View and compare district performance data with interactive charts.
- **Speech Synthesis:** Listen to the data.
- **PWA:** Can be installed on mobile devices.
- **Dark Glassy UI Aesthetic:** A modern and visually appealing user interface.

## Project Structure

The project is a monorepo with two main directories: `client` and `server`.

- `client`: Contains the frontend React application.
- `server`: Contains the backend Node.js application.

## Getting Started

### Prerequisites

- Node.js (v18.14.0, v20.0.0, v22.0.0, or >=24.0.0 recommended)
- MongoDB
<!-- - Redis -->

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/Our-Voice-Our-Rights.git
   ```
2. **Install server dependencies:**
    ```bash
    cd server
    npm install
    ```
3. **Install client dependencies:**
    ```bash
    cd ../client
    npm install
    ```
4. **Set up environment variables:**
   - Create a `.env` file in the `server` directory.
   - Add the following variables to the `.env` file:
     ```
     MONGO_URI=your_mongo_db_connection_string
     MGNREGA_API_KEY=your_mgnrega_api_key
     MGNREGA_BASE_URL=your_mgnrega_base_url
     ```

### Development

1. **Run the server:**
    ```bash
    cd server
    npm run dev
    ```
    The server will be running on `http://localhost:5000`.
2. **Run the client:**
    ```bash
    cd client
    npm run dev
    ```
    The client will be running on `http://localhost:5173`.

### Testing (Backend)
    ```bash
    cd server
    npm test
    ```
