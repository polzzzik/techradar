import { CategoryType } from '@/constants/categories';
import { QuadrantType } from '@/constants/quadrants';
import { RingType } from '@/constants/rings';

export interface ShortTechnology {
  id: number;
  title: string;
  category: CategoryType;
  ring: RingType;
  quadrant: QuadrantType;
}
