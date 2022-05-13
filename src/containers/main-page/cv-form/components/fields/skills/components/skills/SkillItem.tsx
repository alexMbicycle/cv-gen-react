import { memo } from 'react';

import ProfiencyItem from 'common/components/profiency/ProfiencyItem';

import type { Tool } from 'common/models/User';

import { useSkillItem } from './utils/hooks';

interface SkillItemProps {
  id: string;
  name: string;
  tools: Tool[]
}

const SkillItem = function ({ id, name, tools }: SkillItemProps): JSX.Element {
  const {
    isLoading,
    onDeleteToolHandle: onDeleteToolHandlee,
    openHandle,
  } = useSkillItem({ id, name, skills: tools });

  return (
    <ProfiencyItem
      key={name}
      headText={name}
      bodyText={`Skills ammount: ${tools?.length}`}
      onDelete={onDeleteToolHandlee}
      onClick={openHandle}
      isLoading={isLoading}
    />
  );
};

export default memo(SkillItem);
