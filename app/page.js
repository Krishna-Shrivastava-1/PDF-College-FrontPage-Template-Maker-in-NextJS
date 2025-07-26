'use client'
import DarkVeil from "@/components/DarkVeil";
import Navbar from "@/components/Navbar";
import Pdftemplate from "@/components/Pdftemplate";
import ReplaceFrontPageTool from "@/components/ReplaceFrontPageTool";
import SpotlightCard from "@/components/SpotlightCard";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
    <div className="min-h-screen bg-[#120026] text-white ">
      {/* Navbar */}
   <Navbar />

      {/* Hero Section */}
      <section className="text-center pt-16 pb-10 px-2 z-30 ">
        <h1 className="text-4xl sm:text-5xl font-black  text-white mb-4 drop-shadow-lg">
         <span className="textsh"> Report Front Page Generator </span> <span className="text-purple-400">for MITS</span>
        </h1>
        <p className="text-[#eaeaea] text-xl mt-2 max-w-xl mx-auto">
          FREE · Unlimited · No Watermark&nbsp;
          <span className="inline-block text-purple-300 rounded px-2 py-0.5 bg-[#3b1866]/50">Made for Students</span>
        </p>
        <Link
          href="/front-page-maker"
          className="inline-block mt-8 px-8 py-3 rounded-full bg-gradient-to-r from-purple-600 to-purple-400 text-lg text-white font-extrabold shadow-2xl hover:scale-105 active:scale-95 duration-150 border-2 border-purple-700"
        >
          Make your Front Page Now
        </Link>
      </section>

      {/* Features Section */}
      <section id="features" className="max-w-4xl mx-auto py-10 px-5 grid md:grid-cols-3 gap-8">
        {[
          {
            icon: "⚡",
            title: "Instant PDF Download",
            desc: "Na login, na jagda – ek click par college format download."
          },
          {
            icon: "🆓",
            title: "Unlimited Free",
            desc: "Bina kisi watermark ke. 24x7 open. Sabbachon ke liye Free Forever."
          },
          {
            icon: "📄",
            title: "Perfect MITS Format",
            desc: "Seniors/juniors ko bhi bolo – 100% ready template."
          }
        ].map(feat => (
         
             <SpotlightCard key={feat.title} className="bg-white/10 border border-purple-800 rounded-2xl shadow-xl p-7 flex flex-col items-center" spotlightColor="#4f1d54">

            <span className="text-5xl mb-3">{feat.icon}</span>
            <h3 className="font-extrabold text-xl text-purple-300 mb-1">{feat.title}</h3>
            <p className="text-[#dedcf3] text-center text-sm">{feat.desc}</p>
</SpotlightCard>
         
        ))}
      </section>

      {/* How it Works */}
      <section id="how" className="max-w-2xl mx-auto py-12 px-4 text-center">
        <h2 className="text-3xl font-bold text-purple-300 mb-7">Kaise Kaam Karta Hai?</h2>
        <div className="flex flex-col md:flex-row justify-center items-center gap-8">
          <div>
            <div className="text-3xl bg-purple-800 text-white w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-2">1</div>
            <div className="font-semibold mb-1">Fields Bharo</div>
            <div className="text-sm text-purple-200">Naam, Roll, File Type</div>
          </div>
          <span className="hidden md:inline text-3xl mx-2 text-purple-300">→</span>
          <div>
            <div className="text-3xl bg-purple-800 text-white w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-2">2</div>
            <div className="font-semibold mb-1">Preview Dekho</div>
            <div className="text-sm text-purple-200">Live layout wahi, jo download mein milega.</div>
          </div>
          <span className="hidden md:inline text-3xl mx-2 text-purple-300">→</span>
          <div>
            <div className="text-3xl bg-purple-800 text-white w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-2">3</div>
            <div className="font-semibold mb-1">Download PDF</div>
            <div className="text-sm text-purple-200">File mein laga lo, full professional first page.</div>
          </div>
        </div>
      </section>

      {/* Creator Credit Section */}
      <section id="about" className="w-full mx-auto py-10 px-4 text-center bg-purple-950">
        <h2 className="text-2xl font-semibold text-purple-300 mb-2">Created by Krishna Shrivastava</h2>
        <p className="text-purple-100 text-lg mb-2">
          MITS CSE 3rd year, laya aapke liye ek easy utility – Share karo sab batchmates ke saath!
        </p>
        <div className="flex flex-col gap-1 items-center mt-4 text-purple-200">
          {/* <a href="https://instagram.com/aapkausername" target="_blank" className="hover:underline">Instagram</a> */}
         <a
  href="https://www.linkedin.com/in/krishna-shrivastava-62b72129a"
  target="_blank"
  rel="noopener noreferrer"
  className="hover:underline"
>
  LinkedIn
</a>

        </div>
        <p className="text-xs text-purple-100 mt-5 opacity-80">
          Not official – just a buddy helping fellow MITSians ❤ 
        </p>
      </section>
    </div>

      {/* <Pdftemplate /> */}
       {/* <ReplaceFrontPageTool /> */}
    </>
  );
}
