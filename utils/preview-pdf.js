const pdfjs = require("pdfjs-dist");

async function previewPDF(pdf_url) {
    const loading_task = pdfjs.getDocument(pdf_url);
    try {
        const pdf = await loading_task.promise;
        let pdf_metadata = await pdf.getMetadata();

        pdf_metadata = {
            title       : pdf_metadata.info.Title ? pdf_metadata.info.Title : "N/A",
            author      : pdf_metadata.info.Author ? pdf_metadata.info.Author : "N/A",
            thumbnail: "https://www.freeiconspng.com/uploads/pdf-icon-png-pdf-zum-download-2.png"
        };

        return pdf_metadata;
    } catch (error) {
        throw error;
    }
}

module.exports = {
    previewPDF,
};

