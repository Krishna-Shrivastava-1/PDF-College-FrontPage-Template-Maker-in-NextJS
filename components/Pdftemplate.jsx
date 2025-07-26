
'use client'
import Image from 'next/image'
import React, { useState } from 'react'
import colllogo from '../assets/download-removebg-preview (1).png'
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Input } from './ui/input';
import { Button } from './ui/button';

const Pdftemplate = () => {
  const [namesarr, setnamesarr] = useState('');
  const [studentnamewithrollnum, setstudentnamewithrollnum] = useState([]);
  const [filename, setfilename] = useState('LabReport');
  const [fontFamily, setFontFamily] = useState('Calibri, Arial, sans-serif');

//   const handleDownloadPDF = async () => {
//     const input = document.getElementById("pdf-template");
//     if (!input) return;
//     const canvas = await html2canvas(input, { scale: 2 });
//     const imgData = canvas.toDataURL("image/png");
//     const pdf = new jsPDF("p", "mm", "a4");
//     pdf.addImage(imgData, "PNG", 0, 0, 210, 297);
//     pdf.save(filename);
//   };

const handleDownloadPDF = async () => {
  const input = document.getElementById("pdf-template");
  if (!input) return;

  // Wait for all images inside the PDF area to load
  const images = input.querySelectorAll("img");
  await Promise.all(
    Array.from(images).map((img) => {
      if (img.complete && img.naturalHeight !== 0) return Promise.resolve();
      return new Promise((resolve) => {
        img.onload = img.onerror = resolve;
      });
    })
  );

  // Give the browser a brief pause to finish rendering
  await new Promise((res) => setTimeout(res, 200));

  const canvas = await html2canvas(input, {
    scale: 2,
    useCORS: true,
    allowTaint: true,
    logging: true,
    backgroundColor: "#fff", // Optional: ensures white background
  });

  const imgData = canvas.toDataURL("image/png");
  const pdf = new jsPDF("p", "mm", "a4");
  pdf.addImage(imgData, "PNG", 0, 0, 210, 297);
  pdf.save(filename || "LabReport.pdf");
};



  const handleadd = () => {
    try {
      if (!namesarr.trim()) return;
      setstudentnamewithrollnum([...studentnamewithrollnum, namesarr.trim()]);
      setnamesarr('');
    } catch (error) {
      console.log(error)
      alert('error is coming ' + error)
    }
  };

  const handledelete = (id) => {
    try {
      setstudentnamewithrollnum(studentnamewithrollnum.filter((_, idx) => idx !== id));
    } catch (error) {
      console.log(error)
      alert('error is coming ' + error)
    }
  }

  const fontOptions = [
    { label: "Calibri", value: "Calibri, Arial, sans-serif" },
    { label: "Arial", value: "Arial, Helvetica, sans-serif" },
    { label: "Times New Roman", value: "'Times New Roman', Times, serif" },
    { label: "Georgia", value: "Georgia, serif" },
    { label: "Courier New", value: "'Courier New', Courier, monospace" },
    { label: "Roboto", value: "Roboto, Arial, sans-serif" },
    { label: "Monospace", value: "monospace" },
  ];

  return (
    <div style={{ background: "#120026", minHeight: "100vh" }}>
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          position: "sticky",
          top: 0,
          zIndex: 40,
          background: "rgba(0,0,0,0.40)",
          backdropFilter: "blur(2px)",
          padding: "8px 0",
        }}
      >
        <Dialog>
          <DialogTrigger>
            <div style={{
              background: "#16a34a",
              cursor: "pointer",
              userSelect: "none",
              fontWeight: 600,
              color: "white",
              padding: "8px 16px",
              borderRadius: "12px"
            }}>
              Add Submitted by Names
            </div>
          </DialogTrigger>
          <DialogContent className='dark text-white'>
            <DialogHeader>
              <DialogTitle>You can Add Submitted by Names here</DialogTitle>
              <DialogDescription>
                You can Delete any name by clicking on it
              </DialogDescription>
              <div>
                <div style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: 8
                }}>
                  <Input
                    placeholder="Elon Musk (0901CSxxxxxx)"
                    type="text"
                    value={namesarr}
                    onChange={e => setnamesarr(e.target.value)}
                  />
                  <Button variant="outline" onClick={handleadd}>Add Name</Button>
                </div>
                <h3 style={{ marginTop: 8, fontWeight: 600 }}>Added Names -:</h3>
                {studentnamewithrollnum.map((e, index) => (
                  <div
                    onClick={() => handledelete(index)}
                    style={{
                      background: "#b91c1c",
                      cursor: "pointer",
                      borderRadius: "12px",
                      margin: "4px 0",
                      padding: "3px 0"
                    }}
                    key={index}
                  >
                    <h1 style={{ textAlign: "center", fontSize: 20, fontWeight: 700, color: "white" }}>{e}</h1>
                  </div>
                ))}
              </div>
            </DialogHeader>
          </DialogContent>
        </Dialog>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "6px",
            border: "1px solid #e5e7eb",
            padding: "8px",
            borderRadius: "12px",
            background: "#09090b"
          }}
        >
          <h2 style={{ color: "white", fontWeight: 600, margin: 0 }}>File name -:</h2>
          <input
            type='text'
            style={{
              border: "none",
              outline: "none",
              textDecoration: "underline",
              color: "white",
              fontSize: 16,
              fontWeight: 600,
              background: "transparent",
              width: "110px"
            }}
            placeholder='File Name'
            value={filename}
            onChange={(e) => setfilename(e.target.value)}
          />
        </div>
        <div
          style={{
            display: "flex",
            gap: "12px",
            alignItems: "center",
            background: "rgba(0,0,0,0.40)",
            padding: "8px 16px",
            borderRadius: "12px",
            marginBottom: "8px"
          }}
        >
          <span style={{ color: "white", fontWeight: 600 }}>Font Style:</span>
          <select
            style={{
              borderRadius: "6px",
              padding: "4px 8px",
              color: "white",
              background: "#09090b",
              fontFamily,
              fontSize: 15
            }}
            value={fontFamily}
            onChange={e => setFontFamily(e.target.value)}
          >
            {fontOptions.map(opt => (
              <option style={{ color: "white" }} key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>
        <Button
          onClick={handleDownloadPDF}
          style={{
            background: "#0284c7",
            cursor: "pointer",
            userSelect: "none",
            marginLeft: "12px",
            color: "white",
            fontWeight: 600,
            fontSize: 16,
            borderRadius: "10px",
            padding: "8px 18px"
          }}
        >
          Download as PDF
        </Button>
      </div>

      <div
        id="pdf-template"
        style={{
          width: "210mm",
          height: "297mm",
          background: "#fff",
          margin: "auto",
          padding: "40px",
          border: "1px solid #ccc",
          boxShadow: "0 0 10px rgba(0,0,0,0.1)",
          fontFamily,
          color: "black",
          position: "relative",
          paddingTop:"20px"
        }}
      >
        <h1 style={{
          textAlign: "center",
          fontSize: 32,
          margin: "30px 0 12px 0",
          fontWeight: "bold",
          color: "#270b9d"
        }}>
          Madhav Institute of Technology & Science, Gwalior (M.P.), INDIA
        </h1>
        <h1 style={{
          textAlign: "center",
          fontSize: 20,
          fontWeight: "bold",
          margin: "0 0 6px 0",
          color: "#d52720"
        }}>
          Deemed University
        </h1>
        <h1 style={{
          textAlign: "center",
          fontSize: 19,
          fontWeight: "bold",
          color: "#259208",
          margin: "0 0 6px 0"
        }}>
          (Declared under Distinct Category by Ministry of Education, Government of India)
        </h1>
        <h1 style={{
          textAlign: "center",
          fontSize: 20,
          fontWeight: "bold",
          color: "#d52720",
          margin: "0 0 10px 0"
        }}>
          NAAC ACCREDITED WITH A++ GRADE
        </h1>
        <div style={{
          marginTop: "18px",
          width: "100%",
          height: "1px",
          background: "#18181b"
        }} />
        <div style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          margin: "20px 0"
        }}>
          {/* <Image alt='college logo' src={colllogo} width={250} height={250} /> */}
       <img
  src="/assets/logo.png"
  alt="college logo"
  id="college-logo"
  width="250"
  height="250"
  style={{
    objectFit: "contain",
    maxWidth: "100%",
    height: "auto",
    display: "block",
    margin: "0 auto"
  }}
/>


        </div>
        <h1 style={{
          textAlign: "center",
          fontSize: 24,
          margin: "6px 0"
        }}>
          <input
            type="text"
            style={{
              border: "none",
              outline: "none",
              textAlign: "center",
              width: "75%",
              fontSize: 24,
              fontWeight: 600
            }}
           
            placeholder='Enter which type file is it lab or project'
          />
        </h1>
        <h1 style={{
          textAlign: "center",
          fontWeight: "bold",
          textDecoration: "underline",
          fontSize: 24,
          margin: "10px 0"
        }}>
          <input
            type="text"
            style={{
              border: "none",
              outline: "none",
              textAlign: "center",
              width: "75%",
              fontSize: 24,
              fontWeight: 600
            }}
            placeholder='Name of project or subject'
          />
        </h1>
        <div style={{
          marginTop: "18px",
          fontSize: 20,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontWeight: "bold"
        }}>
          <span style={{
            textAlign: "center",
            fontSize: 20,
            fontWeight: "bold",
            marginRight: "6px"
          }}>Date -</span>
          <input
            type="text"
            style={{
              textAlign: "center",
              width: 105,
              border: "none",
              outline: "none",
              fontSize: 19,
              fontWeight: 600,
              marginTop:14
            }}
            placeholder='Enter Date'
            maxLength={10}
          />
        </div>
        <div style={{
          minHeight: "50px",
          width: "100%",
          textAlign: "center",
          marginTop: "18px"
        }}>
          <h1 style={{
            textAlign: "center",
            fontSize: 20,
            fontWeight: 700
          }}>
            Submitted by :
          </h1>
          {studentnamewithrollnum.length > 0 ?
            studentnamewithrollnum.map((e, index) => (
              <div key={index}>
                <h1 style={{
                  textAlign: "center",
                  fontSize: 20,
                  fontWeight: 700
                }}>
                  {e}
                </h1>
              </div>
            ))
            :
            <div>
              <p style={{ color: "#999", fontStyle: "italic" }}>Add names by Add Submitted by Names Button</p>
            </div>
          }
        </div>
        <h1 style={{
          textAlign: "center",
          fontSize: 20,
          fontWeight: 700,
          marginTop: "20px"
        }}>
          Submitted to :
        </h1>
        <h1 style={{
          textAlign: "center",
          fontSize: 20,
          fontWeight: 700,
        }}>
          <input
            type="text"
            style={{
              border: "none",
              outline: "none",
              textAlign: "center",
              width: "75%",
              fontSize: 20,
              fontWeight: 600
            }}
            placeholder='Enter Prof. professor name'
          />
        </h1>
        <div style={{
          marginTop: "24px",
          width: "100%",
          height: "1px",
          background: "#18181b"
        }} />
         <h1 style={{
          textAlign: "center",
          fontSize: 20,
          fontWeight: 700,
        }}>
          <input
            type="text"
            style={{
              border: "none",
              outline: "none",
              textAlign: "center",
              width: "75%",
              fontSize: 20,
              fontWeight: 600
            }}
            placeholder='DEPARTMENT OF COMPUTER SCIENCE & ENGINEERING'
          />
        </h1>
        {/* <h1 style={{
          textAlign: "center",
          fontSize: 20,
          fontWeight: 700,
          marginTop: "20px"
        }}>
          DEPARTMENT OF COMPUTER SCIENCE & ENGINEERING
        </h1> */}
        <h1 style={{
          textAlign: "center",
          fontSize: 20,
          fontWeight: 700,
          marginTop: "16px"
        }}>
          <input
            type="text"
            style={{
              border: "none",
              outline: "none",
              textAlign: "center",
              width: "75%",
              fontSize: 18,
              fontWeight: 600
            }}
            placeholder='Enter whatever month is it - ex -Jan-June 2025'
          />
        </h1>
      </div>
    </div>
  )
}

export default Pdftemplate;