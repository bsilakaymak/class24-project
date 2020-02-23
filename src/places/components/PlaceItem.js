import React, { useState, useContext } from "react";
import "./PlaceItem.css";
import Card from "../../shared/components/UIElements/Card";
import Button from "../../shared/components/FormElements/Button";
import Modal from "../../shared/components/UIElements/Modal";
import Map from "../../shared/components/UIElements/Map";
import { AuthContext } from "../../shared/contexts/auth-context";

const PlaceItem = props => {
  const auth = useContext(AuthContext);
  const [showMap, setShowMap] = useState(false);
  const openMap = () => setShowMap(true);
  const closeMap = () => setShowMap(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const showDeleteModalHandler = () => setShowConfirmModal(true);
  const cancelDeleteHandler = () => setShowConfirmModal(false);
  const confirmDeleteHandler = () => {
    setShowConfirmModal(false);
    console.log("deleting...");
  };
  return (
    <React.Fragment>
      <Modal
        show={showMap}
        onCancel={closeMap}
        header={props.address}
        contentClass="place-item__modal-content"
        footerClass="place-item__modal-actions"
        footer={<Button onClick={closeMap}>Close</Button>}
      >
        <div className="map-container">
          <Map center={props.coordinates} zoom={8} />
        </div>
      </Modal>
      <Modal
        header="Are You Sure?"
        footerClass="place-item__modal-actions"
        show={showConfirmModal}
        onCancel={cancelDeleteHandler}
        footer={
          <React.Fragment>
            <Button danger onClick={confirmDeleteHandler}>
              Proceed
            </Button>
            <Button inverse onClick={cancelDeleteHandler}>
              Cancel
            </Button>
          </React.Fragment>
        }
      >
        <p>Are you sure you want to delete this place? It can't be undone!!!</p>
      </Modal>
      <li className="place-item">
        <Card className="place-item__content">
          <div className="place-item__image">
            <img src={props.image} alt={props.title} />
          </div>
          <div className="place-item__info">
            <h2>{props.title}</h2>
            <h3>{props.address}</h3>
            <p>{props.description}</p>
          </div>
          <div className="place-item__actions">
            <Button inverse onClick={openMap}>
              View on Map
            </Button>
            {auth.isLoggedIn && (
              <React.Fragment>
                <Button to={`/places/${props.id}`}>Edit</Button>
                <Button danger onClick={showDeleteModalHandler}>
                  Delete
                </Button>
              </React.Fragment>
            )}
          </div>
        </Card>
      </li>
    </React.Fragment>
  );
};

export default PlaceItem;
