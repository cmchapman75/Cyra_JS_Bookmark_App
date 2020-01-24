/* eslint-disable indent */
import $ from 'jquery';
import './index.css';
import handleFeatures from './handlefeatures';
import api from './api';
import store from './store';



    
    //console.log($('.filter').val());      

const render = function () {
    api.getBookmarks().then(function (response){       
      let bookmarks = response;
        if ( store.bookmarks.length === 0 )  {
            bookmarks.forEach(bookmark => {
                store.addBookmark(bookmark);                
            });
        }
        if(store.filter>0) {
            bookmarks = bookmarks.filter(bookmark => bookmark.rating>=store.filter);
        }

        let html;

        if(store.adding) {
            html = generateAddBookmarkHtml();
        } else {
            html = bookmarks.map(item => generateBookmarkHtml(item)).join('');
        }

        if (store.error) {
            html = `<div>${store.error}</div>` + html;
        }

        $('main').html(html);
    });   
        

};



const renderApp = function () {
handleNewBookmarkSubmit();
handleDeleteBookmark();
handleToggleExpandClick();
handleCancelButton();
handleAddBookmark();
render();
greaterThanFilter();
};


$(renderApp);