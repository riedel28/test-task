import React from 'react';
import { NavLink } from 'react-router-dom';
import { IonHeader, IonToolbar, IonTitle, IonRow, IonCol } from '@ionic/react';
import { connect } from 'react-redux';
import { handleLogout } from '../../actions/handleLogout';

const Header: React.FC = ({ isLoggedIn, handleLogout }: any) => {
  return (
    <IonHeader>
      <IonRow className="ion-align-items-center">
        <IonCol sizeXs="12" sizeSm="6">
          <IonToolbar>
            <IonTitle>
              <h3>Test Task</h3>
            </IonTitle>
          </IonToolbar>
        </IonCol>
        <IonCol sizeXs="12" sizeSm="6">
          <nav>
            <NavLink to="/">Home</NavLink>
            <NavLink to="/news">News</NavLink>
            <NavLink to="/profile">Profile</NavLink>

            {isLoggedIn ? (
              <NavLink to="/" onClick={handleLogout}>
                Log Out
              </NavLink>
            ) : null}
          </nav>
        </IonCol>
      </IonRow>
    </IonHeader>
  );
};

const mapStateToProps = (state: any) => {
  return {
    isLoggedIn: state.logout.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    handleLogout: () => dispatch(handleLogout()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
