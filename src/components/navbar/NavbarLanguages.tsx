import React from "react";
import { useTranslation } from "react-i18next";
import { Dropdown } from "react-bootstrap";

import usFlag from "../../assets/img/flags/us.png";
import fiFlag from "../../assets/img/flags/fi.png";
import seFlag from "../../assets/img/flags/se.png";

interface languageOptionsType {
  [key: string]: {
    icon: string;
    name: string;
  };
}

const languageOptions: languageOptionsType = {
  fi: {
    icon: fiFlag,
    name: "Finnish",
  },
  se: {
    icon: seFlag,
    name: "Swedish",
  },
  en: {
    icon: usFlag,
    name: "English",
  },
};

const NavbarLanguages = () => {
  const { i18n } = useTranslation();

  const selectedLanguage = languageOptions[i18n.language];

  return (
    <Dropdown className="me-2 nav-item" align="end">
      <Dropdown.Toggle as="a" className="nav-link nav-flag">
        <img src={selectedLanguage.icon} alt={selectedLanguage.name} />
      </Dropdown.Toggle>
      <Dropdown.Menu data-cy="app-list-languages-dropdown">
        {Object.keys(languageOptions).map((language) => (
          <Dropdown.Item key={language} onClick={() => i18n.changeLanguage(language)}>
            <img src={languageOptions[language].icon} alt="English" width="20" className="align-middle me-1" />
            <span className="align-middle">{languageOptions[language].name}</span>
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default NavbarLanguages;
