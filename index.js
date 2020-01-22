/* eslint-disable indent */
import store from './store.js';
import api from './api.js';
// build render function, manually change and check if still
// works then set buttons and call render to auto populate info


    const greaterThanFilter = function(){ 
        $('.select-form').change( 
            function(event){ 
            event.preventDefault(); 
            let newRating = $('#filter').val();
            store.filterOptions(newRating); 
            render(); 
        });
     };

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

const getItemIdFromElement = function (item) {
    return $(item).data('item-id');
};

const handleToggleExpandClick = function () {
    $('main').on('click', '.expand', (e) => {
        const id = getItemIdFromElement(e.currentTarget);
        store.toggleExpandedId(id, true);
        render();
    });
};


const handleDeleteBookmark = function () {
    $('main').on('click', '.remove', (e)=>{
        e.preventDefault();
        console.log('delete button working');
        let id = getItemIdFromElement(e.currentTarget);
        api.deleteBookmark(id)
        .then(()=> {
            store.removeBookmark(id);
            render();
        })
        .catch((error)=> {
            store.setError(error.message);
        });
    });
};

//handles new bookmarks being added through api
const handleNewBookmarkSubmit = function () {
    $('main').on('submit', '#main-container', (e)=> {
        console.log('create bookmark button working');
        e.preventDefault(); 
        const name = $('#name').val();
        const url = $('#url').val();
        const rating = $('.ratings: checked').val();
        const desc = $('#description').val();

        $('#main-container')[0].reset();
        api.newBookmark(store.bookmarks.length,name,rating,url,desc)
        .then((newBookmark)=> {
            store.addBookmark(newBookmark);
            store.adding = false;
            render();
        })
        .catch((error)=> {
            store.setError(`${error}`);
        });
    });
};

const generateBookmarkHtml = function(bookmark){
    if(!bookmark.expanded){
      return `
          <section class="colllapsed-bookmarks" id="${bookmark.id}">
            <div class="title-bar">
                 <legend class="saved-title">${bookmark.title}</legend>
                <button class="remove" data-item-id='${bookmark.id}'>X</button>
                <div class="display-rating-collapsed">${convertToStars(bookmark.rating)}</div>
            </div>
            <div class="expand-button">
                <button type="button" data-item-id='${bookmark.id}' class="expand">Expand</button>  
            </div>
          </section>
        `;    

    } else {
      return `
          <section class="expanded-bookmarks" >
            <div class="title-bar">
              <button class="remove" data-item-id='${bookmark.id}'>X</button>
              <legend class="saved-title">${bookmark.title}</legend>
              <button data-href="${bookmark.url}" class="linkButton">Visit Site</button>
              <div>${convertToStars(bookmark.rating)}</div>
              <p>${bookmark.desc}</p>
              
            </div>
          </section>
        `;
    }  
  };
                  
  const convertToStars = function(num){
    switch (num){
    case 5:
      return '★★★★★';
    case 4:
      return '★★★★☆';
    case 3:
      return '★★★☆☆';
    case 2:
      return '★★☆☆☆';
    case 1:
      return '★☆☆☆☆';
    }
  };  


const generateAddBookmarkHtml = function () {
    let addBookmarkHtml = `    
     <form id="main-container" class="main-container">
        <label for="name">New Bookmark: </label>
        <input id="name" name="name" type="text" 
             placeholder="Trees" required>
        
        <label for="url">URL: </label> 
        <input id="url" name="url" type="url" 
                placeholder="http://www.trees.com">

        <legend class="rating-form">Rating:</legend>
          <section class="rating-form">
            <select id="newBookmarkRating" name="rating" class="ratings" required>
            <option value="">Rating</option>
            <option value="5">★★★★★</option>
            <option value="4">★★★★☆</option>
            <option value="3">★★★☆☆</option>
            <option value="2">★★☆☆☆</option>
            <option value="1">★☆☆☆☆</option>
            </select>
        </section>        

        <label for="description">What's this site about?</label>
        <input id="description" name="description" type="text" placeholder="Website on Trees!"></input>
    
    <div class="create-cancel-buttons">    
        <button type="submit" class="add-button">Create</button>
        <button type="button" class="cancel-button">Cancel</button>
    </div>    
</form>
`;
    return addBookmarkHtml;
};

const handleCancelButton = function() {
    $('main').on('click', '.cancel-button', (e) => {
        e.preventDefault();
        console.log('cancel button working');
        store.adding = false;
        render();
    });
};

const handleAddBookmark = function () {
    $('.new-filter-buttons').on('click', '.add-new', (e) => {
        e.preventDefault();
        console.log('add button working');
        store.adding = true;
        render();
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