
'use client'
import Image from 'next/image'
import React, { useState } from 'react'
import colllogo from '../assets/download-removebg-preview (1).png'
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Dot, Tally1 } from 'lucide-react';

const Certificate = () => {
  const [namesarr, setnamesarr] = useState('');
  const [studentnamewithrollnum, setstudentnamewithrollnum] = useState([]);
  const [filename, setfilename] = useState('LabReport');
  const [fontFamily, setFontFamily] = useState('Calibri, Arial, sans-serif');
const [projectTitle, setprojectTitle] = useState('')
const [professorName, setprofessorName] = useState('')
const [streamName, setstreamName] = useState('')

// const handleDownloadPDF = async () => {
//   const input = document.getElementById("pdf-template");
//   if (!input) return;

//   // Wait for all images inside the PDF area to load
//   const images = input.querySelectorAll("img");
//   await Promise.all(
//     Array.from(images).map((img) => {
//       if (img.complete && img.naturalHeight !== 0) return Promise.resolve();
//       return new Promise((resolve) => {
//         img.onload = img.onerror = resolve;
//       });
//     })
//   );

//   // Give the browser a brief pause to finish rendering
//   await new Promise((res) => setTimeout(res, 200));

//   const canvas = await html2canvas(input, {
//     scale: 2,
//     useCORS: true,
//     allowTaint: true,
//     logging: true,
//     backgroundColor: "#fff", // Optional: ensures white background
//   });

//   const imgData = canvas.toDataURL("image/png");
//   const pdf = new jsPDF("p", "mm", "a4");
//   pdf.addImage(imgData, "PNG", 0, 0, 210, 297);
//   pdf.save(filename || "LabReport.pdf");
// };
const handleDownloadPDF = async () => {
  if (!studentnamewithrollnum.length) {
    alert("Please add at least one student name.");
    return;
  }

  const pdf = new jsPDF({
    unit: "mm",
    format: "a4"
  });

  const pageWidth = 210;
  const pageHeight = 297;
  const scale = 2; // For better resolution

  for (let i = 0; i < studentnamewithrollnum.length; i++) {
    // Create a temporary container div for this page
    const container = document.createElement("div");
    container.style.width = `${pageWidth}mm`;
    container.style.height = `${pageHeight}mm`;
    container.style.background = "#fff";
    container.style.padding = "40px";
    container.style.boxSizing = "border-box";
    container.style.position = "relative";
    container.style.fontFamily = fontFamily;
    container.style.color = "black";
    container.style.display = "flex";
    container.style.flexDirection = "column";

    // Title 1
    const h1Title = document.createElement("h1");
    h1Title.textContent = "Madhav Institute of Technology and Science";
    Object.assign(h1Title.style, {
      textAlign: "center",
      fontSize: "28px",
      fontWeight: "bold",
      margin: "30px 0 12px 0"
    });

    // Title 2
    const h2Certificate = document.createElement("h1");
    h2Certificate.textContent = "Certificate";
    Object.assign(h2Certificate.style, {
      textAlign: "center",
      fontSize: "28px",
      fontWeight: "bold",
      margin: "25px 0 30px 0"
    });

    // Paragraph content
    const contentDiv = document.createElement("div");
    contentDiv.innerHTML = `
      This is certified that <strong>${studentnamewithrollnum[i]}</strong> has submitted the 
      project report titled <strong>${projectTitle}</strong> under the mentorship of 
      <strong>${professorName}</strong> in partial fulfilment of the requirement for the award of 
      degree of Bachelor of Technology in ${streamName} Engineering from 
      Madhav Institute of Technology and Science, Gwalior.
    `;
    Object.assign(contentDiv.style, {
      textAlign: "left",
      fontSize: "21px",
      margin: "6px auto",
      maxWidth: "85%",
      lineHeight: 1.4
    });

    // Footer content
    const footerDiv = document.createElement("div");
    Object.assign(footerDiv.style, {
      marginTop: "280px",
      textAlign: "left",
      fontSize: "19px",
      paddingLeft: "47px",
      maxWidth: "85%",
      // marginLeft: "auto",
      // marginRight: "auto",
      lineHeight: 1.3,
      textAlign: 'left'
    });

 const p1 = document.createElement('p');
p1.innerHTML = `<strong>${professorName}</strong>`;
p1.style.textAlign = 'left';  // explicitly set left alignment

const p2 = document.createElement('p');
p2.textContent = 'Faculty Mentor';
p2.style.textAlign = 'left';

const p3 = document.createElement('p');
p3.textContent = `${streamName} Engineering`;
p3.style.textAlign = 'left';


    footerDiv.appendChild(p1);
    footerDiv.appendChild(p2);
    footerDiv.appendChild(p3);

    // Append all to container
    container.appendChild(h1Title);
    container.appendChild(h2Certificate);
    container.appendChild(contentDiv);
    container.appendChild(footerDiv);

    // Add container temporarily to body to render properly
    document.body.appendChild(container);

    // Wait for any images inside container to load (if you have any)
    const images = container.querySelectorAll("img");
    await Promise.all(
      Array.from(images).map(img => 
        img.complete && img.naturalHeight !== 0 ? Promise.resolve() : new Promise(resolve => { img.onload = img.onerror = resolve; })
      )
    );

    // Small delay to ensure rendering is complete
    await new Promise(res => setTimeout(res, 100));

    // Render container to canvas
    const canvas = await html2canvas(container, { scale });

    // Remove container from DOM
    document.body.removeChild(container);

    // Convert canvas to image
    const imgData = canvas.toDataURL("image/png");

    if (i !== 0) {
      pdf.addPage();
    }

    // Add image to PDF page (fit to A4)
    pdf.addImage(imgData, "PNG", 0, 0, pageWidth, pageHeight);
  }

  // Trigger download
  pdf.save(filename ? `${filename}.pdf` : "output.pdf");
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
              Add Details here
            </div>
          </DialogTrigger>
          <DialogContent className='dark text-white'>
            <DialogHeader>
              <DialogTitle>You can Add Submitted by Names here</DialogTitle>
              <DialogDescription>
               <>
                <span className='flex items-center'>
                    <Dot size={35}/> You can Delete any name by clicking on it.  <span className='text-red-600 text-md font-semibold'>If you want to remove any page than delete student name that named page will be deleted automatically.</span>
                </span>
             
                <span className='flex items-center'>
                    <Dot size={33}/> Project Title, Professor Name, Stream [OR] Btech Course Name will be same in all Pages.
                </span>
               </>
              </DialogDescription>
              <div>
                 <div>
                    <Input
                    value={projectTitle}

                    placeholder="Project Title"
                    type="text"
                    required
                    onChange={e => setprojectTitle(e.target.value)}
                    className='my-2'
                  />
                    <Input
                    placeholder="Professor Name"
                    type="text"
                    value={professorName}
                    onChange={e => setprofessorName(e.target.value)}
                    className='my-2'
                  />
                    <div className='flex items-center'>
                        <Input
                    placeholder="Stream Name ex - Civil"
                    type="text"
                    value={streamName}
                    onChange={e => setstreamName(e.target.value)}
                    className='my-2 mr-2'
                  />
                  <span>Engineering</span>
                    </div>
                </div>
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
                  {!projectTitle || !professorName || !streamName  ?
                  <Button disabled variant="outline" onClick={handleadd}>Add Name</Button>
                  :
                  <Button variant="outline" onClick={handleadd}>Add Name</Button>
                  } 
                  
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
{studentnamewithrollnum.length >0?
    studentnamewithrollnum?.map((e,index)=>(
<div key={index}
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
          
        }}
      >
        <h1 style={{
          textAlign: "center",
          fontSize: 28,
          margin: "30px 0 12px 0",
          fontWeight: "bold",
          
        }}>
          Madhav Institute of Technology & Science, Gwalior
        </h1>
        <h1 style={{
          textAlign: "center",
          fontSize: 28,
          fontWeight: "bold",
          margin: "25px 0 30px 0",
         
        }} >
         Certificate
        </h1>
       
    <div className='flex items-center justify-center '>
          <h1 style={{
          textAlign: "left",
          fontSize: 21,
          margin: "6px 2px",
          fontWeight:500
        }} className='max-w-[85%]'>
This is certified that <span className='font-bold'>{e}</span> have submitted the 
project report titled  <span className='font-bold'>{projectTitle}</span> under the mentorship of 
<span className='font-bold'> {professorName}</span>  in partial fulfilment of the requirement for the award of 
degree of Bachelor of Technology in <span >{streamName}</span>  <span >Engineering</span> from 
Madhav Institute of Technology and Science, Gwalior. 
      </h1>
    </div>
    <div className='flex items-left justify-center flex-col mt-46 text-left  p-12'>
          <h1 style={{
          textAlign: "left",
          fontSize: 19,
          margin: "6px 2px",
          fontWeight:500
        }} className=''>

<span className='font-bold'> {professorName}</span>   

      </h1>
          <h1 style={{
          textAlign: "left",
          fontSize: 19,
          margin: "2px 2px",
          fontWeight:500
        }} className='max-w-[85%]'>

Faculty Mentor

      </h1>
          <h1 style={{
          textAlign: "left",
          fontSize: 19,
          margin: "2px 2px",
          fontWeight:500
        }} className='max-w-[85%]'>

<span >{streamName}</span>  <span >Engineering</span> 

      </h1>
    </div>
      
      
      </div>
    ))
    :
    <div >
        
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
          
        }}
        className=' relative group'
      >
        <div className='absolute top-0 hidden left-0 group-hover:flex h-full w-full bg-black/40 backdrop-blur-md  items-center justify-center'>
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
              Add Details here
            </div>
          </DialogTrigger>
          <DialogContent className='dark text-white'>
            <DialogHeader>
              <DialogTitle>You can Add Submitted by Names here</DialogTitle>
                 <DialogDescription>
               <>
                <span className='flex items-center'>
                    <Dot size={35}/> You can Delete any name by clicking on it.  <span className='text-red-600 text-md font-semibold'>If you want to remove any page than delete student name that named page will be deleted automatically.</span>
                </span>
             
                <span className='flex items-center'>
                    <Dot size={33}/> Project Title, Professor Name, Stream [OR] Btech Course Name will be same in all Pages.
                </span>
               </>
              </DialogDescription>
              <div>
                 <div>
                    <Input
                    value={projectTitle}

                    placeholder="Project Title"
                    type="text"
                    
                    onChange={e => setprojectTitle(e.target.value)}
                    className='my-2'
                  />
                    <Input
                    placeholder="Professor Name"
                    type="text"
                    value={professorName}
                    onChange={e => setprofessorName(e.target.value)}
                    className='my-2'
                  />
                    <div className='flex items-center'>
                        <Input
                    placeholder="Stream Name ex - Civil"
                    type="text"
                    value={streamName}
                    onChange={e => setstreamName(e.target.value)}
                    className='my-2 mr-2'
                  />
                  <span>Engineering</span>
                    </div>
                </div>
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
                  {!projectTitle || !professorName || !streamName  ?
                  <Button disabled variant="outline" onClick={handleadd}>Add Name</Button>
                  :
                  <Button variant="outline" onClick={handleadd}>Add Name</Button>
                  } 
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
        </div>
        <h1 style={{
          textAlign: "center",
          fontSize: 28,
          margin: "30px 0 12px 0",
          fontWeight: "bold",
          
        }}>
          Madhav Institute of Technology & Science, Gwalior
        </h1>
        <h1 style={{
          textAlign: "center",
          fontSize: 28,
          fontWeight: "bold",
          margin: "25px 0 30px 0",
         
        }} >
         Certificate
        </h1>
       
    <div className='flex items-center justify-center '>
          <h1 style={{
          textAlign: "left",
          fontSize: 19,
          margin: "6px 2px",
          fontWeight:500
        }} className='max-w-[85%]'>
This is certified that [Enter Name] have submitted the 
project report titled  [Project Title] under the mentorship of 
[Professor Name] in partial fulfilment of the requirement for the award of 
degree of Bachelor of Technology in [Stream Name] from 
Madhav Institute of Technology and Science, Gwalior. 
      </h1>
    </div>
      <div className='flex items-left justify-center flex-col mt-46 text-left  p-12'>
          <h1 style={{
          textAlign: "left",
          fontSize: 19,
          margin: "6px 2px",
          fontWeight:500
        }} className=''>

<span className='font-bold'> {professorName}</span>   

      </h1>
          <h1 style={{
          textAlign: "left",
          fontSize: 19,
          margin: "2px 2px",
          fontWeight:500
        }} className='max-w-[85%]'>

Faculty Mentor

      </h1>
          <h1 style={{
          textAlign: "left",
          fontSize: 19,
          margin: "2px 2px",
          fontWeight:500
        }} className='max-w-[85%]'>

<span >{streamName}</span>  <span >Engineering</span> 

      </h1>
    </div>
      
      </div>
    </div>
}
      
    </div>
  )
}

export default Certificate;