const books = [] ;
const {nanoid} = require('nanoid');

// kriteria 1
const SaveBooks = (request,h) => {
    const{
        name,
        year,
        author,
        summary,
        publisher,
        pageCount,
        readPage,
        reading
    } =  request.payload;

    const id = nanoid(16);
    const insertedAt = new Date().toISOString();
    const updatedAt = insertedAt;
    const finished = pageCount === readPage;

    const NewBooks ={
        id,
        name,
        year,
        author,
        summary,
        publisher,
        pageCount,
        readPage,
        finished,
        reading,
        insertedAt,
        updatedAt,

    };

    if(!name){
        const response = h.response({
            status: "fail",
            message: "Gagal menambahkan buku. Mohon isi nama buku",
        });

        response.code(400);
        return response;
    }

    if (readPage > pageCount){
        const response = h.response({
            status: "fail",
            message: "Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount",

        });

        response.code(400);
        return response;
    }

    books.push(NewBooks);

    const isSuccess = books.filter((books)=> books.id === id).length > 0;

    if (isSuccess){
        const response = h.response({
            status: "success",
            message: "Buku berhasil ditambahkan",
            data:{bookId: id,},
        });
        response.code(201);
        return response;
    }
    const response = h.response({
        status: "error",
        message: "Buku gagal ditambahkan"
    });
    response.code(500);
    return response;

};

//kriteria 2

const getBooks = (request, h) =>({
    status: 'success',
    data: {
        books: books.map((book)=> ({
        id: book.id,
        name: book.name,
        publisher: book.publisher
    })),
    },

});

// kriteria 3
const getBooksId = (request, h) =>{
    const {id} = request.params;
    const book = books.filter((n)=>n.id === id)[0];

    if(book !== undefined ) {
       const response = h.response({
           status: "success",
           data: {
               book
           },
       });
       response.code(200);
       return response;
    };

    const response = h.response({
        status: "fail",
        message: "Buku tidak ditemukan"
    });
    response.code(404);
    return response;
};


// Kriteria 4
const editBooks = (request, h)=>{
    const {id} = request.params;

    const{name, year, author, summary, publisher, pageCount, readPage, reading} = request.payload;
    const updatedAt = new Date().toISOString();
    const index = books.findIndex((book)=> book.id === id);

    if (name === undefined){
        const response = h.response({
            status: "fail",
            message: "Gagal memperbarui buku. Mohon isi nama buku",
        });
        response.code(400);
        return response;

    }

    if (readPage > pageCount){
        const response = h.response({
            status: "fail",
            message: "Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount",
        });
        response.code(400);
        return response;
    }       

    if (index !== -1){
        books[index] = {...books[index],
            name, year, author, summary, publisher, pageCount, readPage, reading, updatedAt
        };
        const response = h.response({
            status: "success",
            message:"Buku berhasil diperbarui"
        });
        response.code(200);
        return response;
    }
    else{
        const response = h.response({
            status: "fail",
            message: "Gagal memperbarui buku. Id tidak ditemukan"
        });
        response.code(404);
        return response;
    }

};

//kriteria 5
const deleteBooks = (request, h) =>{
    const { id } = request.params;
    const index = books.findIndex((book)=> book.id === id);

    if (index !== -1){
        books.splice(index, 1);
        const response = h.response({
            status: "success",
            message: "Buku berhasil dihapus",
        });
        response.code(200);
        return response;
    }

    const response = h.response({
        status: "fail",
        message: "Buku gagal dihapus. Id tidak ditemukan"
    })
    response.code(404);
    return response;
};

module.exports={
    SaveBooks,
    getBooks,
    getBooksId,
    editBooks,
    deleteBooks,
}; 
