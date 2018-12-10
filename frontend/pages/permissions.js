import Permissions from '../components/Permissions/Permissions';
import PleaseSignIn from '../components/PleaseSignIn/PleaseSignIn';

const PermissionsPage = (props) => (
  <PleaseSignIn {...props}>
    <Permissions />
  </PleaseSignIn>
)

export default PermissionsPage;
