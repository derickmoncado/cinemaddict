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

	// =================================================================================
	/* Begin App JS */
	// =================================================================================

	// Elements
	const formSubmitBtn = document.getElementById("formSubmitBtn");
	const forms = document.querySelectorAll(".needs-validation");
	const entryRow = document.querySelector(".currently-watching");
	const dismissBtn = document.querySelector(".dismissBtn");

	// Read form data
	const readFormData = () => {
		let formData = {};
		formData["entryTitle"] = document.getElementById("entryTitle").value;
		formData["entryYear"] = document.getElementById("entryYear").value;
		formData["entryGenre"] = document.getElementById("entryGenre").value;
		formData["entryDirectedBy"] = document.getElementById("entryDirectedBy").value;
		formData["entryStreamingOn"] = document.getElementById("entryStreamingOn").value;
		formData["entryStatus"] = document.getElementById("entryStatus").value;
		formData["entryMediaType1"] = document.getElementById("entryMediaType1").value;
		formData["entryMediaType2"] = document.getElementById("entryMediaType2").value;
		formData["entryMediaType3"] = document.getElementById("entryMediaType3").value;
		formData["entryRunningTime"] = document.getElementById("entryRunningTime").value;
		//formData["id"] = document.getElementById("wineID").value || "";
		return formData;
	};

	// Clear form data
	const resetForm = () => {
		document.getElementById("entryTitle").value = "";
		document.getElementById("entryYear").value = "";
		document.getElementById("entryGenre").value = "";
		document.getElementById("entryDirectedBy").value = "";
		document.getElementById("entryStreamingOn").value = "";
		document.getElementById("entryStatus").value = "";
		document.getElementById("entryMediaType1").value = "";
		document.getElementById("entryMediaType2").value = "";
		document.getElementById("entryMediaType3").value = "";
		document.getElementById("entryRunningTime").value = "";
	}

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
					<span>${entry.entryMediaType}</span>
				</div> q
				<div class="entry__actions">
					<button type="button"><i class="bi bi-pencil-fill"></i></button>
					<button type="button"><i class="bi bi-trash-fill"></i></button>
				</div>
				<div class="entry__streaming-on" style="background-image: url('${entry.entryStreamingOn}')"></div> 
			</div>
			`;
		});

		entryRow.innerHTML = template;
	};

	fetchEntries();

	// Add entry
	const addEntry = async (data) => {
		let uri = "http://localhost:3002/entries";
		const res = await fetch(uri, {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(data)
		});
	};


	// On form submit
	formSubmitBtn.addEventListener("click", (e) => {
		console.log("formSubmit clicked!");
		//e.preventDefault();
		readFormData();
		addEntry(readFormData());
		console.log("Log form data:", readFormData());
		//resetForm();
		//fetchEntries();
	});

	// On dismiss button click
	dismissBtn.addEventListener("click", (e) => {
		console.log("dismissBtn clicked!");
		e.preventDefault();
		resetForm();
		fetchEntries();
	});


})();