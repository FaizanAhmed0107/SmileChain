import styles from './TopBar.module.css';
import PropTypes from "prop-types";

function TopBar(props) {

    const login = (
        <div>
            <button className={styles.login}>Log in</button>
            <button className={styles.signup}>Sign Up</button>
        </div>
    )

    const loggedIn = (
        <div>
            <button className={styles.signup}>Log out</button>
        </div>
    )

    return (
        <header className={styles.head}>
            <div>
                <h1 className={styles.heading}>Smile Rewards</h1>
                <p className={styles.below}>Unlock happiness and earn rewards for your genuine smiles!</p>
            </div>
            {props.isLoggedIn ? loggedIn : login}
        </header>
    )
}

TopBar.propTypes = {
    isLoggedIn: PropTypes.bool.isRequired,
}

export default TopBar;