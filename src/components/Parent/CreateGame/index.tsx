'use client'
import React, { useState, ChangeEvent } from 'react'
import GameFlow from './GameFlow'
import { LuPlus } from 'react-icons/lu'
import { SlArrowDown } from 'react-icons/sl'

const CreateGame = () => {
  const tabs = [{ label: 'All' }, { label: 'Templet Flow', count: 2 }, { label: 'Saved Flow', count: 2 }, { label: 'Material', count: 2 }]
  const [activeTab, setActiveTab] = useState<string>('All')
  const [selectedCategory, setSelectedCategory] = useState<string>('All')
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false)

  // Pagination states
  const [currentPage, setCurrentPage] = useState<number>(1)
  const itemsPerPage = 8 // Change this value based on how many items you want per page

  const categories: string[] = ['All', 'Science', 'Math', 'History', 'Literature']

  // Handle category select
  const handleCategorySelect = (category: string): void => {
    setSelectedCategory(category)
    setCurrentPage(1) // Reset to first page on category change
    setDropdownOpen(false)
  }

  // Handle search change
  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setSearchTerm(event.target.value)
    setCurrentPage(1) // Reset to first page on search change
  }

  // Filtered games based on search and selected category
  const filteredGames = gamesData.filter((game) => {
    const isCategoryMatch = selectedCategory === 'All' || game.subject.toLowerCase() === selectedCategory.toLowerCase()
    const isSearchMatch = game.gameName.toLowerCase().includes(searchTerm.toLowerCase())
    return isCategoryMatch && isSearchMatch
  })

  // Pagination logic
  const totalPages = Math.ceil(filteredGames.length / itemsPerPage)
  const currentGames = filteredGames.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  return (
    <div className="flex flex-col justify-center horizontal-spacing top-spacing">
      <header className="bg-white w-full">
        <div className="flex items-center justify-between w-full">
          <h1 className="text-purple text-[38px] md:text-[50px] lg:text-[56px] font-[700] leading-[67.2px] tracking-[2%]">Create Game</h1>
          <button className="flex items-center bg-[#F1ECF8] justify-center md:min-w-[58px] md:min-h-[58px] min-h-[45px] min-w-[45px] md:w-[58px] w-[45px] md:h-[58px] h-[45px] rounded-lg border-[1.6px] border-purple text-purple hover:bg-purple-100">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="3.3"
              className="md:w-[28px] w-[24px] md:h-[28px] h-[24px]"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v.01M12 12v.01M12 18v.01" />
            </svg>
          </button>
        </div>
      </header>

      <div className="rounded-[15px] my-12 bg-white" style={{ boxShadow: '0px 0px 16px 0px #00000014' }}>
        <GameFlow />
        <div className="w-full bg-white">
          {/* Tabs */}
          <div className="w-full flex flex-col md:flex-row p-[24px]">
            <div className="flex items-center border-b border-[#D7D7D7]">
              {tabs.map((tab) => (
                <h3
                  key={tab.label}
                  onClick={() => setActiveTab(tab.label)}
                  className={`text-sm sm:text-lg font-medium cursor-pointer pb-2 border-b-4 ${
                    activeTab === tab.label ? 'text-[#2E2E2E] font-bold border-[#2E2E2E]' : 'text-[#737B8B] border-white'
                  }
                  ${tab.label === 'All' ? 'px-[40px]' : 'px-[26px]'}`}
                >
                  {tab.label} {tab.count && `(${tab.count})`}
                </h3>
              ))}
            </div>
          </div>

          <div className="px-[24px] pb-[24px] space-y-[24px]">
            {/* Categories and Search */}
            <div className="flex items-center gap-[16px] h-[56px]">
              {/* Dropdown */}
              <div className="relative h-full">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center justify-between w-[256px] h-full text-lite-black rounded-[8px] px-[14px] py-[10px] border border-[#F3F3F3] bg-[#F9F6FD]"
                >
                  <div className="flex gap-[16px] items-center">
                    <span className="min-w-[36px] min-h-[36px] flex items-center justify-center rounded-full bg-[#F1ECF8]">
                      <img className="w-[20px] h-[20px]" src="/assets/icons/filter-icon.png" />
                    </span>
                    <div className="flex flex-col items-start space-y-[-3px]">
                      <span className="text-[18px] font-[500] tracking-[0.7px]">Categories</span>
                      <span className="text-[16px] text-[#928F95]">{selectedCategory}</span>
                    </div>
                  </div>
                  <SlArrowDown size={14} className="text-purple" />
                </button>
                {dropdownOpen && (
                  <div className="absolute left-0 mt-2 w-[256px] bg-white rounded-lg shadow-lg border border-gray-200 z-[50]">
                    {categories.map((category) => (
                      <div
                        key={category}
                        onClick={() => handleCategorySelect(category)}
                        className="cursor-pointer px-4 py-2 hover:bg-gray-100 text-gray-700"
                      >
                        {category}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Search */}
              <div className="flex-grow h-full">
                <input
                  type="text"
                  placeholder="Search items"
                  value={searchTerm}
                  onChange={handleSearchChange}
                  className="w-full h-full p-[12px] text-[16px] bg-[#F9F6FD] placeholder:text-[#B1AFB3] focus:ring-2 focus:ring-purple-600 focus:outline-none rounded-[8px]"
                />
              </div>
            </div>

            {/* Games Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-[16px] gap-y-[24px]">
              {currentGames.map((game) => (
                <div
                  key={game.id}
                  className="flex flex-col items-center p-[16px] mb-12 lg:mb-0 relative z-10 rounded-[16px] gap-[16px]"
                  style={{ boxShadow: '0px 0px 35.16px 0px #00000014' }}
                >
                  <div className="relative h-[224px] rounded-[16px] overflow-hidden flex flex-col justify-center items-center">
                    <img className="w-full h-full object-cover" src={game.image} alt={game.gameName} />
                  </div>
                  <div className="w-full bg-[#FAF8FC] p-[9px] rounded-[4.69px] text-center">
                    <p className="text-purple md:text-[20px] text-[16px] tracking-[2%] font-[500]">Point {game.points}</p>
                  </div>
                  <div className="w-full flex items-center justify-between">
                    <div className="flex flex-col">
                      <h3 className="font-[600] md:text-[24px] text-[17px] text-lite-black">{game.gameName}</h3>
                      <p className="text-[12px] md:text-[16px] text-[#B1AFB3]">{game.subject}</p>
                    </div>
                    <button className="flex items-center justify-center rounded-[4px] bg-[#F1ECF8] hover:bg-[#E6D1E7] text-[16px] p-2">
                      <LuPlus />
                    </button>
                  </div>
                </div>
              ))}
            </div>
            {/* Pagination */}
            {currentGames.length ? (
              <div className="flex flex-col md:flex-row justify-between items-center mt-6">
                <p className="text-gray-600 mb-4 md:mb-0">Total {gamesData.length} Games</p>
                <div className="flex flex-wrap items-center justify-center md:justify-end">
                  <button
                    className="mr-2 md:mr-4 px-[16px] py-[7px] border-[1.5px] border-purple text-[16px] lg:text-[18px] font-[500] text-purple rounded-[15px] w-fit hover:opacity-80 flex items-center justify-center"
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                  >
                    <img src="/assets/icons/prev-arrow.png" alt="Previous" className="mr-2" />
                    Previous
                  </button>

                  <div className="rounded-[15px] overflow-hidden w-fit h-fit bg-[#F1ECF8]">
                    {[...Array(totalPages)].map((_, index) => (
                      <button
                        key={index}
                        className={`px-3 md:px-[20px] text-purple !w-[40px] md:!w-[50px] !h-8 md:!h-10 hover:opacity-80 ${index + 1 === currentPage ? '!bg-purple text-white rounded-[15px]' : '!bg-[#eeecfa] rounded-r-sm'}`}
                        onClick={() => setCurrentPage(index + 1)}
                      >
                        {index + 1}
                      </button>
                    ))}
                  </div>

                  <button
                    className="ml-2 md:ml-4 px-[16px] py-[7px] border-[1.5px] border-purple text-[16px] lg:text-[18px] font-[500] text-purple rounded-[15px] hover:opacity-80 flex items-center justify-center"
                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                  >
                    Next
                    <img src="/assets/icons/next-arrow.png" alt="Next" className="ml-2" />
                  </button>
                </div>
              </div>
            ) : (
              <h2 className="text-[18px]">No Game Found</h2>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreateGame

const gamesData = [
  {
    id: 1,
    image: '/assets/images/games/cross-word.png',
    points: 300,
    gameName: 'Word Search',
    subject: 'Science',
  },
  {
    id: 2,
    image: '/assets/images/games/cross-word.png',
    points: 450,
    gameName: 'Crossword',
    subject: 'Math',
  },
  {
    id: 3,
    image: '/assets/images/games/cross-word.png',
    points: 200,
    gameName: 'Sudoku',
    subject: 'Logic',
  },
  {
    id: 4,
    image: '/assets/images/games/cross-word.png',
    points: 350,
    gameName: 'Trivia',
    subject: 'History',
  },
  {
    id: 5,
    image: '/assets/images/games/cross-word.png',
    points: 300,
    gameName: 'Word Search',
    subject: 'Science',
  },
  {
    id: 6,
    image: '/assets/images/games/cross-word.png',
    points: 450,
    gameName: 'Crossword',
    subject: 'Math',
  },
  {
    id: 7,
    image: '/assets/images/games/cross-word.png',
    points: 200,
    gameName: 'Sudoku',
    subject: 'Logic',
  },
  {
    id: 8,
    image: '/assets/images/games/cross-word.png',
    points: 350,
    gameName: 'Trivia',
    subject: 'History',
  },
  {
    id: 9,
    image: '/assets/images/games/cross-word.png',
    points: 300,
    gameName: 'Word Search',
    subject: 'Science',
  },
  {
    id: 10,
    image: '/assets/images/games/cross-word.png',
    points: 450,
    gameName: 'Crossword',
    subject: 'Math',
  },
  {
    id: 11,
    image: '/assets/images/games/cross-word.png',
    points: 200,
    gameName: 'Sudoku',
    subject: 'Logic',
  },
  {
    id: 12,
    image: '/assets/images/games/cross-word.png',
    points: 350,
    gameName: 'Trivia',
    subject: 'History',
  },
  {
    id: 13,
    image: '/assets/images/games/cross-word.png',
    points: 300,
    gameName: 'Word Search',
    subject: 'Science',
  },
  {
    id: 14,
    image: '/assets/images/games/cross-word.png',
    points: 450,
    gameName: 'Crossword',
    subject: 'Math',
  },
  {
    id: 15,
    image: '/assets/images/games/cross-word.png',
    points: 200,
    gameName: 'Sudoku',
    subject: 'Logic',
  },
  {
    id: 16,
    image: '/assets/images/games/cross-word.png',
    points: 350,
    gameName: 'Trivia',
    subject: 'History',
  },
]
