/* eslint-disable indent */
  
const bookmarks = [ 

];

let adding = false;
let error = null;
let filter = 0;

const addBookmark = function (bookmark) {
    bookmark.expanded = false;
        return this.bookmarks.push(bookmark);
};

const removeBookmark = function(id) {
    return this.bookmarks = 
        this.bookmarks.filter(currentBookmark => currentBookmark.id !== id);
};

const toggleExpandedId = function(id) {
    let bookmark = this.findById(id);
    bookmark.expanded = !bookmark.expanded;    
};

const toggleAdding = function() {
    this.adding = !this.adding;
};

const filterOptions = function(number) {
    this.filter = number;
};

const findAndUpdate = function (id, newBookMark) {
    const currentBookmark = this.findById(id);
    Object.assign(currentBookmark, newBookMark);
};

const findById = function (id) {
 return bookmarks.find(currentBookmark => currentBookmark.id === id);
};

const setError = function (error) {
this.error = error;
};



 



export default {
addBookmark,
toggleExpandedId,
bookmarks,
error,
filter,
findById,
adding,
removeBookmark,
setError,
findAndUpdate,
filterOptions,
toggleAdding,
};