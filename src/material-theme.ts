import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import amber from '@material-ui/core/colors/amber';

const defaultMaterialTheme = createMuiTheme({
  palette: {
    primary: amber,
    type: 'dark',
  },
});

export default defaultMaterialTheme;
