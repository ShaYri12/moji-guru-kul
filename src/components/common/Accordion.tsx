'use client'
import { AccordionDetails } from '@mui/material'
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import classNames from 'classnames'
import Image from 'next/image'
import { useState } from 'react'

interface BenefitAccordionProps {
  title: string
  description: string
}

export default function CustomAccordion({ title, description }: BenefitAccordionProps) {
  const [expanded, setExpanded] = useState<string | false>(false)

  const handleChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false)
  }

  return (
    <Accordion
      expanded={expanded === title}
      onChange={handleChange(title)}
      defaultExpanded={true}
      square={true}
      sx={{
        backgroundColor: 'white',
        color: '#3D3842',
        borderRadius: '15px',
        boxShadow: 'none',
        border: 'none',
        padding: 2,
      }}
    >
      <AccordionSummary
        sx={{
          padding: '0',
          minHeight: '36px',
          margin: '0',

          '& .MuiAccordionSummary-content': {
            display: 'block',
            margin: '0px !important',
          },
        }}
      >
        <div className="flex justify-between items-center">
          <p className="w-[80%] text-lg xl:text-xl text-lite-black">{title}</p>
          <div
            className={classNames('w-9 md:w-12 h-9 md:h-12 rounded-full border-2 border-indigo flex justify-center items-center', {
              'bg-indigo': expanded === title,
              'border-indigo': expanded !== title,
            })}
          >
            {expanded === title ? (
              <Image src="/assets/icons/arrow-up-white.svg" alt="plus" width={18} height={7} />
            ) : (
              <Image src="/assets/icons/arrow-down-indigo.svg" alt="plus" width={18} height={7} />
            )}
          </div>
        </div>
      </AccordionSummary>
      <AccordionDetails sx={{ padding: '0' }}>
        <p className="text-mist text-base md:text-xl">{description}</p>
      </AccordionDetails>
    </Accordion>
  )
}
