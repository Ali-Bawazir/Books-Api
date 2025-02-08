const Fastify = require('fastify');

// Create the Fastify instance
const fastify = Fastify({ logger: true });

const userBooks = new Map();

fastify.post('/:username/books', async (request, reply) => {
    const { username } = request.params;
    const { id , serial} = request.body;

    if (!id || id ===null){

        return{ message : `${id} not found `};
    }

    if (!serial || serial ===null){

        return{ message : `${serial} not found `};
    }

  
    // If the user doesn't exist in the map, create a new array for their books
    if (!userBooks.has(username)) {
      userBooks.set(username, []);
    }
  
    // Get the user's current books and add the new book
    const books = userBooks.get(username);
    const book = { id :id , serial :serial };
    books.push(book);
  
    return { message: `${book} added to ${username}'s books` };
  });



  fastify.delete('/:username/books' , async(request,reply) => {
   const {username} = request.params;
   const {book} = request.body;

   if(userBooks.has(username)){
    const books =userBooks.get(username);
    const index =books.indexOf(book);

    if(index > -1){

        books.splice(index,1);
        return { message: `${book} removed from ${username}'s books` };  // Return a success message
    } else {
      return { message: `${book} not found in ${username}'s books` };  // If the book is not found, return a message
    }
  } else {
    return { message: `${username} does not have any books` };  // If the user doesn't have any books, return a message
  }
});

    








// Declare the route
fastify.get('/:username/books', async (request, reply) => {
    const {username} = request.params;

    if(userBooks.has(username)) {
        return { books :userBooks.get(username)};
 } else {
 return {message: `${username} has no books`};
 }

});

// Correct way to call listen with an options object
fastify.listen({ port: 3001, host: '127.0.0.1' }, (err, address) => {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});
