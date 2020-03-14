import React from "react";
import { Comment } from "../../types/Repository";
import { Media, Card, CardHeader, CardBody } from "reactstrap";
import { format } from "date-fns";

interface Props {
  comment: Comment;
}

export const CommentCard: React.FC<Props> = ({ comment }) => {
  const { author, createdAt, body } = comment;

  return (
    <Media>
      <Media left>
        <Media
          style={{ width: "64px", height: "64px" }}
          object
          src={author.avatarUrl}
          alt="comment author"
        />
      </Media>
      <Media body>
        <Card>
          <CardHeader>
            {author.login} commented on{" "}
            {format(new Date(createdAt), "d MMMM yyyy")}
          </CardHeader>
          <CardBody>{body}</CardBody>
        </Card>
      </Media>
    </Media>
  );
};
