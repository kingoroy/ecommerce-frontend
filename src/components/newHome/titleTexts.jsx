import React from 'react'
import { motion } from 'framer-motion';

const TitleTexts = ({position, text, key}) => {
  return (
    <motion.div 
    className={`titleTextsContainer ${position}`}
    initial={{opacity: 0, y: -50}}
    animate={{opacity: 1, y: 50}}
    transition={{ duration: 0.5, ease: "easeInOut", delay: 1 }}
    key={key}
    >
      <h3 className='limitedTimeText'>LIMITED TIME ONLY</h3>
      <h1 className='exclusiveText'>EXCLUSIVE</h1>
      <h1 className='collection'>{text}</h1>
      <div className='shopNowWrapper'>SHOP NOW</div>
    </motion.div>
  )
}

export default TitleTexts;
