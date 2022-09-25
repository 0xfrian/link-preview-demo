const { NodeCanvasFactory } = require("./helper/canvas-factory.js");
const pdfjs = require("pdfjs-dist");

async function previewPDF(pdf_url) {
    const loading_task = pdfjs.getDocument(pdf_url);
    try {
        const pdf = await loading_task.promise;
        let pdf_metadata = await pdf.getMetadata();

        // Note: First page starts at index i = 1
        let text = [];
        let image;
        for (let i = 1; i <= pdf.numPages; i++) {
            const page = await pdf.getPage(i);
            if (i == 1) {
                // Render the page on a Node canvas with 100% scale.
                const viewport = page.getViewport({ scale: 1.0 });
                const canvasFactory = new NodeCanvasFactory();
                const canvasAndContext = canvasFactory.create(
                    viewport.width,
                    viewport.height
                );
                const renderContext = {
                    canvasContext: canvasAndContext.context,
                    viewport,
                    canvasFactory,
                };
                const renderTask = page.render(renderContext);
                await renderTask.promise;
                
                // Convert the canvas to an image buffer.
                image = await canvasAndContext.canvas.toBuffer();
            } 

            const items = (await page.getTextContent()).items;
            for (const item of items) {
                text.push(item.str.trim());
            }

            // Release page resources.
            page.cleanup();
        }

        text = text.filter(item => item.length > 0).join(" ");

        pdf_metadata = {
            title       : pdf_metadata.info.Title ? pdf_metadata.info.Title : "N/A",
            author      : pdf_metadata.info.Author ? pdf_metadata.info.Author : "N/A",
            thumbnail   : image ? image.toString("base64") : "N/A",
            text        : text ? text : "N/A",
        };

        return pdf_metadata;
    } catch (error) {
        throw error;
    }
}

module.exports = {
    previewPDF,
};

