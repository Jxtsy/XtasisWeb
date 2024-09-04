import { Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import './scss/Loader.scss';

export default function Loader() {
    return (
        <>
            <Row>
                <Col className="loader-container">
                    <FontAwesomeIcon icon={faSpinner} spin />&nbsp;
                    Loading...
                </Col>
            </Row>
        </>
    );
}