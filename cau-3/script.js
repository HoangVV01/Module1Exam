let book_list = [];

class Book {
    constructor(bookID, bookName, publishYear, numOfBooks, status) {
        this.bookID = bookID;
        this.bookName = bookName;
        this.publishYear = publishYear;
        this.numOfBooks = numOfBooks;
        this.status = status;
    }
}

function showForm() {
    document.getElementById('bookForm').style.display = 'block';
}

function hideForm() {
    document.getElementById('bookForm').style.display = 'none';
}

function showAddExistingBook() {
    document.getElementById('existingBookForm').style.display = 'block';
}

function hideAddExistingBook() {
    document.getElementById('existingBookForm').style.display = 'none';
}


function addBook(event) {
    event.preventDefault();

    const code = document.getElementById('bookCode').value.trim();
    const title = document.getElementById('bookTitle').value.trim();
    const year = document.getElementById('bookYear').value.trim();
    const numOfBooks = document.getElementById('numOfBooks').value.trim();

    // Validate book code: 5 characters, first digit between 1-5, next 4 digits between 0-9
    const codePattern = /^[1-5][0-9]{4}$/;
    if (!codePattern.test(code)) {
        alert("Mã sách không hợp lệ. Mã sách phải gồm 5 ký tự, ký tự đầu là 1-5 và 4 ký tự sau là 0-9.");
        return;
    }

    // Validate book title: non-empty string
    if (title === "") {
        alert("Tên sách không thể để trống.");
        return;
    }

    // Validate publication year: 4 digits
    if (!/^\d{4}$/.test(year)) {
        alert("Năm xuất bản phải là 4 chữ số.");
        return;
    }

    // Validate number of books: must be a positive integer
    if (isNaN(numOfBooks) || parseInt(numOfBooks) < 1) {
        alert("Số lượng sách phải là một số nguyên dương.");
        return;
    }

    const status = parseInt(numOfBooks) > 0 ? true : false;  // Set status based on number of books

    // Add the new book to the list
    book_list.push(new Book(code, title, parseInt(year), parseInt(numOfBooks), status));

    // Manually clear the form fields
    document.getElementById('bookCode').value = '';
    document.getElementById('bookTitle').value = '';
    document.getElementById('bookYear').value = '';
    document.getElementById('numOfBooks').value = '';

    hideForm();  // Hide the form after adding the book

    alert("Sách đã được thêm thành công");
    displayBookList(book_list);  // Update the book list display
}


function populateExistingBookDropdown() {
    const select = document.getElementById('existingBookSelect');
    select.innerHTML = '';
    book_list.forEach(book => {
        const option = new Option(book.bookID, book.bookID);
        select.add(option);
    });
    showAddExistingBook();
}

function addExistingBook(event) {
    event.preventDefault();
    const selectedID = document.getElementById('existingBookSelect').value;
    const additional = parseInt(document.getElementById('additionalCopies').value);

    const book = book_list.find(b => b.bookID === selectedID);
    if (book) {
        book.numOfBooks += additional;
        if (book.numOfBooks > 0) book.status = true;
        alert("Đã thêm số lượng sách.");
        displayBookList(book_list);
    }
    document.getElementById('additionalCopies').value = '';
}

function showBorrowForm() {
    const select = document.getElementById('borrowSelect');
    select.innerHTML = ''; // Clear the existing options

    book_list.forEach(book => {
        if (book.numOfBooks > 0) {
            const option = new Option(`${book.bookID} - ${book.bookName}`, book.bookID);
            select.add(option);
        }
    });
    document.getElementById('borrowForm').style.display = 'block'; // Show the borrow form
}


function borrowBook(event) {
    event.preventDefault();
    const selectedID = document.getElementById('borrowSelect').value;
    const book = book_list.find(b => b.bookID === selectedID);

    if (book && parseInt(book.numOfBooks) > 0) {
        book.numOfBooks = parseInt(book.numOfBooks) - 1;
        if (book.numOfBooks === 0) book.status = false;
        alert("Mượn sách thành công!");
        displayBookList(book_list);
        hideBorrowForm();
    } else {
        alert("Không còn sách để mượn.");
    }
}

function hideBorrowForm() {
    document.getElementById('borrowForm').style.display = 'none';
}

function displayBookList(book_list) {
    const list = document.getElementById('bookTable');
    list.innerHTML = ''; // Clear existing content

    book_list.forEach(book => {
        const row = document.createElement('tr');

        row.innerHTML = `
          <td>${book.bookID}</td>
          <td>${book.bookName}</td>
          <td>${book.publishYear}</td>
          <td>${book.numOfBooks}</td>
          <td>${book.numOfBooks > 0 ? 'True' : 'False'}</td>
        `;
        list.appendChild(row);
    });
}