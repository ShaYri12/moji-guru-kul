import React from 'react'
import { RiSaveFill } from 'react-icons/ri'

const GameFlow = () => {
  const gameCards = [
    {
      name: 'Game Name',
      points: 300,
      subject: 'Subject',
      imageSrc: '/assets/images/games/cross-word.png',
    },
    {
      name: 'Game Name',
      points: 300,
      subject: 'Subject',
      imageSrc: '/assets/images/games/cross-word.png',
    },
    {
      name: 'Game Name',
      points: 300,
      subject: 'Subject',
      imageSrc: '/assets/images/games/cross-word.png',
    },
    {
      name: 'Game Name',
      points: 300,
      subject: 'Subject',
      imageSrc: '/assets/images/games/cross-word.png',
    },
  ]
  return (
    <section>
      <div className="flex flex-wrap justify-between items-center px-4 sm:px-6 py-[15px] rounded-t-[15px] border-b border-b-[#B1AFB3]">
        <h1 className="text-[20px] sm:text-[28px] font-[500] tracking-[2%] leading-[33.6px] text-purple flex-grow mb-4 sm:mb-0">
          Game Flow
        </h1>
        <div className="flex items-center gap-[14px]">
          <p className="text-purple md:text-[20px] text-[16px] tracking-[2%] font-[500]">Save Flow</p>
          <div className="w-[40px] h-[40px] border-[2px] border-purple rounded-[8px] text-purple flex justify-center items-center hover:opacity-80 cursor-pointer">
            <RiSaveFill />
          </div>
        </div>
      </div>

      <div className="w-full bg-white p-[24px] flex flex-col lg:flex-row">
        <div className="relative flex-grow flex flex-col lg:flex-row items-center justify-between relative mb-8 lg:mb-0">
          <div className="absolute lg:left-0 left-1/2 lg:top-1/2  lg:w-full w-[2px] lg:h-[2px] h-full bg-[#D6D5D7] z-[1]"></div>
          {gameCards.map((game, index) => (
            <div key={index} className="relative">
              <div
                className="relative flex flex-col items-center p-[9px] mb-12 lg:mb-0 relative z-10 rounded-[7.46px] gap-[9px] z-[5] bg-white"
                style={{ boxShadow: '0px 0px 35.16px 0px #00000014' }}
              >
                <div className="relative xl:max-w-[150px] lg:max-w-[130px] max-w-[160px] h-[131.25px] rounded-[7.46px] overflow-hidden flex flex-col justify-center items-center z-[2]">
                  <img className="w-full h-full object-cover" src={game.imageSrc} />
                </div>
                <div className="w-full bg-[#F1ECF8] p-[4px] rounded-[4.69px] text-center">
                  <p className="text-purple text-[12px] tracking-[2%] font-semibold">Point {game.points}</p>
                </div>
                <div className="w-full flex items-center justify-between">
                  <div className="flex flex-col">
                    <h3 className="font-[700] text-[14px] text-lite-black">{game.name}</h3>
                    <p className="text-nobel text-[11.72px] font-[400]">{game.subject}</p>
                  </div>
                  <button className="flex items-center justify-center w-[28px] h-[28px] bg-[#F1ECF8] rounded-[4.17px]">
                    <span className="text-[24px] font-[400] text-purple mt-[-2px]">—</span>
                  </button>
                </div>
              </div>
              {index < 3 && (
                <>
                  <div className="absolute lg:top-1/2 left-1/2 lg:-translate-y-1/2 lg:-translate-x-0 -translate-x-1/2 game-small-icon border-[1.6px] border-purple rounded-full overflow-hidden flex items-center justify-center z-[3]">
                    <img className="w-full h-full object-cover" src={game.imageSrc} />
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
        <div className="w-full lg:max-w-[170px] lg:ml-[25px] flex-shrink-0">
          <div className="p-[20px] border border-purple rounded-[7.46px]">
            <div className="xl:px-[14px] flex flex-col items-center justify-center">
              <h2 className="text-[16px] font-[600] text-blackish mb-[12px] text-center">4 Game In Flow</h2>
              {Array(4)
                .fill(null)
                .map((_, index) => (
                  <button
                    key={index}
                    className="w-full mb-[22px] text-[16px] font-[500] w-max bg-white border border-purple text-purple px-[12px] py-[4px] rounded-[4px]"
                  >
                    1 Word Search
                  </button>
                ))}
            </div>
            <div className="text-center p-[4px] bg-[#F1ECF8] w-full rounded-[4.69px]">
              <p className="text-[14px] font-[600] text-purple tracking-[2%]">Total Point 1200</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default GameFlow
