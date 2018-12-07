import Signin from '../Signin/Signin';
import { getCookie } from '../../lib/session';

const PleaseSignIn = (props) => {
  { !getCookie('token') && 
    <div>
      <p>Please Sign In before continuing</p>
      <Signin />
    </div>
  }
  { getCookie('token') && props.children }
}

export default PleaseSignIn;