import * as React from 'react';
import { Route, Redirect } from "react-router-dom";

import { connect } from "react-redux";

import _ from "lodash";
import { getInformationUser } from "../../actions/auth";
import { Dispatch } from 'redux';

import jwtDecode from "jwt-decode";



interface IGuardProps {
  path: string,
  children: any,
  exact?: boolean
}

const Guard: React.FunctionComponent<IGuardProps> = (props) => {
  const { children, path, ...rest } = props;
  const token: any = localStorage.getItem("tokenBusTicket");
  let dataUser: any = {}
  if (token) dataUser = jwtDecode(token);


  return (
    <React.Fragment>
      {
        path !== "/admin" ?
          (<Route {...rest} render={({ location }) => token ? (children) : (
            <Redirect
              to={{
                pathname: "/signin",
                state: { from: location }
              }}
            />
          )} />) : (
            _.get(dataUser, "userType", "") === "admin" ? (children) : (
              <Redirect
                to={{
                  pathname: "/notfound",
                }}
              />
            )
          )
      }
    </React.Fragment>
  );
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    getInformationUser: (data: any) => {
      dispatch(getInformationUser(data));
    }
  }
}

export default connect(null, mapDispatchToProps)(Guard);
