const labels = {
  //apps
  emailField: "Sähköposti",
  passwordField: "Salasana",
  rememberMe: "Muista minut ensi kerralla",
  app_store_id: "App Storen tunnus",
  app_title: "Sovelluksen nimi",
  //feeds
  feedContent: "Syötteen sisältö",
  feedName: "Syötteen nimi *",
  feedContentTitle: "Syötteen sisällön otsikko",
  feedUrl: "Syötteen URL-osoiteL *",
  feedIntegrations: "Syöteintegraatiot *",
  feedIconUrl: "Valitse syötteelle kuvake",
  //integrations
  integrationName: "Integroinnin nimi",
  apiKey: "Integrations API -avain",
  intEndpointMethod: "Integroinnin tarjoaja",
  //Campaigns and ads
  campaignDescription: "Kampanjan kuvaus",
  campaignTitle: "Kampanjan otsikko",
  campaignStatus: "Valitse valintaruutu, jos haluat, että kampanja julkaistaan välittömästi",
  campaignDuration: "Kampanjan kesto",
  //Settings
  settingName: "Asetetaan nimi",
  settingValue: "Asetusarvo",
  //users
  email: "Sähköposti",
  password: "Salasana",
  repeatpassword: "Toista salasana",
  firstName: "Etunimi",
  lastName: "Sukunimi",
  phoneNumber: "Puhelinnumero",
  userRole: "Käyttäjän rooli",
  isAdmin: "Onko admin?",
  isActive: "On aktiivinen?",

  feedShowInCommComp: 'Show in communication channels component' // todo 
};
const placeholders = {
  enterEmail: "Syötä sähköpostiosoitteesi",
  enterPassword: "Syötä salasanasi",
  enterNewPassword: "Syötä uusi salasana",
  enterRepeatPassword: "Toista uusi salasana",
  exampleAppName: "esim. fairytale.test.app",
  exampleOwnerName: "esim fairytale",
  feedNamePlaceholder: "Anna syötteen nimi",
  feedContentPlaceholder: "Anna syötteen sisältö",
  feedContentTitlePlaceholder: "Anna syötteen sisällön otsikko",
  feedUrlPlaceholder: "Anna syötteen URL-osoite",
  integrationNamePlaceholder: "Anna integroinnin nimi",
  integrationApiKeyPlaceholder: "Anna integroinnin API-avain",
  integrationFeedUrlPlaceholder: "Anna integrointisyötteen URL-osoite",
  //Campaigns and ads
  campaignDescriptionPlaceholder: "Anna kampanjan lyhyt kuvaus",
  campaignTitlePlaceholder: "Anna kampanjan otsikko",
  campaignStatusPlaceholder: "",
  campaignDurationPlaceholder: "Anna tämän kampanjan mainosten kesto",
  //Settings
  settingNamePlaceholder: "esim. app_version",
  settingValuePlaceholder: "esim. 0.1.1",
  //users
  emailPlaceholder: "Sähköpostiosoite",
  passwordPlaceholder: "Salasana",
  firstNamePlaceholder: "Etunimi",
  lastNamePlaceholder: "Sukunimi",
  phoneNumberPlaceholder: "Puhelinnumero",
  userRoleSelectPlaceholder: "Valitse rooli",
  messageTitlePlaceholder: "Message title", // TODO: update language
  messageBodyPlaceholder: "Message body",
  messageLinkPlaceholder: "Link",
  messageTypePlaceholder: "Type",
  messageYes_button_textPlaceholder: "Yes button text",
  messageYes_button_text_enPlaceholder: "Yes button text (english)",
  messageNo_button_textPlaceholder: "No button text",
  messageNo_button_text_enPlaceholder: "No button text (english)",
  messagePinned_untilPlaceholder: "Pinned until",
  messageSend_pushPlaceholder: "Send push notification",
  messageIcon_urlPlaceholder: "Icon url",
  messageFileUploadPlaceholder: "Choose a file...",
};
const messages = {
  somethingWentWrong: "Jotain meni pieleen",
  areYouSureApp: "Haluatko varmasti poistaa sovelluksen?",
  appDeleted: "Sovelluksen poistaminen onnistui!",
  areYouSureUser: "Haluatko varmasti poistaa käyttäjän?",
  userDeleted: "Käyttäjän poistaminen onnistui!",
  continue: "Jatkaa",
  appCreated: "Sovellus luotu onnistuneesti!",
  feedCreateSuccess: "Syötteen luominen onnistui",
  fieldIsRequired: "Kenttä ei voi olla tyhjä",
  requestError: "Odottamaton virhe! Yritä pian uudelleen.",
  requestErrorHeading: "Odottamaton virhe",
  fileNotValiidType: "Tiedostotyyppi ei kelpaa",
  allowedFileTypes: "Hyväksytyt tiedostotyypit: .png, .jpg, .jpeg",
  passwordResetEmailSent: "Salasanan vaihtosähköposti lähetetty, tarkista sähköpostisi saadaksesi ohjeet.",
  passwordResetEmailNotSent: "Salasanan palautusviestiä ei lähetetty, yritä pian uudelleen",
};

const yupMessages = {
  emailMustBeValid: "Täytyy olla voimassa oleva sähköpostiosoite",
  emailIsRequired: "Sähköposti vaaditaan",
  passwordIsRequired: "Salasana tarvitaan",
  fieldIsRequired: "Kenttä on pakollinen",
  appNameNotValid: "Sovelluksen nimen tulee päättyä .app-kirjaimeen",
  passwordMinReq: "Vähintään 8 merkkiä vaaditaan",
  passwordMaxReq: "Enintään 50 merkkiä vaaditaan",
  passwoordNotmatch: "Salasanat eivät täsmää!",
};

const formfields_fi = { ...labels, ...placeholders, ...messages, ...yupMessages };

export default formfields_fi;
