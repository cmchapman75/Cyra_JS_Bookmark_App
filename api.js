/* eslint-disable indent */
const BASE_URL = ' https://thinkful-list-api.herokuapp.com/christina';

const listApiFetch = function (...args) {
    let error;
    return fetch(...args)
    .then(res => {
        if (!res.ok) {
            error = { code: res.status};
        if (!res.headers.get('content-type').includes('json')) {
            error.message = res.statusText;
            return Promise.reject(error);
            }
        }
        return res.json();
    })
    .then(data => {
        if (error) {
            error.message = data.message;
            return Promise.reject(error);
        }
        return data;
    });
};

const validateName = function(title) {
    if (!title) {
        throw new TypeError('Must Provide Name');
    }
};

const validateUrl = function(url) {
    if (!url) {
        throw new TypeError('Must Provide Valid URL');
    }
};

const getBookmarks = function () {
    return listApiFetch(`${BASE_URL}/bookmarks`);
};

const newBookmark = function (id, title, rating, url, desc) {
    const newInput = JSON.stringify({ id, title, rating, url, desc });
    return listApiFetch(`${BASE_URL}/bookmarks`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: newInput
    });
};


const deleteBookmark = function (id) {
    return listApiFetch(BASE_URL + '/bookmarks/' + id, {
        method: 'DELETE'
    });
};



export default {
    validateName,
    validateUrl,
    newBookmark,
    getBookmarks,
    deleteBookmark
};