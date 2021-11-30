import { memo } from 'react';

import { AppBar, Toolbar } from '@mui/material';

import { LogoIconStyled } from './styled';

const ApplicationBar = function (): JSX.Element {
  return (
    <AppBar color="primary">
      <Toolbar>
        <LogoIconStyled fontSize="large" />
      </Toolbar>
    </AppBar>
  );
};

export default memo(ApplicationBar);
