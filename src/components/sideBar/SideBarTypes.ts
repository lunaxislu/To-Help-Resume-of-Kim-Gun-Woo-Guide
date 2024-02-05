import { SetStateAction } from 'react';

export type SideBarProps = {
  notification: any[];
  newNotiExists: boolean;
  setNewNotiExists: React.Dispatch<SetStateAction<boolean>>;
  setNotification: React.Dispatch<SetStateAction<any[]>>;
};
