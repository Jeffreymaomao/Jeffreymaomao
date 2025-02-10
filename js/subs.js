window.addEventListener('load', function() {
	if (typeof pdfjsLib === 'undefined') {
		console.log('Please include the PDF.js library first');
	}
	pdfjsLib.GlobalWorkerOptions.workerSrc = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.10.38/pdf.worker.min.mjs"
	const pdfContainers = document.querySelectorAll(".pdf-container")
	pdfContainers.forEach(rederPDF)
});
function rederPDF(pdfContainer) {
	const dataUrl     = pdfContainer.getAttribute("data-url");
	const pdfCanvas   = pdfContainer.querySelector(".pdf-canvas");
	const loadingTask = pdfjsLib.getDocument(dataUrl);
	if(!pdfCanvas){
		console.log("Canvas element not found");
		return;
	}
	let viewport = null;
	loadingTask.promise.then(pdf=>{
		return pdf.getPage(1)
	}).then(page=>{
		viewport = page.getViewport({ scale: 2.0 });
		pdfCanvas.height = viewport.height;
		pdfCanvas.width  = viewport.width;
		return page.render({
			canvasContext: pdfCanvas.getContext('2d'),
			viewport: viewport
		}).promise.then(() => page);
	}).then(page => {
		return page.getTextContent();
	}).then(textContent => {
		// const pdfText = pdfContainer.querySelector(".pdf-text");
		// if(!pdfText){
		// 	console.log("Text element not found");
		// 	return;
		// }
		// pdfText.innerHTML = "";
		// console.log(viewport)
		// const textLayer = new pdfjsLib.TextLayer({
		// 	container: pdfText,
		// 	textContentSource: textContent,
		// 	viewport: viewport,
		// });
		// textLayer.render(); 
	}).catch(error => {
		console.error("PDF.js rendering error: ", error);
	});
}