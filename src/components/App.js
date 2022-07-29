import React, {Component} from "react";
import Scanner from './Scanner';
import Result from './Result';
import { Button, Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            results : [],
            scanCode: '',
            modal: false,
            scanSuccess: false
        };
        this._onDetected = this._onDetected.bind(this);
        this._toggle = this._toggle.bind(this);
    }

    render() {
        return (
            <div>
                <Button variant="info" block onClick={this._toggle}>
                    Scan Barcode
                </Button>

                {this.state.scanSuccess ? (
                    <Result key="scanResult" text={this.state.scanCode} />
                ) : null}

                {/*<div>*/}
                {/*    <input id="scanner_result" type="text" value={this.state.scanCode} />*/}
                {/*    <input id="scanner_result" type="text" value={this.state.result} />*/}
                {/*    <input id="scanner_result" type="text" value={this.state.scanSuccess} />*/}
                {/*</div>*/}

                <Modal show={this.state.modal} onHide={this._toggle}>
                    <Modal.Header closeButton="true" />
                    <Modal.Body>
                        <Scanner handleScan={this._onDetected} />
                    </Modal.Body>
                </Modal>
            </div>
        );
    }

    _toggle() {
        this.setState(prevState => ({
            modal: !prevState.modal,
            scanSuccess: false
        }));
    }

    _onDetected(result) {
        this.setState({
            modal: false,
            scanCode: result ? result.codeResult.code : '',
            scanSuccess: result ? true : false,
            results: result
        });
    }
}

export default App;