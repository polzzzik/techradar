import { ShortTechnology } from './ShortTechnology.interface';

export interface Technology extends ShortTechnology {
  description: string;
  poll: {
    adopt: number;
    trial: number;
    assess: number;
    hold: number;
    backlog: number;
  };
}
