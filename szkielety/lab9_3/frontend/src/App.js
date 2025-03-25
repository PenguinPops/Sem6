import { useState } from "react";
import axios from "axios";

function App() {
    const [data, setData] = useState({ email: "", message: "" });
    const [message, setMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:3000/api/contact", data);
            setMessage(res.data.message);
        } catch (err) {
            setMessage("Error sending message.");
        }
    };

    return (
        <div>
            <h2>Send us a message</h2>
            {message && <p>{message}</p>}
            <form onSubmit={handleSubmit}>
                <input type="email" placeholder="Email" onChange={(e) => setData({ ...data, email: e.target.value })} />
                <textarea placeholder="Message" onChange={(e) => setData({ ...data, message: e.target.value })}></textarea>
                <button type="submit">Send</button>
            </form>
        </div>
    );
}

export default App;

