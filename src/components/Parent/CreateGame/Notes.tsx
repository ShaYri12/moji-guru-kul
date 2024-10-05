import { ChangeEvent } from 'react'
import { FiCalendar } from 'react-icons/fi'
import { useState } from 'react'
import { FaChevronDown } from 'react-icons/fa'
import { GoChevronDown } from 'react-icons/go'
import { MdKeyboardArrowDown } from 'react-icons/md'

export default function Notes() {
  const [note, setNote] = useState('')
  const [dateInput, setDateInput] = useState<string>('')

  const handleDateChange = (e: ChangeEvent<HTMLInputElement>) => {
    setDateInput(e.target.value) // Update the state with the selected date
  }

  return (
    <div className="">
      <h1 className="md:text-[28px] text-[20px] font-semibold text-purple md:px-[20px] tracking-[1px] md:leading-[33.6px] py-[12px] border-b border-b-[#B1AFB3]">
        Notes
      </h1>
      <div className="my-[24px]">
        <textarea
          className="w-full h-[140px] p-3 border border-[#B1AFB3] rounded-[4px] focus:outline-none focus:ring-1 focus:ring-purple"
          placeholder="Write your notes here..."
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />
      </div>
      <div className="bg-[#F1ECF8] p-[16px] rounded-[8px] flex md:justify-start justify-center flex-wrap gap-[16px] w-fit">
        <div className="flex gap-[16px] flex-wrap md:justify-start justify-center">
          <div className="relative min-w-[160px] h-[40px] flex items-center">
            {/* Custom Icon on the left side */}
            <MdKeyboardArrowDown className="w-[16px] h-[16px] text-[#B1AFB3] absolute left-[41px] pointer-events-none" />

            <select className="custom-select text-[#B1AFB3] w-full h-full pl-[66px] pr-2 bg-white border border-[#B1AFB3] bg-white text-[14px] rounded-[8px] appearance-none focus:outline-none focus:ring-1 focus:ring-purple">
              <option value="">Class 1</option>
              <option value="">Class 2</option>
            </select>
          </div>
          <div className="relative min-w-[160px] h-[40px] flex items-center">
            {/* Custom Icon on the left side */}
            <MdKeyboardArrowDown className="w-[16px] h-[16px] text-[#B1AFB3] absolute left-[41px] pointer-events-none" />

            <select className="custom-select text-[#B1AFB3] w-full h-full pl-[66px] pr-2 bg-white border border-[#B1AFB3] bg-white text-[14px] rounded-[8px] appearance-none focus:outline-none focus:ring-1 focus:ring-purple">
              <option value="">Student</option>
              <option value="">Teacher</option>
            </select>
          </div>
          <div className="relative min-w-[160px] h-[40px] flex items-center">
            {/* Custom Icon on the left side */}
            <MdKeyboardArrowDown className="w-[16px] h-[16px] text-[#B1AFB3] absolute left-[41px] pointer-events-none" />

            <select className="custom-select text-[#B1AFB3] w-full h-full pl-[66px] pr-2 bg-white border border-[#B1AFB3] bg-white text-[14px] rounded-[8px] appearance-none focus:outline-none focus:ring-1 focus:ring-purple">
              <option value="">Group 1</option>
              <option value="">Group 2</option>
            </select>
          </div>

          <div className="min-w-[160px] h-[40px]">
            <div className="relative flex items-center">
              {/* Calendar Icon on the left side */}
              <FiCalendar
                className={`w-[16px] h-[16px] text-[#B1AFB3] absolute left-6 mt-[-1px] top-1/2 transform -translate-y-1/2 pointer-events-none`}
              />
              <input
                type={dateInput ? 'date' : 'text'} // Switch to date type if date is selected
                placeholder="Date" // Custom placeholder
                className={`w-full py-[10px] pl-5 rounded-[8px] text-[14px] font-[400] leading-[19.6px] custom-date-input text-[#B1AFB3] bg-white border border-[#B1AFB3]`}
                name="lastSeen"
                value={dateInput}
                onChange={handleDateChange}
                onFocus={(e) => {
                  e.target.type = 'date'
                  e.target.showPicker()
                }}
                onBlur={(e) => !e.target.value && (e.target.type = 'text')} // Return to text if no date is selected
              />
            </div>
          </div>
        </div>
        <button
          className="w-[131px] h-[40px] rounded-[8px] py-[4px] px-[20px] !text-[12.5px] !font-normal !text-[#fff] !bg-purple"
          onClick={() => {}}
          style={{
            boxShadow: `
                  4px 4px 6px 0px #FFFFFF33 inset, 
                  -4px -4px 6px 0px #FFFFFF29 inset, 
                  4px 4px 6px 0px #00000029
                `,
          }}
        >
          SEND
        </button>
      </div>
    </div>
  )
}
