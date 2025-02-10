window.addEventListener('load', () => {
	const iframeContainer = document.querySelector('.iframe-container');
	// for main page
	addScrollEffectToSeeBackground();
	clickToShowPoster(iframeContainer);

	const params = new URLSearchParams(location.search);
	const poster = document.querySelector(`.card[href^="?poster=${params.get("poster")}"]`);
	if(poster){
		updatePosterFromURL(iframeContainer, poster)
	}
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
	iframeContainer.classList.remove("show");
	window.history.pushState({}, "", location.pathname);
	// wait some time to remove the src
	// setTimeout(()=>{
	// 	if (iframeContainer.classList.contains("show")) return;
	// 	iframe.src = "";
	// }, 1000);
}

function updatePosterFromURL(iframeContainer, posterCardDom) {
	const iframe = iframeContainer.querySelector('iframe');
	const posterSrc = posterCardDom.getAttribute('data-url');
	if(!iframe || !posterSrc) return; // not found
	// --- reset src
	if(iframe.getAttribute('src')!==posterSrc){
		iframe.src = "";
		iframe.src = posterSrc;
	}
	iframeContainer.classList.add("show");
}

function clickToShowPoster(iframeContainer) {
	document.addEventListener('click', (e) => {
		const poster = e.target.closest('.card[href^="?poster="]');
		if (poster) {
			e.preventDefault(); // avoid reloading webpage
			const url = new URL(poster.href, window.location.origin);
			window.history.pushState({}, "", url.search);
			updatePosterFromURL(iframeContainer, poster);
			return; // do not go to `removeCurrentPoster()`
		}

		if (iframeContainer.classList.contains("show") 
			&& !iframeContainer.contains(e.target)) {
			removeCurrentPoster();
		}
	});
}





