// Listen for form submit
document.getElementById('myForm').addEventListener('submit', saveBookmark);


// Save bookmark
function saveBookmark(e){

  // Get form values
  var siteName = document.getElementById('siteName').value;
  var siteUrl = document.getElementById('siteUrl').value;

  if(!validateForm(siteName, siteUrl)){
    return false;
  }

  var bookmark = {
    name: siteName,
    url: siteUrl
  }

  // Test if bookmarks is null
  if(localStorage.getItem('bookmarks') === null){
    // Init array
    var bookmarks = [];
    // Add
    bookmarks.push(bookmark);
    // Set to local storage
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  }
  else{
    // Get bookmarks from local storage
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    // Add bookmark to array
    bookmarks.push(bookmark);
    // Re-set to localStorage
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  }

  // Clear form
  document.getElementById('myForm').reset();

  // Re-set to localStorage
  fetchBookmarks()

  // Prevent form from submitting
  e.preventDefault();
}




// Delete bookmarks
function deleteBookmark(url){
  // Get bookmarks from local storage
  var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

  // loop over bookmarks
  for(var i =0; i < bookmarks.length; i++){
    if(bookmarks[i].url == url){
      // remove from array
      bookmarks.splice(i, 1);
    }
  }

  // Re-set to localStorage
  localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

  //Re-fetch bookmarks
  fetchBookmarks()
}


// Fetch bookmarks
function fetchBookmarks(){
  // Get bookmarks from local storage
  var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

  // Get output ID
  var bookmarksResults = document.getElementById('bookmarksResults');

  // Build output
  bookmarksResults.innerHTML = '';
  for(var i = 0; i < bookmarks.length; i++){
    var name = bookmarks[i].name;
    var url = bookmarks[i].url;

    bookmarksResults.innerHTML += '<div class="well">'+
                                  '<h3>'+name+
                                  ' <a class="btn btn-default" target="_blank" href="'+url+'">Visit</a>'+
                                  ' <a onclick="deleteBookmark(\''+url+'\')" class="btn btn-danger" href="index.html">Delete</a>'+
                                  '</h3>'+
                                  '</div>';
  }

}


function validateForm(siteName, siteUrl){
  if(!siteName || !siteUrl){
    alert('Please fill in form');
    return false;
  }

  var expression = "^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$";
  var regex = new RegExp(expression);

  if(!siteUrl.match(regex)){
    alert('Please use a valid URL');
    return false;
  }

  return true;
}
