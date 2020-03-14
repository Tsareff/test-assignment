import React from "react";
import { Card, CardBody, CardTitle, CardText, Badge } from "reactstrap";
import { format } from "date-fns";
import { Author } from "../../types/Repository";
import Styles from "./InfoCard.module.css";

interface Props {
  title: string;
  number: number;
  createdAt: string;
  author: Author;
  state?: string;
  onClick?: VoidFunction;
}

interface CardTextProps {
  number: number;
  createdAt: string;
  author: Author;
}

const InfoCardText: React.FC<CardTextProps> = ({
  number,
  createdAt,
  author
}) => (
  <small>
    #{number} Opened on {format(new Date(createdAt), "d MMMM yyyy")} by{" "}
    <Badge color="light" href={author.url} target="_blank">
      {author.login}
    </Badge>
  </small>
);

export const InfoCard: React.FC<Props> = ({
  onClick,
  title,
  number,
  createdAt,
  state,
  author
}) => {
  return (
    <Card onClick={onClick} className={onClick && Styles.clickable}>
      <CardBody>
        <CardTitle tag="b">
          {title}
          {state && (
            <Badge className={Styles.state} color="info">
              {state}
            </Badge>
          )}
        </CardTitle>
        <CardText>
          <InfoCardText number={number} createdAt={createdAt} author={author} />
        </CardText>
      </CardBody>
    </Card>
  );
};
