import React from "react";
import { Breadcrumb, Card, Button } from "react-bootstrap";
import { ArrowLeft } from "react-feather";
import history from "history/browser";

const AppBreadcrumb = () => {
  // @ts-ignore
  /*const location = useMatches();*/
  const { location } = history;
  console.log("matches", history);
  return (
    <React.Fragment>
      {location.pathname === "" ? null : (
        <div className="cursor-pointer" onClick={() => history.back()}>
          <ArrowLeft />
          Back
        </div>
      )}
    </React.Fragment>
  );
};

export default AppBreadcrumb;
