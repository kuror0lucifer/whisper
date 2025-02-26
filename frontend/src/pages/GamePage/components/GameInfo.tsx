import { FC } from 'react';
import { EshopDetails } from '../../../types/eshopDetails.type';
import { format } from 'date-fns';
import { GamepadIcon } from '../../../components/icons/GamepadIcon';
import { PiggyBankIcon } from '../../../components/icons/PiggyBankIcon';
import { CalendarIcon } from '../../../components/icons/CalendarIcon';
import { ClockIcon } from '../../../components/icons/ClockIcon';
import { PlayerIcon } from '../../../components/icons/PlayerIcon';
import { InfoRow } from '../../../components/InfoRow';

interface GameInfoProps {
  eshopDetails: EshopDetails;
  genres: string[];
  releaseDate: Date;
  playerCount: string | null;
}

export const GameInfo: FC<GameInfoProps> = ({
  eshopDetails,
  genres,
  releaseDate,
  playerCount,
}) => {
  const normalizeReleaseDate = format(new Date(releaseDate), 'dd.MM.yyyy');
  const normalizeDiscountPriceEnd = eshopDetails?.discountPriceEnd
    ? format(new Date(eshopDetails.discountPriceEnd), 'dd.MM.yyyy HH:mm')
    : null;

  return (
    <div className='w-full h-fit py-5 px-15 flex flex-col justify-between items-center bg-gray-200 rounded-xl text-xl shadow-2xl shadow-gray-400'>
      {genres && genres.length > 0 && (
        <InfoRow
          icon={<GamepadIcon size={30} />}
          label='Genres'
          value={
            <div className='flex gap-2'>
              {genres.map((genre, index) => (
                <span key={genre}>
                  {genre.toLowerCase()}
                  {index !== genres.length - 1 && ','}
                </span>
              ))}
            </div>
          }
        />
      )}

      {eshopDetails && (
        <InfoRow
          icon={<PiggyBankIcon size={30} />}
          label='Gold points'
          value={eshopDetails.goldPoints}
        />
      )}

      {eshopDetails && (
        <InfoRow
          icon={<ClockIcon size={30} />}
          label='Discount ends'
          value={normalizeDiscountPriceEnd}
        />
      )}

      <InfoRow
        icon={<CalendarIcon size={30} />}
        label='Release date'
        value={normalizeReleaseDate}
      />

      {playerCount && (
        <InfoRow
          icon={<PlayerIcon size={30} />}
          label='Player count'
          value={playerCount}
        />
      )}
    </div>
  );
};
