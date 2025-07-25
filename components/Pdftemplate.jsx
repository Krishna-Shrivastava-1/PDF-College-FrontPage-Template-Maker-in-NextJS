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
    const [namesarr, setnamesarr] = useState('')
    const [studentnamewithrollnum, setstudentnamewithrollnum] = useState([])
    const [filename, setfilename] = useState('LabReport')
    const handleDownloadPDF = async () => {
        const input = document.getElementById("pdf-template");
        if (!input) return;
        const canvas = await html2canvas(input, { scale: 2 });
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF("p", "mm", "a4");
        pdf.addImage(imgData, "PNG", 0, 0, 210, 297); // Full A4
        pdf.save(filename);
    };

    const handleadd = () => {
        try {
            if (!namesarr) return;
            if (namesarr) {
                namesarr.trim()
                setstudentnamewithrollnum([...studentnamewithrollnum, namesarr])
                setnamesarr('')
            }
        } catch (error) {
            console.log(error)
            alert('error is comming ', error)
        }

    }
    const handledelete = (id) => {
        try {
            setstudentnamewithrollnum(studentnamewithrollnum.filter((_, idx) => idx !== id))
        } catch (error) {
            console.log(error)
            alert('error is comming ', error)
        }
    }
    return (
        <div className='bg-zinc-950'>
            <div className='w-full flex justify-around items-center  sticky top-0 z-40 bg-black/40 backdrop-blur-lg'>
                <Dialog className='text-white'>
                    <DialogTrigger><div className='bg-green-600 cursor-pointer select-none font-semibold text-white p-2 rounded-xl'>Add Submitted by Names</div></DialogTrigger>
                    <DialogContent className='dark text-white'>
                        <DialogHeader>
                            <DialogTitle>You can Add Submitted by Names here</DialogTitle>
                            <DialogDescription>
                                You can Delete any name by clicking on it
                            </DialogDescription>
                            <div>
                                <div className='flex items-center justify-between'>
                                    <Input placeholder="Elon Musk (0901CSxxxxxx)" type="text" onChange={(e) => setnamesarr(e.target.value)} />
                                    <Button variant="outline" onClick={handleadd}>Add Name</Button>
                                </div>
                                <h3>Added Names -:</h3>
                                {
                                    studentnamewithrollnum.map((e, index) => (
                                        <div onClick={() => handledelete(index)} className='hover:bg-red-700 cursor-pointer rounded-xl' key={index}>
                                            <h1 style={{ textAlign: "center" }} className='text-[20px]  font-bold'>
                                                {e}
                                            </h1>

                                        </div>
                                    ))
                                }
                            </div>
                        </DialogHeader>
                    </DialogContent>
                </Dialog>
                <div className='flex items-center justify-center gap-x-1.5'>
                    <h2 className='text-white font-semibold'>File name -:</h2>
                    <input type='text' className='border-none outline-none underline text-white tetx-lg font-semibold' placeholder='File Name' value={filename} onChange={(e) => setfilename(e.target.value)} />
                </div>

                <Button onClick={handleDownloadPDF} className='bg-sky-600 cursor-pointer select-none mx-3'>  Download as PDF</Button>
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
                    fontFamily: "Calibri, Arial, sans-serif",
                    color: 'black'
                }}
            >
                <h1 style={{ textAlign: "center" }} className='mx-5 text-[32px] mt-8 text-[#270b9d] font-bold'>
                    Madhav Institute of Technology & Science, Gwalior (M.P.), INDIA
                </h1>
                <h1 style={{ textAlign: "center" }} className='text-[20px] text-[#d52720] font-bold'>
                    Deemed University
                </h1>
                <h1 style={{ textAlign: "center" }} className='text-[19px] text-[#259208] font-bold'>
                    (Declared under Distinct Category by Ministry of Education, Government of India)
                </h1>
                <h1 style={{ textAlign: "center" }} className='text-[20px] text-[#d52720] font-bold'>
                    NAAC ACCREDITED WITH A++ GRADE
                </h1>
                <hr className='mt-6' />
                <div className='flex items-center justify-center w-full relative'>
                    <Image alt='college logo' src={colllogo} width={250} height={250} />
                </div>
                <h1 className='text-center text-2xl'>
                    {/* {labfileorProjectfileon} */}
                    <input type="text" className='border-none outline-none text-center w-[75%] font-semibold' placeholder='Enter which type file is it lab or project' />
                </h1>
                <h1 className='text-center font-bold text-2xl underline'>
                    <input type="text" className='border-none outline-none text-center w-[75%] font-semibold' placeholder='Name of project or subject' />
                    {/* Name of project or subject */}
                </h1>
                <div className='mt-5 text-[20px] flex items-center justify-center font-bold'>
                    <h1 style={{ textAlign: "center" }} className=' text-[20px] flex items-center justify-center font-bold'>
                        Date -
                    </h1>
                    <input type="text" className='text-center flex items-center mt-4 w-[105px] justify-center border-none outline-none ' placeholder='Enter Date' />
                </div>
                <div className='h-auto w-full text-center'>
                    <h1 style={{ textAlign: "center" }} className='text-[20px]  font-bold'>
                        Submitted by :
                    </h1>
                    {studentnamewithrollnum.length > 0 ?
                        studentnamewithrollnum.map((e, index) => (
                            <div key={index}>
                                <h1 style={{ textAlign: "center" }} className='text-[20px]  font-bold'>
                                    {e}
                                </h1>

                            </div>
                        ))
                        :
                        <div>
                            <p> Add names by Add Submitted by Names Button</p>
                        </div>
                    }
                    {/* <h1 style={{ textAlign: "center" }} className='text-[20px]  font-bold'>
                        Submitted by :
                    </h1>
                    <h1 style={{ textAlign: "center" }} className='text-[20px]  font-bold'>
                        anystudentname (with roll number)
                    </h1>
                    <h1 style={{ textAlign: "center" }} className='text-[20px]  font-bold'>
                        anystudentname (with roll number)
                    </h1>
                    <h1 style={{ textAlign: "center" }} className='text-[20px]  font-bold'>
                        anystudentname (with roll number)
                    </h1>
                    <h1 style={{ textAlign: "center" }} className='text-[20px]  font-bold'>
                        anystudentname (with roll number)
                    </h1> */}
                </div>
                <h1 style={{ textAlign: "center" }} className='text-[20px] mt-5  font-bold'>
                    Submitted to :
                </h1>
                <h1 style={{ textAlign: "center" }} className='text-[20px]  font-bold'>
                    <input type="text" className='border-none outline-none text-center w-[75%] font-semibold' placeholder='Enter Prof. professor name' />
                    {/* Prof. professir name */}
                </h1>
                <hr className='mt-6' />
                <h1 style={{ textAlign: "center" }} className='text-[20px] mt-4 font-bold'>
                    DEPARTMENT OF COMPUTER SCIENCE & ENGINEERING
                </h1>
                <h1 style={{ textAlign: "center" }} className='text-[20px] mt-4 font-bold'>
                    <input type="text" className='border-none outline-none text-center w-[75%] font-semibold' placeholder='Enter whatever month is it - ex -Jan-June 2025' />
                    {/* whatever month is it - ex -Jan-June 2025 */}
                </h1>
            </div>


        </div>
    )
}

export default Pdftemplate