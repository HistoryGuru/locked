body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    background-color: #f4f7f6;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    margin: 0;
}

.container {
    background: white;
    padding: 2.5rem;
    border-radius: 20px;
    box-shadow: 0 15px 35px rgba(0,0,0,0.1);
    text-align: center;
    width: 320px;
}

.settings {
    display: flex;
    justify-content: space-between;
    margin-bottom: 1.5rem;
}

.input-group { display: flex; flex-direction: column; gap: 5px; }

input[type="number"] {
    width: 60px;
    padding: 8px;
    border: 1px solid #ddd;
    border-radius: 8px;
    text-align: center;
}

.timer-display {
    background: #f8f9fa;
    padding: 20px;
    border-radius: 15px;
    margin: 20px 0;
}

#countdown {
    font-size: 3.5rem;
    font-weight: 800;
    color: #2d3436;
}

#status { color: #636e72; text-transform: uppercase; letter-spacing: 1px; }

.controls { display: flex; flex-wrap: wrap; justify-content: center; gap: 10px; }

button {
    padding: 12px 20px;
    border: none;
    border-radius: 10px;
    cursor: pointer;
    font-weight: 600;
    transition: transform 0.1s;
}

button:active { transform: scale(0.95); }

.btn-primary { background: #0984e3; color: white; }
.btn-danger { background: #d63031; color: white; }
.btn-secondary { background: #00b894; color: white; }

.toggle-group { width: 100%; margin-top: 15px; font-size: 0.9rem; color: #636e72; }
