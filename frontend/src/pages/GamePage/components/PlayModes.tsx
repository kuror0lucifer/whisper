import { FC } from 'react';
import { TVIcon } from '../../../components/icons/TVIcon';
import { TabletopIcon } from '../../../components/icons/TabletopIcon';
import { HandheldIcon } from '../../../components/icons/HandheldIcon';

interface PlayModesProps {
  playModes: string[];
}

const modeConfig = {
  TV: {
    icon: TVIcon,
    label: 'TV',
  },
  Tabletop: {
    icon: TabletopIcon,
    label: 'Tabletop',
  },
  Handheld: {
    icon: HandheldIcon,
    label: 'Handheld',
  },
};

export const PlayModes: FC<PlayModesProps> = ({ playModes }) => {
  return playModes ? (
    <div className='w-full h-55 p-5 flex flex-col justify-between items-center bg-white gap-5 rounded-xl shadow-2xl shadow-gray-400'>
      <span className='text-xl'>Supported play modes</span>
      <div className='w-full flex justify-center items-center gap-5'>
        {playModes.map(mode => {
          const normalizedMode = mode.split(' ')[0];
          const config = modeConfig[normalizedMode as keyof typeof modeConfig];
          if (!config) return null;

          const IconComponent = config.icon;

          return (
            <div
              key={mode}
              className='w-1/4 h-fit p-3 flex flex-col justify-between items-center gap-3'
            >
              <div className='w-fit h-fit px-10 py-5 bg-pink-300  rounded-xl'>
                <IconComponent
                  size={50}
                  color='white'
                />
              </div>
              <span>{config.label}</span>
            </div>
          );
        })}
      </div>
    </div>
  ) : null;
};
