import { memo } from 'react';

import { IconButton, Typography } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

import { LANGUAGE } from './utils/constants';

import { TitleWrapperStyled } from './utils/styled';

const LanguageTitle = function (): JSX.Element {
  return (
    <TitleWrapperStyled>
      <IconButton size="small" sx={{ marginRight: 1 }}>
        <ChevronLeftIcon color="primary" />
      </IconButton>
      <Typography variant="body1">
        {LANGUAGE}
      </Typography>
    </TitleWrapperStyled>
  );
};

export default memo(LanguageTitle);
