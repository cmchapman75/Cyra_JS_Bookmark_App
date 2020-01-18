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
    
    let bookmarks = [...store.bookmarks];
    console.log(bookmarks);
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
        const rating = $('.rating:checked').val();
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


const generateBookmarkHtml = function (item) {
    if (item.expanded) {
        let expandedBookmarkHtml = `
    <form class="expanded-bookmarks">
    <div class="title-bar">
        <button class="remove" data-item-id='${item.id}'>X</button>
        <legend class="saved-title">${item.title}</legend> 
    </div>

    <div class="link-btn">
    <a href="${item.url}" target="_blank"><button type="button" class="url-link">Visit Site</button></a>
    </div>

    <div class="display-rating">${item.rating}</div>
    <div class="description-text">
    
        <p>${item.desc}
        </p>
    </div>
    <div class="expand-button">
        <button type="button" data-item-id='${item.id}' class="expand">Collapse</button>  
    </div>
</form>`;
        return expandedBookmarkHtml;
    }
    else {
        let unexpandedBookmarkHtml = `
    <form class="collapsed-bookmarks">
    <div class="title-bar">
    
        <button class="remove" data-item-id='${item.id}'>X</button>
        <legend class="saved-title">${item.title}</legend>
        <div class="display-rating-collapsed">${item.rating}</div>
    </div>
    <div class="expand-button">
        <button type="button" data-item-id='${item.id}' class="expand">Expand</button>  
    </div>
    </form>`;
    return unexpandedBookmarkHtml;
    }
};




const generateAddBookmarkHtml = function () {
    let addBookmarkHtml = `    
     <form id="main-container">
    <label for="name">Name</label><br>
    <input id="name" name="name" type="text" placeholder="Trees" required>
       <br> 
    <label for="url">URL</label> <br>
    <input id="url" name="url" type="url" placeholder="www.trees.com">

    <legend class="rating-form">Rating:</legend>
        <section class="rating-form">
            <div class="ratings">
                <label for="5star">5 Stars: </label>       
                    <input class="rating" type="radio" id="5star" name="rating" value="5" required checked/><br>
        
                <label for="4star">4 Stars: </label>
                    <input class="rating" type="radio" id="4star" name="rating" value="4" required checked/><br>
                    
                <label for="3star">3 Stars: </label>
                    <input class="rating" type="radio" id="3star" name="rating" value="3" required checked/><br>
                      
                <label for="2star">2 Stars: </label>
                    <input class="rating" type="radio" id="2star" name="rating" value="2" required checked/><br>
                    
                <label for="1star">1 Stars: </label>
                    <input class="rating" type="radio" id="1star" name="rating" value="1" required checked/><br>  
                    
            <div>
        </section>
        

        <label for="description">What's this site about?</label><br>
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