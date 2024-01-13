import React, { Component } from 'react'
import './ConfirmPopup.css'

class ConfirmPopup extends Component {
  render() {
    const {
      title, closeWarningPopup, message, submitHandler, infoOnly,
    } = this.props;
    const messageLines = message.split('\n').map((line, index) => (
      <React.Fragment key={index}>
        {line}
        <br />
      </React.Fragment>
    ));

    return (
      <div className="popup">
        <div className="popupInner">
          <div className="popupHead">
            <h3>{title}</h3>
            <span onClick={closeWarningPopup}>&times;</span>
          </div>
          <p className="popupbodyMsg">{messageLines}</p>
          <div className="popupFooter">
            <button
              type="submit"
              className="okayButton"
              onClick={infoOnly? closeWarningPopup:submitHandler}
            >
              {infoOnly?`OKAY`:`CONFIRM`}
            </button>
          </div>
        </div>
      </div>
    )
  }
}

export default ConfirmPopup;
