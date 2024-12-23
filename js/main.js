window.addEventListener('load', () => {
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
});