document.addEventListener('DOMContentLoaded', function(){
    const quoteList = document.getElementById('quote-list');
    const newQuoteForm = document.getElementById('new-quote-form');
    const sortButton = document.getElementById('sort-button');

    let sortByAuthor = false;
    
    sortButton.addEventListener('click', function() {
        sortByAuthor = !sortByAuthor;
        if (sortByAuthor) {
            sortButton.classList.add('active');
        } else {
            sortButton.classList.remove('active');
        }

        fetch('http://localhost:3000/quotes?_embed=likes')
        .then(response => response.json())
        .then(data => {
            const quotes = data;

            if (sortByAuthor) {
                quotes.sort((a, b) => a.author.localeCompare(b.author));
            } else {
                quotes.sort((a, b) => a.id - b.id);
            }
            
            quoteList.innerHTML = '';

            quotes.forEach(quote => {
                const quoteCard = document.createElement('li');
                quoteCard.classList.add('quote-card');

                const blockquote = document.createElement('blockquote');
                blockquote.classList.add('blockquote');

                const quoteText = document.createElement('p');
                quoteText.classList.add('mb-0');
                quoteText.textContent = quote.quote;

                const quoteAuthor = document.createElement('footer');
                quoteAuthor.classList.add('blockquote-footer');
                quoteAuthor.textContent = quote.author;

                const likeButton = document.createElement('button');
                likeButton.classList.add('btn-success');
                likeButton.textContent = `Likes: ${quote.likes.length}`;

                const deleteButton = document.createElement('button');
                deleteButton.classList.add('btn-danger');
                deleteButton.textContent = 'Delete';

                likeButton.addEventListener('click', function() {
                    const likeData = {
                        quoteId: quote.id
                    };
                    
                    fetch('http://localhost:3000/likes', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(likeData)
                    })
                    .then(response => response.json())
                    .then(like => {
                        quote.likes.push(like);
                        likeButton.textContent = `Likes: ${quote.likes.length}`;
                    });
                });
        
                deleteButton.addEventListener('click', function() {
                    fetch(`http://localhost:3000/quotes/${quote.id}`, {
                            method: 'DELETE'
                        })
                        .then(response => {
                            if (response.ok) {
                                quoteCard.remove();
                            }
                        });
                    });
        
                  blockquote.appendChild(quoteText);
                  blockquote.appendChild(quoteAuthor);
                  blockquote.appendChild(document.createElement('br'));
                  blockquote.appendChild(likeButton);
                  blockquote.appendChild(deleteButton);
        
                  quoteCard.appendChild(blockquote);
                  quoteList.appendChild(quoteCard);
            })

        })
    })

    newQuoteForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const quoteInput = document.getElementById('new-quote');
        const authorInput = document.getElementById('author');

        const newQuote = {
            quote: quoteInput.value,
            author: authorInput.value
        };

        fetch('http://localhost:3000/quotes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newQuote)
        })
        .then(response => response.json())
        .then(quote => {
            const quoteCard = document.createElement('li');
            quoteCard.classList.add('quote-card');

            const blockquote = document.createElement('blockquote');
            blockquote.classList.add('blockquote');

            const quoteText = document.createElement('p');
            quoteText.classList.add('mb-0');
            quoteText.textContent = quote.quote;

            const quoteAuthor = document.createElement('footer');
            quoteAuthor.classList.add('blockquote-footer');
            quoteAuthor.textContent = quote.author;

            const likeButton = document.createElement('button');
            likeButton.classList.add('btn-success');
            likeButton.textContent = `Likes: 0`;

            const deleteButton = document.createElement('button');
            deleteButton.classList.add('btn-danger');
            deleteButton.textContent = 'Delete';

            likeButton.addEventListener('click', function() {
                const likeData = {
                    quoteId: quote.id
                };
                
                fetch('http://localhost:3000/likes', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(likeData)
                })
                .then(response => response.json())
                .then(like => {
                    quote.likes.push(like);
                    likeButton.textContent = `Likes: ${quote.likes.length}`;
                });
            });
    
              deleteButton.addEventListener('click', function() {
                fetch(`http://localhost:3000/quotes/${quote.id}`, {
                        method: 'DELETE'
                    })
                    .then(response => {
                        if (response.ok) {
                            quoteCard.remove();
                        }
                    });
                });
    
              blockquote.appendChild(quoteText);
              blockquote.appendChild(quoteAuthor);
              blockquote.appendChild(document.createElement('br'));
              blockquote.appendChild(likeButton);
              blockquote.appendChild(deleteButton);
    
              quoteCard.appendChild(blockquote);
              quoteList.appendChild(quoteCard);
    });
    });

    fetch('http://localhost:3000/quotes?_embed=likes')
        .then(response => response.json())
        .then(data => {
            data.forEach(quote => {
                const quoteCard = document.createElement('li');
                quoteCard.classList.add('quote-card');

                const blockquote = document.createElement('blockquote');
                blockquote.classList.add('blockquote');

                const quoteText = document.createElement('p');
                quoteText.classList.add('mb-0');
                quoteText.textContent = quote.quote;

                const quoteAuthor = document.createElement('footer');
                quoteAuthor.classList.add('blockquote-footer');
                quoteAuthor.textContent = quote.author;

                const likeButton = document.createElement('button');
                likeButton.classList.add('btn-success');
                likeButton.textContent = `Likes: ${quote.likes.length}`;

                const deleteButton = document.createElement('button');
                deleteButton.classList.add('btn-danger');
                deleteButton.textContent = 'Delete';

                likeButton.addEventListener('click', function() {
                    const likeData = {
                        quoteId: quote.id
                    };
                    
                    fetch('http://localhost:3000/likes', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(likeData)
                    })
                    .then(response => response.json())
                    .then(like => {
                        quote.likes.push(like);
                        likeButton.textContent = `Likes: ${quote.likes.length}`;
                    });
                });

                deleteButton.addEventListener('click', function() {
                    fetch(`http://localhost:3000/quotes/${quote.id}`, {
                        method: 'DELETE'
                    })
                    .then(response => {
                        if (response.ok) {
                            quoteCard.remove();
                        }
                    });
                });

                blockquote.appendChild(quoteText);
                blockquote.appendChild(quoteAuthor);
                blockquote.appendChild(document.createElement('br'));
                blockquote.appendChild(likeButton);
                blockquote.appendChild(deleteButton);

                quoteCard.appendChild(blockquote);
                quoteList.appendChild(quoteCard);
        });
    });
});