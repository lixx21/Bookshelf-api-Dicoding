const{
    SaveBooks,
    getBooks,
    getBooksId,
    editBooks,
    deleteBooks,
} = require('./handler');

const routes = [
    {
     method: 'POST',
     path: '/books',
     handler: SaveBooks,   
    },

    {
     method: 'GET',
     path: '/books',
     handler: getBooks,   
    },

    {
     method: 'GET',
     path: '/books/{id}',
     handler: getBooksId,   
    },

    {
     method: 'PUT',
     path: '/books/{id}',
     handler: editBooks,   
    },

    {
     method: 'DELETE',
     path: '/books/{id}',
     handler: deleteBooks,   
    },
]; 

module.exports = routes;
