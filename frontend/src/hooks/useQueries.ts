import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { Show, DJ, ShowId, DjId } from '../backend';

export function useGetAllShows() {
  const { actor, isFetching } = useActor();
  return useQuery<Show[]>({
    queryKey: ['shows'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllShows();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetAllDJs() {
  const { actor, isFetching } = useActor();
  return useQuery<DJ[]>({
    queryKey: ['djs'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllDjs();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useCreateShow() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: { title: string; description: string; scheduleDay: string; scheduleTime: string; djId?: DjId }) => {
      if (!actor) throw new Error('Actor not initialized');
      const showId = await actor.createShow(data.title, data.description, data.scheduleDay, data.scheduleTime);
      if (data.djId !== undefined) {
        await actor.assignDjToShow(showId, data.djId);
      }
      return showId;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['shows'] });
    },
  });
}

export function useAssignDjToShow() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ showId, djId }: { showId: ShowId; djId: DjId }) => {
      if (!actor) throw new Error('Actor not initialized');
      return actor.assignDjToShow(showId, djId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['shows'] });
    },
  });
}

export function useCreateDJ() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: { name: string; bio: string; photoUrl: string }) => {
      if (!actor) throw new Error('Actor not initialized');
      return actor.createDj(data.name, data.bio, data.photoUrl);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['djs'] });
    },
  });
}
