
const addBookForm = document.getElementById('add-book-form');
const bookNameInput = document.getElementById('book-name');
const authorInput = document.getElementById('author');
const yearInput = document.getElementById('year');
const formMessage = document.getElementById('form-message');
const booksGrid = document.getElementById('books-grid');

let books = [
    {
        id: 1,
        name: 'Война и мир',
        author: 'Лев Толстой',
        year: 1869
    },
    {
        id: 2,
        name: 'Преступление и наказание',
        author: 'Федор Достоевский',
        year: 1866
    }
];

addBookForm.addEventListener('submit', function(event) {
    event.preventDefault();

    const nameValue = bookNameInput.value.trim();
    const authorValue = authorInput.value.trim();
    const yearValue = yearInput.value.trim();

    if (nameValue === '' || authorValue === '') {
        showMessage('Пожалуйста, заполните все поля', 'error');
        return;
    }

    const newBook = {
        id: books.length + 1,
        name: nameValue,
        author: authorValue,
        year: parseInt(yearValue) || new Date().getFullYear()
    };

   
    books.push(newBook);

    addBookCard(newBook);

    addBookForm.reset();

    showMessage('Книга успешно добавлена! Спасибо за пополнение каталога.', 'success');
});

function showMessage(message, type) {
    formMessage.classList.remove('message', 'success', 'error');
    formMessage.classList.add('message', type);
    formMessage.textContent = message;

    setTimeout(() => {
        formMessage.classList.remove('message', type);
        formMessage.textContent = '';
    }, 3000);
}

function addBookCard(bookData) {
    const newCard = document.createElement('article');
    newCard.classList.add('book-card');

    const bookImageUrl = `https://placehold.co/400x250/FFFFFF/333333?text=${encodeURIComponent(bookData.name)}`;
    
    const newBookCardHTML = `
        <img src="${bookImageUrl}" 
             alt="Обложка книги ${bookData.name}" 
             class="book-card-img">
        <h3>${bookData.name}</h3>
        <p><strong>Автор:</strong> ${bookData.author}</p>
        <p><strong>Год издания:</strong> ${bookData.year}</p>
        <span class="book-category">Литература</span>
    `;

    newCard.innerHTML = newBookCardHTML;
    booksGrid.appendChild(newCard);
}
function initializeBooks() {
    books.forEach(book => {
        addBookCard(book);
    });
}
window.addEventListener('load', initializeBooks);
