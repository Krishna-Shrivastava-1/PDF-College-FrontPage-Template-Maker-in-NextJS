// components/ReplaceFrontPageTool.jsx
'use client';
import React, { useState, useRef } from 'react';
import html2canvas from 'html2canvas';
import { PDFDocument } from 'pdf-lib';

const ReplaceFrontPageTool = () => {
  const [pdfFile, setPdfFile] = useState(null);
  const [pdfBytesWithoutFront, setPdfBytesWithoutFront] = useState(null);
  const pageRef = useRef(); // Ref to the div that becomes new front page

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const arrayBuffer = await file.arrayBuffer();

    const existingPdf = await PDFDocument.load(arrayBuffer);
    const totalPages = existingPdf.getPageCount();

    const newPdf = await PDFDocument.create();
    const pages = await newPdf.copyPages(existingPdf, [...Array(totalPages - 1).keys()].map(i => i + 1));
    pages.forEach(page => newPdf.addPage(page));

    const newPdfBytes = await newPdf.save();
    setPdfBytesWithoutFront(newPdfBytes);
    setPdfFile(file);
  };

  const generateFrontPagePdf = async () => {
    const input = pageRef.current;
    const canvas = await html2canvas(input, { scale: 2 });
    const imgData = canvas.toDataURL("image/png");

    const pdf = await PDFDocument.create();
    const page = pdf.addPage([595.28, 841.89]);
    const pngImage = await pdf.embedPng(imgData);
    page.drawImage(pngImage, {
      x: 0,
      y: 0,
      width: page.getWidth(),
      height: page.getHeight(),
    });

    const pdfBytes = await pdf.save();
    return pdfBytes;
  };

  const mergeAndDownload = async () => {
    const frontBytes = await generateFrontPagePdf();
    const frontPdf = await PDFDocument.load(frontBytes);
    const restPdf = await PDFDocument.load(pdfBytesWithoutFront);

    const finalPdf = await PDFDocument.create();

    const [frontPage] = await finalPdf.copyPages(frontPdf, [0]);
    finalPdf.addPage(frontPage);

    const restPages = await finalPdf.copyPages(restPdf, restPdf.getPageIndices());
    restPages.forEach((page) => finalPdf.addPage(page));

    const finalPdfBytes = await finalPdf.save();
    const blob = new Blob([finalPdfBytes], { type: 'application/pdf' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'MergedPDF.pdf';
    link.click();
  };

  return (
    <div className="p-4">
      <h2 className="text-lg font-bold mb-2">Replace Front Page in PDF</h2>

      <input type="file" accept="application/pdf" onChange={handleUpload} className="mb-4" />

      <div ref={pageRef} className="w-[595px] h-[842px] bg-white border p-4 shadow">
        {/* 🖊️ Your editable front page here */}
        <h1 className="text-2xl font-bold">My Edited Front Page</h1>
        <p>Name: John Doe</p>
        <p>Course: B.Tech CSE</p>
       
      </div>
      

      <button onClick={mergeAndDownload} className="mt-4 bg-blue-600 text-white px-4 py-2 rounded">
        Download Final PDF
      </button>
    </div>
  );
};

export default ReplaceFrontPageTool;
