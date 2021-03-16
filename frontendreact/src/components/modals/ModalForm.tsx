import React from "react";
import "./_styles.scss";

interface Props {
  title: string;
  visibility: boolean;
  onClose: () => void;
  children?: React.ReactNode;
}

const ModalForm = (props: Props) => {
    return (
    <React.Fragment>
      <div
        className={`modal fade ${props.visibility ? "show" : "hide"}`}
        id="modal-default"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">{props.title}</h4>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
                onClick={() => props.onClose()}
              >
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div className="modal-body">{props.children}</div>
            <div className="modal-footer justify-content-between">
              <button
                type="button"
                className="btn btn-default"
                data-dismiss="modal"
                onClick={() => props.onClose()}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
      <div
        className={`modal-backdrop fade ${props.visibility ? "show" : "hide"}`}
      ></div>
    </React.Fragment>
  );
}
export default ModalForm;
