import React, { useEffect } from 'react';
import { IonSpinner, IonLabel } from '@ionic/react';
import { connect } from 'react-redux';

import { fetchUserData } from '../../actions/fetchUserData';
import dictionary from '../../dictionary';
import capitalize from './../../helpers/capitalize';

const ProfileInfo = ({
  userId,
  profileInfo,
  fetchUserData,
  isLoading,
  error,
}: any) => {
  useEffect(() => {
    fetchUserData(userId);
  }, [fetchUserData, userId]);

  if (error) {
    return <IonLabel color="danger">{dictionary[error]}</IonLabel>;
  }

  return !profileInfo ? (
    <div className="ion-justify-content-center ion-align-items-center ion-padding">
      <IonSpinner />
    </div>
  ) : (
    <div className="user-info">
      <p>
        <strong>Город: </strong>
        <span>{profileInfo.city}</span>
      </p>

      <p>
        <strong>Знание языков: </strong>
      </p>
      <ul className="user-info-list">
        {profileInfo.languages.map((lang: any) => {
          return (
            <li key={lang} className="user-info-item">
              —&nbsp;<span>{lang}</span>
            </li>
          );
        })}
      </ul>

      <p>
        <strong>Ссылки:</strong>
      </p>
      <ul className="user-info-list">
        {profileInfo.social.map(({ label, link }: any) => {
          return (
            <li key={link}>
              <img
                src={`${process.env.PUBLIC_URL}/${label}.svg`}
                alt={label}
                className="user-info-icon"
              />
              <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="user-info-link"
              >
                {capitalize(label)}
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

const mapStateToProps = (state: any) => {
  return {
    userId: state.login.user,
    error: state.fetchProfileInfo.error,
    profileInfo: state.fetchProfileInfo.profileInfo,
    isLoading: state.fetchProfileInfo.isLoading,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    fetchUserData: (id: any) => dispatch(fetchUserData(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileInfo);
