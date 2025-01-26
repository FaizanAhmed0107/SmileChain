import {useEffect} from 'react';
import PropTypes from "prop-types";

function DeviceDetector(props) {
    useEffect(() => {
        const handleResize = () => {
            props.setIsSmall(window.innerWidth <= 870); // Adjust breakpoint as needed
        };

        handleResize(); // Initial check
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [props]);
}

DeviceDetector.propTypes = {
    setIsSmall: PropTypes.func.isRequired,
}

export default DeviceDetector;