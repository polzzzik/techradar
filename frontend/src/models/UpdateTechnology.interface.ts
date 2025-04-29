import { RingType } from '@/constants/rings';

export interface UpdateTechnology {
  id: number;
  title: string;
  ring: RingType;
  description: string;
}
