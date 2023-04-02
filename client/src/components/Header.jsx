import styled from "@emotion/styled";
import { AppBar, Box, InputBase, Paper, Toolbar, Typography, alpha } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
export default function Header(props) {
    const Search = styled('div')(({ theme }) => ({
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: alpha(theme.palette.common.white, 0.15),
        '&:hover': {
          backgroundColor: alpha(theme.palette.common.white, 0.25),
        },
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
          marginLeft: theme.spacing(1),
          width: 'auto',
        },
      }));
  const SearchIconWrapper = styled("div")(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }));
  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        width: '12ch',
        '&:focus': {
          width: '20ch',
        },
      },
    },
  }));

  return (
    <Box sx={{flexGrow: 1}}>
    <AppBar position="static">
      <Toolbar>
        <Typography mr={2}>LOGO</Typography>
        <Typography variant="h4" component='div' sx={{flexGrow: 1,}}>Inventory Manager</Typography>
        <Search>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
              placeholder="Search…"
              disabled={props.page !== 'inventory'}
              inputProps={{ 'aria-label': 'search' }}
            />
        </Search>
      </Toolbar>
    </AppBar>
    </Box>
  );
}
