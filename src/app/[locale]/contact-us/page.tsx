import ContactForm from '@/components/ContactUs/ContactForm'
import Faq from '@/components/ContactUs/Faq'
import CustomHeader from '@/components/common/CustomHeader'
import React from 'react'

function page() {
  return (
    <div>
      <CustomHeader
        title="Contact Us"
        breadcrumb={[
          { label: 'Home', href: '/' },
          { label: 'Contact Us', href: '/contact-us' },
        ]}
      />
      <ContactForm />
      <Faq />
    </div>
  )
}

export default page
