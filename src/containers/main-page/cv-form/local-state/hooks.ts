import { useContext } from 'react';

import { CategoryContext, SkillContextType } from './CategoryContext';
import { SkillNameContext, SkillNameContextType } from './SkillNameContext';

export function useSkillContext(): SkillContextType {
  const context = useContext(CategoryContext);

  if (context === undefined) {
    throw new Error('SkillContext must be used within a CvFormProvider');
  }

  return context;
}

export function useSkillNameContext(): SkillNameContextType {
  const context = useContext(SkillNameContext);

  if (context === undefined) {
    throw new Error('SkillNameContext must be used within a CvFormProvider');
  }

  return context;
}
