'use client'
import Image from 'next/image'
import React, { useState } from 'react'
import CustomButton from '../common/CustomButton'
import { contactUsAction } from '@/app/[locale]/actions/contactUsAction'
import { useAction } from 'next-safe-action/hooks'
import { useErrorStore } from '@/store/errorStore'

const ContactForm = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [message, setMessage] = useState('')
  const [type, setType] = useState('1')

  const { execute: contactUsHandler } = useAction(contactUsAction, {
    onSuccess: (data) => {
      if (data.data?.isSuccess) {
        useErrorStore.getState().setAlert({ message: data.data.message, type: 'success' })
        setName('')
        setEmail('')
        setPhone('')
        setMessage('')
      }
      if (!data.data?.isSuccess) {
        useErrorStore.getState().setAlert({ message: data.data?.message as string, type: 'error' })
        console.log(data.data)
      }
    },
  })

  const submitHandler = async (e: any) => {
    if (!name || !email || !phone || !message || !type) {
      useErrorStore.getState().setAlert({ message: 'All fields are required', type: 'error' })
      return
    }
    if (String(message)?.length < 3) {
      useErrorStore.getState().setAlert({ message: 'Message must be at least 3 characters long', type: 'error' })
      return
    }
    if (String(phone)?.length < 10) {
      useErrorStore.getState().setAlert({ message: 'Phone number must be at least 10 characters long', type: 'error' })
      return
    }

    contactUsHandler({ name, email, phone, message, type: type })
  }

  return (
    <div className="horizontal-spacing my-10 md:my-[80px] flex flex-col md:flex-row gap-14 items-center">
      {/* 1st col */}
      <div className="bg-zircon w-full md:w-[48%] h-auto md:h-[660px] rounded-[15px] p-5 pt-12 md:p-8 flex flex-col justify-center">
        <h1 className="text-3xl md:text-5xl font-medium mb-1 md:mb-6">Get in Touch</h1>
        <p className="text-cloudy-grey text-lg md:text-xl font-normal leading-[32px] mb-8 md:mb-14">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Arcu tortor, tortor iaculis vel. Libero, integer erat lectus quam. Aenean
          diam sem egestas tincidunt diam..
        </p>
        <div>
          <div className="flex items-center gap-6 mb-8">
            <div className="bg-ice-cold w-14 md:w-[72px] h-14 md:h-[72px] rounded border border-lime-green flex justify-center items-center">
              <Image src="/assets/icons/phone-icon.svg" alt="phone" width={24} height={24} />
            </div>
            <div className="w-4/5 flex flex-col">
              <b className="text-mist text-lg md:text-xl font-normal leading-[36px]">Phone Number</b>
              <b className="text-lite-black text-2xl md:text-[38px] font-normal leading-[36px]">(62) 1829017</b>
            </div>
          </div>
          <div className="flex items-center gap-6 mb-8">
            <div className="bg-topical-blue w-14 md:w-[72px] h-14 md:h-[72px] rounded border border-dark-sky-blue flex justify-center items-center">
              <Image src="/assets/icons/email-icon.svg" alt="phone" width={24} height={24} />
            </div>
            <div className="w-4/5 flex flex-col">
              <b className="text-mist text-lg md:text-xl font-normal leading-[36px]">Email</b>
              <b className="text-lite-black text-2xl md:text-[38px] font-normal leading-[36px]">hello@moji.com</b>
            </div>
          </div>
        </div>
      </div>
      {/* 2nd col */}
      <div className="w-full md:w-[52%]">
        <h2 className="text-lite-black text-[32px] font-bold leading-[48px] mb-8">Contact</h2>
        <form action={submitHandler}>
          <div className="mb-4">
            <label className="text-cloudy-grey text-lg mb-2">Name</label>
            <input
              className="bg-zircon text-lite-black w-full px-4 py-3 shadow-input-shadow rounded !outline-none"
              placeholder="Enter your name"
              name="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="text-cloudy-grey text-lg mb-2">Email</label>
            <input
              className="bg-zircon text-lite-black w-full px-4 py-3 shadow-input-shadow rounded !outline-none"
              placeholder="Enter your email"
              name="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-8">
            <label className="text-cloudy-grey text-lg mb-2">Phone</label>
            <input
              className="bg-zircon text-lite-black w-full px-4 py-3 shadow-input-shadow rounded !outline-none"
              placeholder="Enter your phone"
              name="phone"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <div className="mb-8">
            <label className="text-cloudy-grey text-lg mb-2">Type of support</label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="bg-zircon text-lite-black w-full px-4 py-3 shadow-input-shadow rounded !outline-none"
              name="type"
            >
              <option value="1">1</option>
              <option value="2">2</option>
            </select>
          </div>
          <div className="mb-8">
            <label className="text-cloudy-grey text-lg mb-2">Message</label>
            <textarea
              name="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="bg-zircon text-lite-black w-full px-4 py-3 shadow-input-shadow rounded min-h-[128px] !outline-none"
              placeholder="Write your messages in here"
            ></textarea>
          </div>
          <CustomButton type="submit" color="#753CBD" className="!w-[194px] !text-xl !font-normal flex items-center gap-2">
            <span className="text-vista-white text-xl font-normal">Send Message</span>
            <Image src="/assets/icons/arrow-pointing-to-right.svg" alt="send" width={16} height={12} className="pt-0.5" />
          </CustomButton>
        </form>
      </div>
    </div>
  )
}

export default ContactForm
