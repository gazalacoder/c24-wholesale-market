import { motion } from "framer-motion";
import "./C24Characters.css";

export default function C24Characters({
  type = "male",
  position = "right",
  message = "",
}) {
  const characters = {
    male: {
      image: "/characters/main-male.png",
      alt: "C24 Business Host",
    },

    female: {
      image: "/characters/female-guide.png",
      alt: "C24 Professional Guide",
    },

    support: {
      image: "/characters/support-character.png",
      alt: "C24 Wholesale Assistant",
    },
  };

  const character = characters[type];

  return (
    <motion.div
      className={`c24-character ${position} ${type}`}
      initial={{
        opacity: 0,
        y: 30,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
      }}
      transition={{
        duration: 0.7,
      }}
      animate={{
        y: [0, -8, 0],
      }}
    >
      {message && (
        <div className="character-message">
          {message}
        </div>
      )}

      <motion.img
        src={character.image}
        alt={character.alt}
        animate={{
          rotate: [0, 1, -1, 0],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </motion.div>
  );
}