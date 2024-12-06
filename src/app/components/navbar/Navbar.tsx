"use client"

import { useEffect, useState } from "react";
import gsap from 'gsap';
import Link from "next/link";
import Image from "next/image";
import twitter from "@/app/assets/icons/twitter.svg"
import instagram from "@/app/assets/icons/instagram.svg"
import linkedin from "@/app/assets/icons/linkedin.svg"
import FoodThrowMatterJS from "../foodThrow/FoodThrowMatterJS";


const Navbar = () => {

    const [isOpen, setIsOpen] = useState(false)


    const navItems = [
        {
            number: "I",
            title: "FoodChin",
            link: "/"
        },
        {
            number: "II",
            title: "About",
            link: "/"
        },
        {
            number: "III",
            title: "Contact",
            link: "/"
        }
    ]

    const socialLink = [
        {
            src: twitter,
            title: "Twitter",
            link: "/"
        },
        {
            src: instagram,
            title: "Instagram",
            link: "/"
        },
        {
            src: linkedin,
            title: "Linkedin",
            link: "/"
        }
    ]

    const tl = gsap.timeline();

    const openNav = () => {
        setIsOpen(!isOpen)
    }



    useEffect(() => {
        if (isOpen) {
            tl.from(navItems.map((item, index) => ".number-nav-" + index), {
                x: "-=50",
                duration: 1,
                stagger: 0.1,
            },)
            tl.from(navItems.map((item, index) => ".title-nav-" + index), {
                x: "+=100",
                duration: 1,
                stagger: 0.1,
            }, "<")

            tl.from(socialLink.map((item, index) => ".social-link-" + index), {
                y: "+=50",
                opacity: 0,
                duration: 0.75,
                stagger: 0.25,
            })

        }
    }, [isOpen])


    return (
        <>
            <header className="w-full p-4 flex flex-row-reverse fixed z-[11]">
                <button onClick={openNav} className={`relative z-10 bg-[#f9ec0c] rounded-md w-10 h-10 sm:w-11 sm:h-11 flex flex-col items-center justify-center cursor-pointer transition-transform transform duration-[1.2s]`}>
                    <span className={`bg-black w-3 h-[3px] block rounded-full my-[2px] transition-transform ${isOpen ? "transform rotate-45 scale-x-[1.65]" : ""}`}></span>
                    <span className={`bg-black w-3 h-[3px] block rounded-full my-[2px] transition-transform ${isOpen ? "transform scale-0" : ""}`}></span>
                    <span className={`bg-black w-3 h-[3px] block rounded-full my-[2px] transition-transform ${isOpen ? "transform -rotate-45 scale-x-[1.65]" : ""}`}></span>
                </button>
            </header>
            <div className={`fixed w-full h-full bg-[#020b0a] z-[8] top-0 opacity-0 pointer-events-none transition-opacity duration-800   ${isOpen ? "opacity-80" : ""}`}>
            </div>
            <nav className={`fixed inset-0 left-0 lg:left-1/2 bg-[#008C44] transition-transform duration-500 z-[9] flex flex-col justify-center items-center ${isOpen ? "translate-x-0" : "translate-x-full"}`}>
                {isOpen && <>
                    <div className="flex flex-col gap-6 sm:gap-10">
                        {
                            navItems.map((item, index) => {
                                return (
                                    <div className="flex items-center gap-4 sm:gap-8" key={index}>
                                        <span className={`number-nav-${index} text-white text-xs sm:text-sm`}>{item.number}</span>
                                        <Link className={`title-nav-${index} text-[#f9ec0c] font-extrabold text-4xl sm:text-6xl uppercase tracking-wider hover:text-white transition-colors`} title={item.title} href={item.link} >{item.title}</Link>
                                    </div>
                                )
                            })
                        }
                    </div>

                    <div className="flex items-center justify-center gap-5 absolute bottom-8 w-full">
                        {
                            socialLink.map((item, index) => {
                                return (
                                    <a key={index} className={`social-link-${index} flex items-center justify-center`} href={item.link}>
                                        <Image className="w-6 h-6 filter-color-image" src={item.src} alt={item.title} />
                                    </a>
                                )
                            })
                        }
                    </div>
                </>
                }

            </nav>
            {
                isOpen && <FoodThrowMatterJS />
            }
        </>
    )
}

export default Navbar