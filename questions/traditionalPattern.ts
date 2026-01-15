import { useState, useEffect } from 'react';

// A basic example of a tradditional React pattern
function MyExampleComponent() {

    // Local state: Data that we will receive from the backend, a variable
    // that indicated if we are loading the content of the component and
    // one more variable that stores possible errors
    const [message, setMessage] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // useEffect --> Execute code right after rendering the component
    useEffect(() => {
        setLoading(true);  // Indicate that we are loading

        // Request data from our backedn API 
        fetch('https://api.inventedExampleApi.com/exampleMessage')
            .then(response => response.json())
            .then( data => {
                setMessage(data);       // Set data when available
                setLoading(false);      // We are not loading anymore
            })
            .catch (err => {
                setError(err);          // Set the reason for the error
                setLoading(false);      // We are not loading anymore
            });
        
    }, []);

    // Return if we are loading
    if (loading) return (<p> loading... </p>);

    // Return if there are error
    if (error) return (<p> Error: {error.message} </p>);

    // Return if everything worked correctly
    return(
        <p>I got the message: {message} </p>
    );
}