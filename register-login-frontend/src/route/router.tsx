import { Outlet, createBrowserRouter } from 'react-router-dom';
import RegistrationForm from '../components/Registration';
import LoginForm from '../components/LoginForm';
import Header from '../components/Header';
import ProductList from '../components/ProductList';
import Footer from '../components/Footer';
import AddProductForm from '../components/AddProductForm';

const Layout = () => {
  return (
    <>
      <Header />
      <div style={{ marginTop: '200px', marginBottom: '120px' }}>
        {/* {localStorage.getItem('currentUser') ? ( */}
        <Outlet />
        {/* ) : ( */}
        {/* <Navigate to={'/login'} /> */}
        {/* )} */}
      </div>
      <Footer />
    </>
  );
};

const UnAuthorisedLayout = () => (
  <>
    <Header />
    <Outlet />
    <Footer />
  </>
);

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <ProductList />,
      },
      { path: '/addProduct', element: <AddProductForm /> },
    ],
  },
  {
    element: <UnAuthorisedLayout />,
    children: [
      {
        path: '/register',
        element: <RegistrationForm />,
      },
      {
        path: '/login',
        element: <LoginForm />,
      },
    ],
  },
]);

export default router;
