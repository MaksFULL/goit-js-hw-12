import axios from 'axios';
const API_KEY = '46880083-7fe8124655458a4103858b250';
const Url = 'https://pixabay.com/api/';

export const backEndData = async (text, perPage, page) => {
    const options = new URLSearchParams({
        key: API_KEY,
        q: text,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        per_page: perPage,
        page: page,
    });
    return await axios.get(`${Url}?${options}`).then(response => response.data);
};