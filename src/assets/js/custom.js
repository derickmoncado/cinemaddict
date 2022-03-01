'use strict';

(function () {
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

	// Read form data
	const readFormData = () => {
		let formData = {};
		formData["entryTitle"] = document.getElementById("entryTitle").value;
		formData["yearReleased"] = document.getElementById("yearReleased").value;
		formData["genre"] = document.getElementById("genre").value;
		formData["directedBy"] = document.getElementById("directedBy").value;
		formData["streamingOn"] = document.getElementById("streamingOn").value;
		formData["status"] = document.getElementById("status").value;
		formData["movie"] = document.getElementById("movie").value;
		formData["series"] = document.getElementById("series").value;
		formData["documentary"] = document.getElementById("documentary").value;
		formData["runningTime"] = document.getElementById("runningTime").value;
		//formData["id"] = document.getElementById("wineID").value || "";
		return formData;
	};

	// Clear form data
	const resetForm = () => {
		document.getElementById("entryTitle").value = "";
		document.getElementById("yearReleased").value = "";
		document.getElementById("genre").value = "";
		document.getElementById("directedBy").value = "";
		document.getElementById("streamingOn").value = "";
		document.getElementById("status").value = "";
		document.getElementById("movie").value = "";
		document.getElementById("series").value = "";
		document.getElementById("documentary").value = "";
		document.getElementById("runningTime").value = "";
	}

	// On form submit
	formSubmitBtn.addEventListener("click", (e) => {
		e.preventDefault();
		console.log("submit button was clicked!");

		readFormData();
		console.log("form data:", readFormData());
	});
})();