import {
  NotificationItem,
  NotificationItemContent,
  NotificationItemTitle,
} from '@admiral-ds/react-ui';
import { useState } from 'react';

const Notification = () => {
  const [visible] = useState(false);

  return (
    <>
      {visible && (
        <section className="fixed min-w-72 bottom-0 z-10 m-10">
          <NotificationItem status="error" displayStatusIcon={true} isClosable={true}>
            <NotificationItemTitle>{'Уведомление'}</NotificationItemTitle>
            <NotificationItemContent>
              {'Текст уведомления об ошибке'}
            </NotificationItemContent>
          </NotificationItem>
        </section>
      )}
    </>
  );
};

export default Notification;
