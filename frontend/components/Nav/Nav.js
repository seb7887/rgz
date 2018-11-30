import Link from 'next/link';
import NavStyles from './NavStyles';
import { getCookie } from '../../lib/session';

const Nav = () => (
  
  <NavStyles>
    <Link href="/shop">
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
        <Link href="/me">
          <a>Account</a>
        </Link>
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