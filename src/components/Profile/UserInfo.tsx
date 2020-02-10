import React, { useEffect } from 'react';
import { IonSpinner } from '@ionic/react';
import { connect } from 'react-redux';

import { fetchUserData } from '../../actions';

const UserInfo = ({ userId, userInfo, fetchUserData, isLoading }: any) => {
  useEffect(() => {
    fetchUserData(userId);
  }, [fetchUserData, userId]);

  if (!userInfo) {
    return <IonSpinner />;
  }

  const { social } = userInfo;

  const webLink = social.find((link: any) => link.label === 'web');
  const linksWithoutWeb = social.filter((link: any) => link.label !== 'web');
  const sortedLinks = [webLink, ...linksWithoutWeb];

  const capitalize = (word: any) => {
    return word[0].toUpperCase() + word.slice(1).toLowerCase();
  };

  return (
    <div className="user-info">
      <p>
        <strong>Город: </strong>
        <span>{userInfo.city}</span>
      </p>

      <p>
        <strong>Знание языков: </strong>
      </p>
      <ul className="user-info-list">
        {userInfo.languages.map((lang: any) => {
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
        {sortedLinks.map(({ label, link }: any) => {
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
    error: state.fetchUserInfo.error,
    userInfo: state.fetchUserInfo.userInfo,
    isLoading: state.fetchUserInfo.isLoading,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    fetchUserData: (id: any) => dispatch(fetchUserData(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserInfo);
