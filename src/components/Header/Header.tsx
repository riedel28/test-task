import React from 'react';
import { NavLink } from 'react-router-dom';
import { IonHeader, IonToolbar, IonTitle } from '@ionic/react';
import { connect } from 'react-redux';
import { signOut } from '../../actions';

const Header: React.FC = ({ isLoggedIn, signOut }: any) => {
  return (
    <IonHeader>
      <IonToolbar>
        <IonTitle>
          <h1>Test Task</h1>
        </IonTitle>
      </IonToolbar>

      <div className="ion-padding-bottom">
        <div className="ion-padding-horizontal">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/news">News</NavLink>
          <NavLink to="/profile">Profile</NavLink>
          {isLoggedIn ? (
            <div className="ion-float-right">
              <NavLink to="/" onClick={signOut}>
                Log Out
              </NavLink>
            </div>
          ) : null}
        </div>
      </div>
    </IonHeader>
  );
};

const mapStateToProps = (state: any) => {
  return {
    isLoggedIn: state.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    signOut: () => dispatch(signOut()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
