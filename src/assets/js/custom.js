// IIFE
(function () {
	'use strict';
	console.log('document ready!');

	// Appends the 'active' class to nav links
	let pathname = "." + window.location.pathname;
	document.querySelectorAll(`.navbar-nav > li > a[href='${pathname}']`).forEach(el => {
		el.classList.add('active');
	});

	// Init Swiper (swiper.js)
	const swiper = new Swiper('.swiper', {
		loop: true,
		pagination: {
			el: '.swiper-pagination',
		},
		navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev',
		},
		scrollbar: {
			el: '.swiper-scrollbar',
		},
	});

	// Init Emergence (emergence.js)
	emergence.init({
		elemCushion: 0.75 // toggles class when element is 75% visible
	});

	// Init tooltips everywhere (popper.js)
	var popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'))
	var popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
		return new bootstrap.Popover(popoverTriggerEl)
	})
})();


// =================================================================================
/* Begin App JS */
// =================================================================================

// Elements
const formSubmitBtn = document.getElementById("formSubmitBtn");
const forms = document.querySelectorAll(".needs-validation");
const entryRow = document.querySelector(".currently-watching");
const dismissBtn = document.querySelector(".dismissBtn");
const editEntryBtn = document.getElementById('editEntryBtn');
const deleteEntryBtn = document.getElementById('deleteEntryBtn');
const deleteEntryConfirmModal = document.getElementById('deleteEntryConfirmModal');
const streamingOnDropdown = document.getElementById('entryStreamingOn');
let entryToEdit = "";

// =====================================================================

// Read form data
const readFormData = () => {
	let formData = {};
	formData["entryTitle"] = document.getElementById("entryTitle").value;
	formData["entryYear"] = document.getElementById("entryYear").value;
	formData["entryGenre"] = document.getElementById("entryGenre").value;
	formData["entryDirectedBy"] = document.getElementById("entryDirectedBy").value;
	formData["entryStreamingOn"] = document.getElementById("entryStreamingOn").value;
	formData["entryStatus"] = document.getElementById("entryStatus").value;
	formData["entryMediaType"] = document.querySelector('input[name="entryMediaType"]:checked').value;
	formData["entryRunningTime"] = document.getElementById("entryRunningTime").value;
	formData["id"] = document.getElementById("entryId").value || "";
	return formData;
};

// =====================================================================

// Clear form data
const resetForm = () => {
	document.getElementById("entryTitle").value = "";
	document.getElementById("entryYear").value = "";
	document.getElementById("entryGenre").value = "";
	document.getElementById("entryDirectedBy").value = "";
	document.getElementById("entryStreamingOn").value = "";
	document.getElementById("entryStatus").value = "";
	//document.querySelector("entryMediaType").value = "";
	document.getElementById("entryRunningTime").value = "";
}

// =====================================================================

// Fetch all entries
const fetchEntries = async () => {
	let uri = "http://localhost:3002/entries";
	const res = await fetch(uri);
	const entries = await res.json();

	console.log(entries);

	let template = "";
	entries.forEach(entry => {
		template += `
			<div class="entry">
				<div class="entry__image" style="background-image: url('${entry.entryImage}')"></div>
				<div class="entry__info">
					<span>${entry.entryTitle}</span>
					<span>${entry.entryYear}</span>
					<span>${entry.entryGenre}</span>
					<span class="media-type">${entry.entryMediaType}</span>
				</div>
				<div class="entry__actions">
					<button type="button" data-entry-id="${entry.id}" id="editEntryBtn" onclick="editEntry('${entry.id}')" data-bs-target="#addEntryModal" data-bs-toggle="modal"><i class="bi bi-pencil-fill"></i></button>
					<button type="button" data-entry-id="${entry.id}" id="deleteEntryBtn" onclick="deleteEntry('${entry.id}')" data-bs-target="#deleteEntryConfirmModal" data-bs-toggle="modal"><i class="bi bi-trash-fill"></i></button>
				</div>
				<div class="entry__streaming-on" style="background-image: url('${entry.entryStreamingOn}')"></div> 
			</div>
			`;
	});
	entryRow.innerHTML = template;
};

fetchEntries();

// =====================================================================

// Handle add entry
const addEntry = async (data) => {
	let uri = "http://localhost:3002/entries";
	const res = await fetch(uri, {
		method: "POST",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify(data)
	});
	fetchEntries();
};

// =====================================================================

// Handle delete entry
const deleteEntry = async (id) => {
	let uri = `http://localhost:3002/entries/${id}`;
	const res = await fetch(uri, {
		method: "DELETE"
	});
	fetchEntries();
	deleteEntryConfirmModal.show();
};

// =====================================================================

// Handle edit entry
const editEntry = async (id) => {
	console.log(`editEntry called!! and the id is: ${id}`);

	let uri = `http://localhost:3002/entries/${id}`;
	const res = await fetch(uri);
	entryToEdit = await res.json();

	console.log('heres the entry that will edited:', entryToEdit);

	// TODO... 
	/* (need to figure this out, need to get the form to repopulate 
		with the selected value of the dropdown for Streaming On)*/
	const selectEl = document.getElementById('entryStreamingOn');
	let value = selectEl.options[selectEl.selectedIndex].value;
	console.log('what is this?', value);

	document.getElementById("entryTitle").value = entryToEdit.entryTitle;
	document.getElementById("entryYear").value = entryToEdit.entryYear;
	document.getElementById("entryGenre").value = entryToEdit.entryGenre;
	document.getElementById("entryDirectedBy").value = entryToEdit.entryDirectedBy;
	//document.getElementById("entryStreamingOn").value = entryToEdit.entryStreaminOn;
	//document.getElementById("entryStatus").value = entryToEdit.entryStatus;
	//document.querySelector("entryMediaType").value = entryToEdit.entryMediaType;
	document.getElementById("entryRunningTime").value = entryToEdit.entryRunningTime;
	document.getElementById("entryId").value = entryToEdit.id;
};

// =====================================================================

// Handle update entry
const updateEntry = async (data) => {
	let uri = `http://localhost:3002/entries/${document.getElementById("entryId").value}`;
	const res = await fetch(uri, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify(readFormData())
	});
};

// =====================================================================

// On form submit
formSubmitBtn.addEventListener("click", (e) => {
	console.log("formSubmit clicked!");

	// if entry ID is present, update entry
	if (document.getElementById("entryId").value === entryToEdit.id) {
		console.log("IF statement ran - TRUE");
		updateEntry(readFormData());
		fetchEntries();
		resetForm();
	} else {
		console.log("ELSE statement ran - FALSE");
		e.preventDefault();
		readFormData();
		addEntry(readFormData());
		console.log("Log form data:", readFormData());
		resetForm();
		fetchEntries();
	}
});