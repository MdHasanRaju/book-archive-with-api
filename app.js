const searchResult = () => {
  /* search-field */
  const searchField = document.getElementById("search-field");
  const searchText = searchField.value;

  const url = `https://openlibrary.org/search.json?q=${searchText}`;

  fetch(url)
    .then((res) => res.json())
    .then((data) => loadSearchedData(data.docs));
};

const loadSearchedData = (books) => {
  const searchField = document.getElementById("search-field");
  const searchText = searchField.value;

  // validation case including searched length
  const msg = [
    "No result found",
    "Total result found:",
    "Search field must be filled with a book name"
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

    const coverImg = 
      book.cover_i
        ? "https://covers.openlibrary.org/b/id/" + book.cover_i + "-M.jpg"
        : "https://covers.openlibrary.org/b/id/10909258-M.jpg";
    
      const div = document.createElement("div");
      div.innerHTML = `
        <div class="col">
          <div class="card h-100">
            <img height="250px" src="${coverImg}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title text-primary">${book.title}</h5>
                <p class="card-title">Author: ${book.author_name ? book.author_name:''}</p>
                <p class="card-text">Publisher: ${book.publisher}</p>
                <P>Release date: ${
                  book.first_publish_year ? book.first_publish_year : ""
                }</p>
            </div>
          </div>
        </div>
        `;
      booksContainer.appendChild(div);
  });

/* search field clear */
  searchField.value = '';
};

