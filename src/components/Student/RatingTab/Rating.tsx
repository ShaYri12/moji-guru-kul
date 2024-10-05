import React from 'react';

interface RatingData {
  stars: number;
  count: number;
}

interface RatingProps {
  ratings: RatingData[];
}

const Rating: React.FC<RatingProps> = ({ ratings }) => {
  // Calculate the total count of ratings
  const totalCount = ratings.reduce((total, rating) => total + rating.count, 0);

  return (
    <div className="flex items-center justify-end flex-col gap-5 w-full">
      {ratings.map((rating) => {
        const percentage = totalCount > 0 ? (rating.count / totalCount) * 100 : 0; // Avoid division by zero

        return (
          <div key={rating.stars} className="w-full max-w-[666px] flex items-center gap-3">
            <h2 className="text-[#49444E] min-w-[55px] font-medium text-[18px] leading-[18px] tracking-[2%] text-nowrap">{rating.stars} stars</h2>
            <div className='w-full xl:min-w-full max-w-full h-[10px] rounded-xl bg-[#F1ECF8]'>
              <div
                className='relative z-20 bg-[#753CBD] h-[10px] rounded-xl'
                style={{ width: `${percentage}%` }}
              />
            </div>
            <h2 className="text-[#49444E] min-w-[30px] font-medium text-[18px] leading-[18px] tracking-[2%] text-nowrap">{rating.count}</h2>
          </div>
        );
      })}
    </div>
  );
};

export default Rating;
