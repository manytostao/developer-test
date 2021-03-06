const _ = require('lodash');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const {
    ObjectID
} = require('mongodb');

const {
    mongoose
} = require('./db/mongoose');
const {
    Book
} = require('./models/book');
const {
    Author
} = require('./models/author');
const {
    Category
} = require('./models/category');

const app = express();

app.use(cors());

app.use(bodyParser.json());

/**
 * BOOK MODEL ENDPOINTS
 */

/**
 * CREATE
 */
app.post('/books', (request, response) => {

    const book = new Book({
        title: request.body.title,
        description: request.body.description,
        author: request.body.author,
        category: request.body.category
    });

    book.save().then((result) => {
        response.send(result);
    }, (error) => {
        response.status(400).send(error);
    });
});

/**
 * READ ALL
 */
app.get('/books', (request, response) => {
    Book.find().populate('author').populate('category').then((result) => {
        response.send({
            result
        });
    }, (error) => {
        response.status(400).send(error);
    })
});

/**
 * READ ONE
 */
app.get('/books/:id', (request, response) => {
    const id = request.params.id;

    if (!ObjectID.isValid(id)) {
        return response.status(400).send();
    }

    Book.findById(id).then((result) => {
        if (!result) {
            return response.status(404).send();
        }

        response.send({
            result
        });
    }, (error) => {
        response.status(400).send();
    })

});

/**
 * READ ALL BY FILTER
 */
app.post('/books/filter', (request, response) => {

    const body = _.pick(request.body, ['author', 'category']);

    Book.find(body).populate('author').populate('category').then((result) => {
        if (!result) {
            return response.status(404).send();
        }

        response.send({
            result
        });
    }, (error) => {
        response.status(400).send();
    })

});

/**
 * DELETE
 */
app.delete('/books/:id', (request, response) => {
    const id = request.params.id;

    if (!ObjectID.isValid(id)) {
        return response.status(400).send();
    }

    Book.findByIdAndRemove(id).then((result) => {
        if (!result) {
            return response.status(404).send();
        }

        response.send({
            result
        });
    }, (error) => {
        response.status(400).send();
    });


}, (error) => {
});

/**
 * UPDATE
 */
app.patch('/books/:id', (request, response) => {
    const id = request.params.id;
    const body = _.pick(request.body, ['title', 'description', 'author', 'category']);

    if (!ObjectID.isValid(id)) {
        return response.status(400).send();
    }

    Book.findByIdAndUpdate(id, {
        $set: body
    }, {
        new: true
    }).then((result) => {
        if (!result) {
            response.status(404).send();
        }

        response.send({result});
    }, (error) => {
        response.status(400).send();
    });
}, (error) => {
    response.status(400).send();
});

/**
 * AUTHOR MODEL ENDPOINTS
 */

/**
 * CREATE
 */
app.post('/authors', (request, response) => {

    const author = new Author({
        firstName: request.body.firstName,
        lastName: request.body.lastName
    });

    author.save().then((result) => {
        response.send(result);
    }, (error) => {
        response.status(400).send(error);
    });
});

/**
 * READ ALL
 */
app.get('/authors', (request, response) => {
    Author.find().then((result) => {
        response.send({
            result
        });
    }, (error) => {
        response.status(400).send(error);
    })
});

/**
 * READ ONE
 */
app.get('/authors/:id', (request, response) => {
    const id = request.params.id;

    if (!ObjectID.isValid(id)) {
        return response.status(400).send();
    }

    Author.findById(id).then((result) => {
        if (!result) {
            return response.status(404).send();
        }

        response.send({
            result
        });
    }, (error) => {
        response.status(400).send();
    })

});

/**
 * DELETE
 */
app.delete('/authors/:id', (request, response) => {
    const id = request.params.id;

    if (!ObjectID.isValid(id)) {
        return response.status(400).send();
    }

    Author.findByIdAndRemove(id).then((result) => {
        if (!result) {
            return response.status(404).send();
        }

        response.send({
            result
        });
    }, (error) => {
        response.status(400).send();
    });


}, (error) => {
});

/**
 * UPDATE
 */
app.patch('/authors/:id', (request, response) => {
    const id = request.params.id;
    const body = _.pick(request.body, ['firstName', 'lastName']);

    if (!ObjectID.isValid(id)) {
        return response.status(400).send();
    }

    Author.findByIdAndUpdate(id, {
        $set: body
    }, {
        new: true
    }).then((result) => {
        if (!result) {
            response.status(404).send();
        }

        response.send({
            result
        });
    }, (error) => {
        response.status(400).send();
    });
}, (error) => {
    response.status(400).send();
});

/**
 * CATEGORY MODEL ENDPOINTS
 */

/**
 * CREATE
 */
app.post('/categories', (request, response) => {
    const category = new Category({
        code: request.body.code,
        description: request.body.description
    });

    category.save().then((result) => {
        response.send(result);
    }, (error) => {
        response.status(400).send(error);
    });
});

/**
 * READ ALL
 */
app.get('/categories', (request, response) => {
    Category.find().then((result) => {
        response.send({
            result
        });
    }, (error) => {
        response.status(400).send(error);
    })
});

/**
 * READ ONE
 */
app.get('/categories/:id', (request, response) => {
    const id = request.params.id;

    if (!ObjectID.isValid(id)) {
        return response.status(400).send();
    }

    Category.findById(id).then((result) => {
        if (!result) {
            return response.status(404).send();
        }

        response.send({
            result
        });
    }, (error) => {
        response.status(400).send();
    })

});

/**
 * DELETE
 */
app.delete('/categories/:id', (request, response) => {
    const id = request.params.id;

    if (!ObjectID.isValid(id)) {
        return response.status(400).send();
    }

    Category.findByIdAndRemove(id).then((result) => {
        if (!result) {
            return response.status(404).send();
        }

        response.send({
            result
        });
    }, (error) => {
        response.status(400).send();
    });


}, (error) => {
});

/**
 * UPDATE
 */
app.patch('/categories/:id', (request, response) => {
    const id = request.params.id;
    const body = _.pick(request.body, ['code', 'description']);

    if (!ObjectID.isValid(id)) {
        return response.status(400).send();
    }

    Category.findByIdAndUpdate(id, {
        $set: body
    }, {
        new: true
    }).then((result) => {
        if (!result) {
            response.status(404).send();
        }

        response.send({
            result
        });
    }, (error) => {
        response.status(400).send();
    });
}, (error) => {
    response.status(400).send();
});


app.listen(3000, () => {
    console.log('Started on port 3000');
});

module.exports = {app};