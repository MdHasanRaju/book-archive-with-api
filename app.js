const searchResult = () => {

  /* search-field */
  const searchField = document.getElementById("search-field");
  const searchText = searchField.value;

  console.log(searchText);
  const url = `https://openlibrary.org/search.json?q=${searchText}`;

  fetch(url)
    .then((res) => res.json())
    .then((data) => loadSearchedData(data.docs));
};

const loadSearchedData = (books) => {
  const searchField = document.getElementById("search-field");
  const searchText = searchField.value;
  console.log(books);

  // all warning case
  const msg = [
    "No result found",
    "Total result found:",
    "Search field must not be empty",
  ];

  const result =
    searchText === ""
      ? msg[2]
      : books.length > 0
      ? msg[1] + " " + books.length
      : msg[0];

  const validationMsg = document.getElementById("validationMsg");
  validationMsg.innerText = result;

  /* all searched items */
  const booksContainer = document.getElementById("books");
  booksContainer.textContent = "";
  books.forEach((book) => {
    if (book.cover_i) {
      const div = document.createElement("div");
      div.innerHTML = `
        <div class="col">
          <div class="card h-100">
            <img height="250px" src="https://covers.openlibrary.org/b/id/${
              book.cover_i
            }-M.jpg" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">Title: ${book.title}</h5>
                <p class="card-title">Author: ${book.author_name}</p>
                <p class="card-text">Publisher: ${book.publisher}</p>
                <P>Release date: ${
                  book.first_publish_year ? book.first_publish_year : ""
                }</p>
            </div>
          </div>
        </div>
        `;
      booksContainer.appendChild(div);
    }else{
      const div = document.createElement("div");
      div.innerHTML = `
        <div class="col">
          <div class="card h-100">
            <img height="250px" src="https://covers.openlibrary.org/b/id/10909258-M.jpg" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">Title: ${book.title}</h5>
                <p class="card-title">Author:  ${
                  book.author_name ? book.author_name : ""
                }</p>
                <p class="card-text">Publisher: ${book.publisher}</p>
                <P>Release date: ${
                  book.first_publish_year ? book.first_publish_year : ""
                }</p>
            </div>
          </div>
        </div>
        `;
      booksContainer.appendChild(div);
    }
    
  });
};
