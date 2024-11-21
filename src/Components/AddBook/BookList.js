import axios from 'axios';

const BookList = ({ setEditingBook , books, fetchBooks }) => {
  

 
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/books/${id}`);
      fetchBooks();
    } catch (error) {
      console.log('Error deleting book', error);
    }
  };
 

  return (
    <div className="p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Book List</h2>
      {books.length > 0 ? (
        <table className="w-full text-left border-collapse">
          <thead >
            <tr>
              <th className="py-3 px-4 border-b-2">Title</th>
              <th className="py-3 px-4 border-b-2">Author</th>
              <th className="py-3 px-4 border-b-2">Category</th>
              <th className="py-3 px-4 border-b-2">Price</th>
              <th className="py-3 px-4 border-b-2">ISBN</th>
              <th className="py-3 px-4 border-b-2">Image</th>
              <th className="py-3 px-4 border-b-2">Description</th>
              <th className="py-3 px-4 border-b-2">Action</th>

            </tr>
          </thead>
          <tbody>
  {books.map((book) => (
    <tr key={book._id} className="hover:bg-gray-50">
      <td className="py-3 px-4 border-b">{book.title}</td>
      <td className="py-3 px-4 border-b text-gray-600">
        {book.author && book.author.name ? book.author.name : "No Author"}
      </td>
      <td className="py-3 px-4 border-b text-gray-600">
        {book.category && book.category.name ? book.category.name : "No Category"}
      </td>
      <td className="py-3 px-4 border-b text-gray-600">{book.price}</td>
      <td className="py-3 px-4 border-b text-gray-600">{book.isbn}</td>
      <td className="py-3 px-4 border-b text-gray-600">{book.image}</td>
      <td className="py-3 px-4 border-b text-gray-600">{book.description}</td>
      <td className="py-3 px-4 border-b flex space-x-2">
        <button
          onClick={() => setEditingBook(book)}
          className="py-1 px-3 bg-yellow-500 text-white rounded hover:bg-yellow-600"
        >
          Edit
        </button>
        <button
          onClick={() => handleDelete(book._id)}
          className="py-1 px-3 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Delete
        </button>
      </td>
    </tr>
  ))}
</tbody>

        </table>
      ) : (
        <p className="text-gray-500 text-center">No Books found.</p>
      )}
    </div>
  );
};

export default BookList;
