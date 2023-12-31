import React from 'react';
import { Divider, Spin, Typography } from 'antd';
import useSWR from 'swr';

import { fetcher } from '../utils';
import { Repo } from './repo';

export function RepoList(props) {
  const { limit = 100 } = props;
  const { data, error } = useSWR(`/users/relative-ci/repos?sort=created&direction=desc&type=public&per_page=${limit}`, fetcher);

  if (error) {
    return <Typography.Text>{error.message}</Typography.Text>;
  }

  if (!data) {
    return <Spin />;
  }

  const repos = data?.filter((repo) => repo.name.match(/^example-/));

  return (
    <div>
      {repos?.map((repo, index) => (
        <React.Fragment key={repo.id}>
          {index > 0 && <Divider />}
          <Repo repo={repo} />
        </React.Fragment>
      ))}
    </div>
  );
}
