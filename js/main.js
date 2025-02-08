window.addEventListener('load', () => {
	// for main page
	addScrollEffectToSeeBackground();
	clickToShowPoster();
});

function addScrollEffectToSeeBackground() {
	const fullPage = document.querySelector('#full-page');
	const observer = new IntersectionObserver((entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					document.body.classList.add('scroll-end');
				} else {
					document.body.classList.remove('scroll-end');
				}
			});
		}, {
			root: document.body,
			threshold: 0.5,
		}
	);
	observer.observe(fullPage);
}

function removeCurrentPoster() {
	const iframeContainer = document.querySelector('.iframe-container');
	const iframe = iframeContainer.querySelector('iframe');
	iframeContainer.style.display = "none";
	iframeContainer.classList.remove("show");

	// wait some time to remove the src
	// setTimeout(()=>{
	// 	if (iframeContainer.classList.contains("show")) return;
	// 	iframe.src = "";
	// }, 1000);
}

function clickToShowPoster() {
	const iframeContainer = document.querySelector('.iframe-container');
	const posters = document.querySelectorAll('.card[href^="#"]');
	posters.forEach(poster => {
		const clickEvent = ()=>{
			const iframe = iframeContainer.querySelector('iframe');
			if(!iframe) return;
			iframe.src = poster.getAttribute('data-url');
			setTimeout(()=>{
				iframeContainer.style.display = "block";
				iframeContainer.classList.add("show");
			}, 0);
		}
		poster.addEventListener('click', clickEvent);
	});
	window.addEventListener('click', (e) => {
		if (iframeContainer.classList.contains("show") 
			&& !iframeContainer.contains(e.target) ) {
			removeCurrentPoster();
		}
	});
}




