import React from "react";
import type { IConfirmModalProps, IFormModalProps } from "./Modal.props";
import { Form } from "../Form";
import { Button } from "../../atoms/Button";
import "./Modal.scss";

export const Modal: React.FC<IFormModalProps | IConfirmModalProps> = (
  props,
) => {
  const { modalType, onClose } = props;

  if (modalType === "form") {
    const { form, onSubmit } = props as IFormModalProps;

    return (
      <div className="modal-page" onClick={onClose}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <span className="close-button" onClick={onClose}>
            &times;
          </span>
          <Form {...form} onSubmit={onSubmit} />
        </div>
      </div>
    );
  }

  if (modalType === "confirm") {
    const { onConfirm } = props as IConfirmModalProps;

    return (
      <div className="modal-page">
        <div className="modal-content confirm-modal">
          <div className="modal-text">
            <p>Cette action est irréversible.</p>
            <p>Êtes-vous certain(e) de vouloir continuer ?</p>
          </div>
          <div className="modal-button-group">
            <Button
              onClick={onConfirm}
              content="Confirmer"
              className="danger-button"
            />
            <Button
              onClick={onClose}
              content="Annuler"
              className="primary-button"
            />
          </div>
        </div>
      </div>
    );
  }

  return null;
};
