class Book{
	constructor(title, authorName, bookId){
		this.title = title;
		this.authorName = authorName;
		this.bookId = bookId;
	}
}

const book_data = [
	new Book('The Giver', 'Lois Lowry', '0-2143-8784-4'),
	new Book('The Catcher in the Rye','J.D. Salinger', '0-9653-2451-6'),
	new Book('To Kill a Mockingbird','Harper Lee', '0-9855-3535-0'),
	new Book('The Fault in Our Stars','John Green', '0-7151-4479-0'),
	new Book('The Picture of Dorian Gray','Oscar Wilde', '0-6104-6643-7'),
	new Book('Of Mice and Men', 'John Steinbeck', '0-2802-7660-5'),
	new Book('Divergent', 'Veronica Roth', '0-7126-2855-X'),
	new Book('Persuasion','Jane Austen', '0-5255-4316-3'),
	new Book('Outlander','Diana Gabaldon', '0-7453-6262-1'),
	new Book('Good Omens','Terry Pratchett & Neil Gaiman', '0-5229-8881-4'),
	new Book('The Princess Bride','William Goldman', '0-4916-4462-0'),
	new Book('Through the Looking Glass','Lewis Carroll', '0-1957-2778-9'),
	new Book('A Game of Thrones','George R.R. Martin', '0-9909-9495-3'),
	new Book('Salem\'s Lot','Stephen King', '0-6329-3854-4'),
	new Book('Stardust','Neil Gaiman', '0-3388-6913-1'),
	new Book('The Maze Runner','James Dashner', '0-2129-0453-1'),
	new Book('Atlas Shrugged','Ayn Rand', '0-3412-0017-4'),
	new Book('Redwall','Brian Jacques', '0-9159-0128-5'),
	new Book('Dracula','Bram Stoker', '0-9922-8644-1'),
	new Book('Harry Potter and the Chamber of Secrets','J.K. Rowling', '0-8251-3258-4')
];

const list_e = document.getElementById('booklist');
const pagination_e = document.getElementById('pagination');

let cur_page = 1;
let rows = 6;

function DisplayBooks (items, wrapper, rows_per_page, page) {
	wrapper.innerHTML = "";
	page--;

	let start = rows_per_page * page;
	let end = start + rows_per_page;
	let paginatedBooks = items.slice(start, end);

	for (let i = 0; i < paginatedBooks.length; i++) {
		let item = paginatedBooks[i];
		let item_e = document.createElement('div');

		item_e.classList.add('item');
		item_e.innerText = item.title + '\n' + item.authorName
							+ '\n' + item.bookId;

		let btn = document.createElement("BUTTON");
		btn.innerText = "Search for Book";
		let gSearch = `http://google.com/search?q=${item.title} by ${item.authorName}`;

		/*'convert to template string' refactoring. Before:

		var gSearch = 'http://google.com/search?q=' + item.title
						+ " " + item.authorName;
		*/

		btn.onclick = function() {
			window.open(gSearch);
		};
		
		wrapper.appendChild(item_e);
		wrapper.appendChild(btn);
	}
}

function PaginationButton (page, items) {
	let button = document.createElement('button');
	button.innerText = page;

	if (cur_page == page){
		button.classList.add('active');
	}
	button.addEventListener('click', function () {
		cur_page = page;
		DisplayBooks(items, list_e, rows, cur_page);

		let cur_btn = document.querySelector('.pagination button.active');
		cur_btn.classList.remove('active');

		button.classList.add('active');
	});
	return button;
}

function SetupPagination (items, wrapper, rows_per_page) {
	wrapper.innerHTML = "";
	let page_count = Math.ceil(items.length / rows_per_page);
	
	for (let i = 1; i < page_count + 1; i++) {
		let btn = PaginationButton(i, items);
		wrapper.appendChild(btn);
	}
}

DisplayBooks(book_data, list_e, rows, cur_page);
SetupPagination(book_data, pagination_e, rows);