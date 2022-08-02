import {
  useMutation,
  UseMutationResult,
  useQuery,
  useQueryClient,
  UseQueryResult,
} from 'react-query';

import SnackBarUtils from 'common/components/SnackBar/SnackBarUtils';

import {
  DbUser, Project,
} from 'common/models/User';
import * as api from './api';
import { QueryKey } from './query-key';
import { useUserFromDb } from '../../personal-information/lib/query-hooks';

export function useUpdateProjects(): UseMutationResult<DbUser, Error, Project, VoidFunction> {
  const queryClient = useQueryClient();
  const { data: user } = useUserFromDb();
  const projects = user?.projects || [];

  return useMutation<DbUser, Error, Project, VoidFunction>(
    (project: Project) => {
      projects.push(project as Project);
      return api.updateUserProjects(projects as Project[], user as DbUser);
    },
    {
      onSettled: () => {
        queryClient.invalidateQueries(QueryKey.DbUser);
      },
      onError: (error: Error, _: Project, rollback) => {
        SnackBarUtils.error(error.message);

        if (rollback) rollback();
      },
    },
  );
}
