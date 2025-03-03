import { FC, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectUserId } from '../../../../../redux/user/selectors';
import { getSubscriptions } from '../api/getSubscriptions';
import { fetchUsersInfo } from '../api/getSubscriptionsInfo';

export const Subscriptions: FC = () => {
  const userId = useSelector(selectUserId);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const fetchSubscriptions = async () => {
    try {
      if (userId) {
        const res = await getSubscriptions(userId);
        const users = await fetchUsersInfo(res.data.subscriptionsIds);
        console.log(users);
      }
    } catch (err) {
      if (err instanceof Error) {
        setErrorMessage(err.message);
      }
    }
  };

  fetchSubscriptions();

  return (
    <div className='w-full min-h-screen p-10 animate-fade-in-scale'>
      <div className='w-full h-fit bg-white'></div>
    </div>
  );
};
