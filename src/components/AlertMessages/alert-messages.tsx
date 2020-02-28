import React from 'react';
import style from './alert-messages.module.scss';
interface Props {
  msgTitle: string;
  showModal: boolean;
  onClose(): void;
}
export default class AlertMessages extends React.Component<Props> {
  setModalClose = () => {
    this.props.onClose();
  };
  render() {
    let styles = this.props.showModal ? { display: 'block' } : { display: 'none' };
    return (
      <div
        className={`modal fade show ${style.alertModal}`}
        id="exampleModalLong"
        role="dialog"
        aria-labelledby="exampleModalLongTitle"
        aria-hidden="true"
        style={styles}
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header"></div>
            <div className={`modal-body ${style.modalbody}`}>{this.props.msgTitle}</div>
            <div className={`modal-footer ${style.modalfooter}`}>
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
                onClick={this.setModalClose}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
