import axios from 'axios';

export async function makeApiRequest(): Promise<boolean> {
    const apiUrl = 'https://yesno.wtf/api';
    
    try {
        const response = await axios.get(apiUrl);
        return response.data.answer === 'yes';
    } catch (error) {
        console.log('Error:', error);
        return false;
    }
}