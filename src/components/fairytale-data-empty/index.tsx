import React from "react";
import { Card } from "react-bootstrap";
import { HardDrive } from "react-feather";

interface IDataEmptyComponentProps {}
const FairyTaleDataEmpty: React.FC<IDataEmptyComponentProps> = ({}) => {
  return (
    <Card>
      <Card.Body className="text-center">
        <span className="my-3">
          <HardDrive size={36} data-cy={`data-empty-icon`} />
        </span>
        <p>No Data</p>
      </Card.Body>
    </Card>
  );
};

export default FairyTaleDataEmpty;
