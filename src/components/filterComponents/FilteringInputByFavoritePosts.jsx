import React from "react";
import { Form } from "react-bootstrap";

export function FilteringInputByFavoritePosts({
  setShowFavorites,
  showFavorites,
}) {
  return (
    <Form.Group
      className="d-flex flex-row align-items-center gap-2"
      controlId="exampleForm.ControlInput1"
    >
      <Form.Label className="m-0">Favorites</Form.Label>
      <Form.Check
        className="w-auto m-0"
        type="checkbox"
        checked={showFavorites}
        onChange={(e) => setShowFavorites(e.target.checked)}
      />
    </Form.Group>
  );
}
