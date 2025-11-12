// ========================================
// ЛАБОРАТОРНАЯ РАБОТА 3: ОНЛАЙН-БИБЛИОТЕКА
// ========================================

// Шаг 2: Получение элементов DOM
const addBookForm = document.getElementById('add-book-form');
const bookNameInput = document.getElementById('book-name');
const authorInput = document.getElementById('author');
const yearInput = document.getElementById('year');
const formMessage = document.getElementById('form-message');
const booksGrid = document.getElementById('books-grid');

// Массив для хранения книг
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

// Шаг 3: Добавление обработчика события отправки формы
addBookForm.addEventListener('submit', function(event) {
    // 1. Отменяем стандартное поведение формы
    event.preventDefault();

    // 2. Получаем значения из полей ввода, убираем пробелы
    const nameValue = bookNameInput.value.trim();
    const authorValue = authorInput.value.trim();
    const yearValue = yearInput.value.trim();

    // 3. Выполняем валидацию
    if (nameValue === '' || authorValue === '') {
        showMessage('Пожалуйста, заполните все поля!', 'error');
        return;
    }

    // 4. Создаём новый объект книги
    const newBook = {
        id: books.length + 1,
        name: nameValue,
        author: authorValue,
        year: parseInt(yearValue) || new Date().getFullYear()
    };

    // 5. Добавляем книгу в массив
    books.push(newBook);

    // 6. Добавляем карточку на страницу
    addBookCard(newBook);

    // 7. Очищаем форму
    addBookForm.reset();

    // 8. Выводим сообщение об успехе
    showMessage('Книга успешно добавлена! Спасибо за пополнение каталога.', 'success');
});

// Шаг 4: Функция для отображения сообщений
function showMessage(message, type) {
    // Убираем старые классы
    formMessage.classList.remove('message', 'success', 'error');

    // Добавляем новые классы
    formMessage.classList.add('message', type);

    // Устанавливаем текст
    formMessage.textContent = message;

    // Автоматически скрываем через 3 секунды
    setTimeout(() => {
        formMessage.classList.remove('message', type);
        formMessage.textContent = '';
    }, 3000);
}

// Функция для создания и добавления карточки книги
function addBookCard(bookData) {
    // 1. Создаём новый элемент article
    const newCard = document.createElement('article');
    newCard.classList.add('book-card');

    // 2. Создаём HTML-разметку
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

    // 3. Устанавливаем разметку
    newCard.innerHTML = newBookCardHTML;

    // 4. Добавляем в сетку
    booksGrid.appendChild(newCard);
}

// Инициализация: загрузка существующих книг
function initializeBooks() {
    books.forEach(book => {
        addBookCard(book);
    });
}

// Вызов инициализации при загрузке страницы
window.addEventListener('load', initializeBooks);
