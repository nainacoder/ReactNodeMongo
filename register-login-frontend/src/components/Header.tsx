import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import HomeIcon from '@mui/icons-material/Home';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useSelector } from 'react-redux';

export default function Header() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { cartItems } = useSelector((state: any) => state.cart);

  const handleLogout = () => {
    navigate('/login');
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed">
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <IconButton color="inherit">
            <HomeIcon />
          </IconButton>

          {pathname !== '/' ? (
            <Box>
              <Button color="inherit" component={Link} to="/register">
                Register
              </Button>
              <Button color="inherit" component={Link} to={'/login'}>
                Login
              </Button>
            </Box>
          ) : (
            <Box>
              <Button color="inherit" component={Link} to="/addProduct">
                Add Product
              </Button>
              <Button color="inherit" onClick={handleLogout}>
                Logout
              </Button>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="open drawer"
                sx={{ mr: 2 }}
              >
                <Badge badgeContent={cartItems.length} color="success" showZero>
                  <ShoppingCartIcon />
                </Badge>
              </IconButton>
            </Box>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
