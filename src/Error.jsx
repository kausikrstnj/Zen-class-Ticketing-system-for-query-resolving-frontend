import React from 'react'

function Error() {
    const [error, setError] = useState('');
    const errorMessage = location.state?.errorMessage || 'An unknown error occurred';

    return (
        <div style={styles.container}>
            <h2 style={styles.heading}>An Error Occurred</h2>
            <p style={styles.message}>{errorMessage}</p>
        </div>
    )
}

export default Error