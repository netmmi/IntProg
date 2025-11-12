# ========================================
# ЛАБОРАТОРНАЯ РАБОТА 4: ОНЛАЙН-БИБЛИОТЕКА API
# ========================================

from fastapi import FastAPI
from pydantic import BaseModel
from typing import List, Optional

# ========================================
# ИНИЦИАЛИЗАЦИЯ ПРИЛОЖЕНИЯ
# ========================================

app = FastAPI(
    title="Online Library API",
    description="REST API для управления онлайн-библиотекой",
    version="1.0.0"
)

# ========================================
# МОДЕЛЬ ДАННЫХ (Pydantic)
# ========================================

class Book(BaseModel):
    """
    Модель данных для книги.
    Используется для валидации входных данных.
    """
    id: int
    name: str                    # Название книги
    author: str                  # Автор
    year: int                    # Год издания
    description: Optional[str] = None  # Опциональное описание
    category: str = "literature" # Категория

# ========================================
# "БАЗА ДАННЫХ" В ПАМЯТИ
# ========================================

fake_books_db = [
    Book(
        id=1,
        name="Война и мир",
        author="Лев Толстой",
        year=1869,
        description="Эпическое произведение о войне 1812 года",
        category="literature"
    ),
    Book(
        id=2,
        name="Преступление и наказание",
        author="Федор Достоевский",
        year=1866,
        description="Психологический роман о внутреннем конфликте",
        category="literature"
    ),
    Book(
        id=3,
        name="Анна Каренина",
        author="Лев Толстой",
        year=1877,
        description="Роман о любви и семье",
        category="literature"
    ),
    Book(
        id=4,
        name="Мастер и Маргарита",
        author="Михаил Булгаков",
        year=1967,
        description="Романтический роман с фантастическими элементами",
        category="literature"
    )
]

# ========================================
# ЭНДПОИНТЫ (ROUTES)
# ========================================

@app.get("/")
def read_root():
    """Корневой эндпоинт для проверки работы сервера"""
    return {
        "message": "Welcome to the Online Library API!",
        "docs": "Visit http://127.0.0.1:8000/docs for API documentation"
    }

@app.get("/books")
def get_books():
    """
    GET /books: Получить список всех книг.
    Возвращает: список всех книг с общим количеством.
    """
    return {
        "message": "Список всех книг в каталоге",
        "books": fake_books_db,
        "total": len(fake_books_db)
    }

@app.get("/books/{book_id}")
def get_book(book_id: int):
    """
    GET /books/{id}: Получить конкретную книгу по ID.
    Параметр: book_id (целое число в пути URL).
    """
    for book in fake_books_db:
        if book.id == book_id:
            return {
                "message": "Книга найдена",
                "book": book
            }
    
    return {
        "error": f"Книга с ID {book_id} не найдена",
        "message": "Проверьте корректность ID"
    }

@app.post("/books")
def add_book(book: Book):
    """
    POST /books: Добавить новую книгу в каталог.
    Тело запроса: JSON с данными книги (автоматически валидируется).
    """
    # Проверка: если ID уже существует
    for existing_book in fake_books_db:
        if existing_book.id == book.id:
            return {
                "error": f"Книга с ID {book.id} уже существует",
                "message": "Используйте другой ID"
            }
    
    # Добавляем новую книгу в "базу данных"
    fake_books_db.append(book)
    
    return {
        "message": "Книга успешно добавлена!",
        "book": book,
        "total_books": len(fake_books_db)
    }

@app.get("/books/category/{category}")
def get_books_by_category(category: str):
    """
    GET /books/category/{category}: Получить книги по категории.
    """
    books_in_category = [book for book in fake_books_db if book.category == category]
    
    if not books_in_category:
        return {
            "message": f"Книги в категории '{category}' не найдены",
            "category": category,
            "books": []
        }
    
    return {
        "message": f"Книги в категории '{category}'",
        "category": category,
        "books": books_in_category,
        "total": len(books_in_category)
    }
