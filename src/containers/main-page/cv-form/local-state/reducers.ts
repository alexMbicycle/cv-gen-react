import { v4 as uuidv4 } from 'uuid';

import { Tool } from 'common/models/User';

import { CategoryAction, CategoryState } from './CategoryContext';
import { ReturnPartialSkillModelType, SkillReducerReturnType } from './types';
import { SkillNameAction, SkillNameState } from './SkillNameContext';

const DELETE_COUNT = 1 as const;

export function categoryReducer(state: CategoryState, action: CategoryAction): CategoryState {
  const copy = { ...state };
  const tools = [...copy?.tools || []] as Tool[];

  function addTool(): CategoryState {
    tools.push({
      id: uuidv4(), name: '', level: '', experience: 0,
    });

    return { ...state, tools };
  }

  function updateTool(): CategoryState {
    if (copy.tools?.length) {
      // TODO: Refactor this and add id to update entity correctly
      const selectedToolIndex = copy.tools.findIndex((tool) => tool.id === action.tool?.id);

      if (selectedToolIndex !== -1 && action.tool) {
        copy.tools[selectedToolIndex] = { ...action.tool };
      }
    }

    return { ...state, tools: copy.tools };
  }

  function removeTool(): CategoryState {
    if (copy.tools?.length) {
      const selectedToolIndex = copy.tools.findIndex((tool) => tool.name === action.tool?.name);
      if (selectedToolIndex !== -1) {
        copy.tools.splice(selectedToolIndex, DELETE_COUNT);
      }
    }

    return copy;
  }

  const skill = {
    'add-category': { name: action.skill?.name, tools: copy?.tools },
    'add-tool': addTool,
    'add-skill': addTool,
    'update-tools': { ...state, ...action.tools },
    'update-tool': updateTool,
    'remove-tool': removeTool,
    'reset-skill': { name: '', tools: [] },
    'set-edit-skill': { name: action.skill?.name, tools: action.skill?.tools },
  } as SkillReducerReturnType;

  if (typeof skill[action.type] === 'function') {
    return (skill[action.type] as ReturnPartialSkillModelType)();
  }
  return skill[action.type] as CategoryState;
}

export function skillNameReducer(state: SkillNameState, action: SkillNameAction): SkillNameState {
  const copy = { ...state };

  if (action.type === 'set') {
    copy.name = action.name;
  } else {
    copy.name = null;
  }

  return copy;
}
