const searchResult = () => {
    const searchField = document.getElementById('search-field')
    const searchText = searchField.value;
    const url = `https://openlibrary.org/search.json?q=${searchText}`;

    fetch(url)
    .then(res => res.json())
    .then(data => loadSearchedData(data.docs))
}

const loadSearchedData = books => {
    // console.log(books)

    const booksContainer = document.getElementById('books');
    books.forEach(book => {
        console.log(book.cover_i)
        const div = document.createElement('div');
        div.innerHTML = `
        <div class="col">
          <div class="card h-100">
            <img height="300px" src="https://covers.openlibrary.org/b/id/${
              book.cover_i}-M.jpg" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">Name: ${book.title}</h5>
                <p class="card-title">Author: ${book.author_name}</p>
                <p class="card-text">Publisher: ${book.publisher}, ${book.first_publish_year ? book.first_publish_year :""}</p>
            </div>
          </div>
        </div>
        `;
        booksContainer.appendChild(div);
    })
}

// ${book.cover_i}
// $book.author_name.cover_i
