'use client'
import React from 'react'

const Pdftemplate = () => {
    return (
        <div
            style={{
                width: "210mm",
                height: "297mm",
                background: "#fff",
                margin: "40px auto",
                padding: "40px",
                border: "1px solid #ccc",
                boxShadow: "0 0 10px rgba(0,0,0,0.1)",
                fontFamily: "Calibri, Arial, sans-serif"
            }}
        >
            <h1 style={{ textAlign: "center", margin: "32px 0" }}>
                Certificate of Achievement
            </h1>
            <p style={{ fontSize: "18px", marginTop: "80px", textAlign: "center" }}>
                This certifies that
            </p>
            <p style={{ fontSize: "24px", fontWeight: "bold", margin: "32px 0", textAlign: "center" }}>
                [Name]
            </p>
            <p style={{ fontSize: "18px", textAlign: "center" }}>
                (Roll No. [Roll Number]) has completed the course.
            </p>
            <div style={{ position: "absolute", bottom: 60, right: 80 }}>
                <p>Signature</p>
            </div>
        </div>
    )
}

export default Pdftemplate