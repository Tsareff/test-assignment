import React, { useState, useEffect } from "react";
import { Issue } from "../../types/Repository";
import { InfoCard } from "../InfoCard/InfoCard";
import { Collapse, Card, CardBody, Form, FormGroup, Input } from "reactstrap";
import { CommentCard } from "../CommentCard/CommentCard";
import ReactMarkdown from "react-markdown";

interface Props {
  isOpen: boolean;
  onClick: VoidFunction;
  issue: Issue;
}

export const IssueCard: React.FC<Props> = ({ issue, isOpen, onClick }) => {
  const { comments, state, body, ...props } = issue;

  const [displayedComments, setDisplayedComments] = useState(comments.nodes);

  const [filterString, setFilterString] = useState("");

  const handleChangeFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilterString(e.target.value);
  };

  useEffect(() => {
    if (filterString) {
      const filteredComments = comments.nodes.filter(comment =>
        comment.body.toLowerCase().includes(filterString.toLowerCase())
      );

      setDisplayedComments(filteredComments);
    }
  }, [filterString, comments.nodes]);

  return (
    <div>
      <InfoCard {...props} onClick={onClick} />
      <Collapse isOpen={isOpen}>
        <Card>
          <CardBody>
            <ReactMarkdown>{body}</ReactMarkdown>
          </CardBody>
          <CardBody>
            <h3>Comments:</h3>
            <Form>
              <FormGroup>
                <Input
                  type="text"
                  placeholder="Filter comments"
                  id="filter"
                  value={filterString}
                  onChange={handleChangeFilter}
                />
              </FormGroup>
            </Form>
            {displayedComments.map(comment => (
              <CommentCard key={comment.id} comment={comment} />
            ))}
          </CardBody>
        </Card>
      </Collapse>
    </div>
  );
};
