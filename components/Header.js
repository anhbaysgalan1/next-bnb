import Link from 'next/link';
import axios from 'axios';
import { useStoreActions, useStoreState } from 'easy-peasy';

const Header = () => {
  
  const setShowLoginModal = useStoreActions(
    actions => actions.modals.setShowLoginModal
  );

  const setShowRegistrationModal = useStoreActions(
    actions => actions.modals.setShowRegistrationModal
  );

  const user = useStoreState(state => state.user.user)
  const setUser = useStoreActions(actions => actions.user.setUser)

  
  return (
    <div className='nav-container'>
      <Link href='/'>
        <a>
          <img src='/img/logo.jpg' alt='' className="logo-image" />
        </a>
      </Link>

      <nav>
        <ul>
          {user ? (
            <>
              <li className="username">{user}</li>
              <li>
                <Link href="/bookings">
                  <a>Bookings</a>
                </Link>
              </li>
              <li>
                <Link href="/host">
                  <a>Your Houses</a>
                </Link>
              </li>
              <li>
                <Link href="/host/new">
                  <a>Add House</a>
                </Link>
              </li>
              <li>
                <a href='#' onClick={async () => {
                  await axios.post('/api/auth/logout');
                  setUser(null);
                }}>
                  Log out
                </a>
              </li>
            </>
          ): (
            <>
              <li>
                <a href='#' onClick={() => setShowRegistrationModal()}>Sign up</a>
              </li>
              <li>
                <a href='#' onClick={() => setShowLoginModal()}>Log in</a>
              </li>
            </>
          )}
        </ul>
      </nav>

      <style jsx>{`
        ul {
          margin: 0;
          padding: 0;
        }

        li {
          display: block;
          float: left;
        }

        a {
          text-decoration: none;
          display: block;
          margin-right: 15px;
          color: #333;
        }

        nav a {
          padding: 1em 0.5em;
        }

        .nav-container {
          border-bottom: 1px solid #eee;
          height: 50px;
        }

        img {
          float: left;
        }

        ul {
          float: right;
        }

        .logo-image {
            height: 50px;
        }

        .username {
          padding: 1em 0.5em;
        }
      `}</style>
    </div>
  );
}

export default Header;
