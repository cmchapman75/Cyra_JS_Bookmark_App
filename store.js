/* eslint-disable indent */
  
const bookmarks = [ 

];

let adding = false;
let error = null;
let filter = 0;

const findAndUpdate = function (id, newBookMark) {
const currentBookmark = this.findById(id);
Object.assign(currentBookmark, newBookMark);
};  

const findById = function (id) {
 return bookmarks.find(currentBookmark => currentBookmark.id === id);
};

const addBookmark = function (bookmark) {
return this.bookmarks.push(bookmark);
};

const toggleExpandedId = function(id) {
let bookmark = findById(id);
bookmark.expanded = !bookmark.expanded;
return bookmark.expanded;
};


const removeBookmark = function(id) {
return this.bookmarks = this.bookmarks.filter(currentBookmark => currentBookmark.id !== id);
};

const setError = function (error) {
this.error = error;
};

const filterOptions = function(number) {
this.filter = number;
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
};