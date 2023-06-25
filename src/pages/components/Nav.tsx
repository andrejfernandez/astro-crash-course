import avatar from "/avatar.png"
import { motion } from "framer-motion"
import { useState } from "react"
import { useMediaQuery } from "../..//util/useMediaQuery"

// Framer motion variants
const navMotion = {
  visible: {
    opacity: 1,
    transition: {
      when: "beforeChildren", // This is the key to stagger children
      staggerChildren: 0.05,
    },
  },
  hidden: {
    opacity: 0,
  },
}
const navItemMotion = {
  visible: { opacity: 1, x: 0 },
  hidden: { opacity: 0, x: 100 },
}

// Start of Component
export default function Nav() {
  // State for toggling the mobile menu
  const [toggle, setToggle] = useState(false)

  // Added media query util class to be able to use this hook in the component
  const isXL = useMediaQuery("(min-width: 1280px)")
  console.log("isXL = " + isXL)

  return (
    <nav className="relative flex justify-between items-center pt-12 pb-6 mx-8 md:mx-16 lg:mx-32 mb-24 font-medium ">
      <svg
        className="absolute bottom-0 left-1/2 -translate-x-1/2"
        width="250"
        height={4}
        viewBox="0 0 250 4"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M2 2L428 2"
          strokeWidth={2}
          stroke="#282828"
          strokeLinecap="round"
        />
      </svg>
      <div>
        <img src={avatar} alt="Avatar" />
      </div>
      {/* Title */}
      <h1 className="text-lg font-bold">
        <a href="/">Hua.</a>
      </h1>

      {/* Start of Desktop view */}

      {isXL && (
        // Show desktop menu
        <div className="flex gap-12">
          <a href="/">Home</a>
          <a href="/services">Services</a>
          <a href="/contact">Contact</a>
        </div>
      )}
      {/* End of Desktop view */}

      {/* Start of Mobile view */}
      {!isXL && (
        // Show hamburger menu button
        <div
          onClick={() => setToggle((prevToggle) => !prevToggle)}
          className="space-y-1.5 cursor-pointer xl:hidden z-50"
        >
          <motion.span
            animate={{ rotateZ: toggle ? 45 : 0, y: toggle ? 8 : 0 }}
            className="block h-0.5 w-8 bg-black"
          ></motion.span>
          <motion.span
            animate={{ width: toggle ? 0 : 24 }}
            className="block h-0.5 w-6 bg-black"
          ></motion.span>
          <motion.span
            animate={{
              rotateZ: toggle ? -45 : 0,
              y: toggle ? -8 : 0,
              width: toggle ? 32 : 16,
            }}
            className="block h-0.5 w-4 bg-black"
          ></motion.span>
        </div>
      )}
      {toggle && !isXL && (
        // Show mobile menu
        <div className="fixed flex bg-white bottom-0 left-0 w-full h-screen items-center justify-center z-40">
          <motion.div
            variants={navMotion}
            animate="visible"
            initial="hidden"
            className="flex flex-col gap-24 text-lg"
          >
            <motion.a variants={navItemMotion} href="/">
              Home
            </motion.a>
            <motion.a variants={navItemMotion} href="/services">
              Services
            </motion.a>
            <motion.a variants={navItemMotion} href="/contact">
              Contact
            </motion.a>
          </motion.div>
        </div>
      )}
      {/* End of Mobile view */}
    </nav>
  )
} // End of component
