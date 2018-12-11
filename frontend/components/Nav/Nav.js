import Link from 'next/link';
import NavStyles from './NavStyles';
import Signout from '../Signout/Signout';
import { getCookie } from '../../lib/session';

const Nav = (props) => (
  
  <NavStyles>
    <Link href="/">
      <a>Shop</a>
    </Link>
    {getCookie('token') && (
      <>
        <Link href="/sell">
          <a>Sell</a>
        </Link>
        <Link href="/orders">
          <a>Orders</a>
        </Link>
        <Signout {...props} />
      </>
    )}
    {!getCookie('token') && (
      <>
        <Link href="/signup">
          <a>Sign up</a>
        </Link>
        <Link href="/signin">
          <a>Sign in</a>
        </Link>
      </>
    )}
  </NavStyles>
)

export default Nav;