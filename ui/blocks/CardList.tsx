import * as React from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'

type CardListProps = {
  activeIndex?: number
}

const CardList: React.FC<CardListProps> = ({ activeIndex = -1 }) => {
  return (
    <div>
      {[...Array(100).keys()].map((i) => (
        <motion.div
          key={i}
          css={{
            width: '100%',
            height: 300,
            border: '1px solid black',
            backgroundColor: 'white',
          }}
          animate={{
            marginBottom: activeIndex === i ? 0 : -200,
          }}
          initial={{
            marginBottom: activeIndex === i ? 0 : -200,
          }}
        >
          <Link href="/checkins/[id]" as={`/checkins/${i}`} scroll={false}>
            <a>
              {i} {i === activeIndex && 'active!'}
            </a>
          </Link>
        </motion.div>
      ))}
    </div>
  )
}

export default CardList
