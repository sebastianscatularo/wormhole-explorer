import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { NavLink, useParams } from 'react-router-dom';

export function NavBar() {
  const { network } = useParams();
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Box>
            <Button color="inherit" component={NavLink} to={`/${network}`}>Search</Button>
            <Button color="inherit" component={NavLink} to={`/${network}/inspector`}>VAA Inspector</Button>
            <Button color="inherit" component={NavLink} to="https://wormhole-foundation.github.io/wormhole-dashboard/" target='_blank'>Status Dashboard</Button>
          </Box>
          <Box flexGrow={1} />
          <Box>
            <ToggleButtonGroup
              value={network}
              exclusive
              aria-label="Platform"
              sx={{ color: 'inherit' }}
            >
              <ToggleButton sx={{ color: 'inherit' }} disabled={network === 'mainnet'} component={NavLink} to="/mainnet" value="mainnet">Mainnet</ToggleButton>
              <ToggleButton sx={{ color: 'inherit' }} disabled={network === 'testnet'} component={NavLink} to="/testnet" value="testnet">Testnet</ToggleButton>
            </ToggleButtonGroup>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}