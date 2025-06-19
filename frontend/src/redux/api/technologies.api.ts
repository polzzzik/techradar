import { ShortTechnology } from '@/models/ShortTechnology.interface';
import { CreateTechnology } from '@/models/CreateTechnology.interface';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE } from './constants/api';
import { FilterOptions } from '@/types/FilterOption.interface';
import { SortOption } from '@/types/SortOption.interface';
import { Technology } from '@/models/Technology.interface';
import { PollRequest } from '@/models/PollRequest';
import { UpdateTechnology } from '@/models/UpdateTechnology.interface';

export const technologiestApi = createApi({
  reducerPath: 'technologies',
  baseQuery: fetchBaseQuery({ baseUrl: BASE }),
  endpoints: (builder) => ({
    getTechnologies: builder.query<
      ShortTechnology[],
      { filters: FilterOptions; sort: SortOption }
    >({
      query: ({ filters, sort }) => {
        const queryParams = new URLSearchParams();

        if (filters.title) queryParams.append('title', filters.title);
        if (filters.ring) queryParams.append('ring', filters.ring);
        if (filters.category) queryParams.append('category', filters.category);
        if (filters.quadrant) queryParams.append('quadrant', filters.quadrant);

        queryParams.append('sortParam', sort.param);
        queryParams.append('sortOrder', sort.order);

        return {
          url: `/technology?${queryParams.toString()}`,
          method: 'get',
        };
      },
    }),
    createTechnology: builder.mutation<void, CreateTechnology>({
      query: (newTechnology) => ({
        url: '/technology',
        method: 'POST',
        body: newTechnology,
      }),
    }),
    archiveTechnology: builder.mutation<void, number>({
      query: (technologyId: number) => ({
        url: `/technology/${technologyId}`,
        method: 'PATCH',
        body: { status: 'archived' },
      }),
    }),
    getTechnologyById: builder.query<Technology, number>({
      query: (technologyId: number) => ({
        url: `/technolog${technologyId}`,
        method: 'GET',
      }),
    }),
    pollTechnology: builder.mutation<void, PollRequest>({
      query: (poll: PollRequest) => ({
        url: '/poll',
        method: 'PATCH',
        body: { ring: poll.ring, name: poll.name },
      }),
    }),
    updateTechnology: builder.mutation<void, UpdateTechnology>({
      query: (update: UpdateTechnology) => ({
        url: `/update${update.id}`,
        method: 'PATCH',
        body: {
          title: update.title,
          ring: update.ring,
          decription: update.description,
        },
      }),
    }),
  }),
});

export const {
  useGetTechnologiesQuery,
  useCreateTechnologyMutation,
  useGetTechnologyByIdQuery,
  useArchiveTechnologyMutation,
  usePollTechnologyMutation,
  useUpdateTechnologyMutation,
} = technologiestApi;
