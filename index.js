const fs = require("fs");
const { PDFDocument } = require("pdf-lib");

async function mergeOddEvenPdfs(oddPdfPath, evenPdfPath, outputPdfPath) {
  // Load the odd and even PDFs
  const oddPdfBytes = fs.readFileSync(oddPdfPath);
  const evenPdfBytes = fs.readFileSync(evenPdfPath);

  const oddPdfDoc = await PDFDocument.load(oddPdfBytes);
  const evenPdfDoc = await PDFDocument.load(evenPdfBytes);

  // Create a new PDF document to hold the merged pages
  const mergedPdfDoc = await PDFDocument.create();

  const totalPages = oddPdfDoc.getPageCount() + evenPdfDoc.getPageCount();

  // 1 - 9
  // 10 - 17
  // 18 - 33
  // 34 - 45
  // 46 - 56

  for (let i = 0; i < totalPages / 2; i++) {
    if (i < oddPdfDoc.getPageCount()) {
      const [oddPage] = await mergedPdfDoc.copyPages(oddPdfDoc, [i]);
      mergedPdfDoc.addPage(oddPage);
    }
    if (i < evenPdfDoc.getPageCount()) {
      const [evenPage] = await mergedPdfDoc.copyPages(evenPdfDoc, [i]);
      mergedPdfDoc.addPage(evenPage);
    }
  }

  // Save the merged PDF to a file
  const mergedPdfBytes = await mergedPdfDoc.save();
  fs.writeFileSync(outputPdfPath, mergedPdfBytes);
}

// Paths to the input PDFs and the output PDF
const oddPdfPath = "oddPdfPathf";
const evenPdfPath = "evenPdfPath";
const outputPdfPath = "outputPdfPath";

// Merge the PDFs
mergeOddEvenPdfs(oddPdfPath, evenPdfPath, outputPdfPath)
  .then(() => console.log("PDFs merged successfully"))
  .catch((err) => console.error("Failed to merge PDFs", err));
