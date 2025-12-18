// Email service using backend API (to avoid CORS issues)
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

export const sendEmail = async (formData) => {
  try {
    console.log(`Sending email to: ${API_URL}/api/send-email`);
    const response = await fetch(`${API_URL}/api/send-email`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    // Check if response is ok before parsing JSON
    if (!response.ok) {
      let errorMessage = `Server error: ${response.status} ${response.statusText}`;
      try {
        const errorData = await response.json();
        errorMessage = errorData.message || errorMessage;
      } catch (e) {
        // If response is not JSON, use status text
        errorMessage = `Server error: ${response.status} ${response.statusText}`;
      }
      throw new Error(errorMessage);
    }

    const data = await response.json();

    return {
      success: true,
      message: data.message || 'Email sent successfully!',
      data: data.data,
    };
  } catch (error) {
    console.error('Error sending email:', error);
    
    // Handle network errors (server not running, CORS, etc.)
    if (error.name === 'TypeError' && error.message.includes('fetch')) {
      throw new Error(
        'Unable to connect to server. Please make sure the backend server is running on port 5000. Run "npm run server" or "npm run dev" to start it.'
      );
    }
    
    // Handle other errors
    if (error.message) {
      throw error;
    }
    
    throw new Error('Failed to send email. Please try again later.');
  }
};

