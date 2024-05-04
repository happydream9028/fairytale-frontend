const labels = {
  //apps
  emailField: "E-post",
  passwordField: "Lösenord",
  rememberMe: "kom ihåg mig nästa gång",
  app_store_id: "App Store ID",
  app_title: "App-namn",
  //feeds
  feedContent: "Flödesinnehåll",
  feedName: "Flödes namn *",
  feedContentTitle: "Rubrik för flödesinnehåll",
  feedUrl: "Flödes URL *",
  feedIntegrations: "Flödesintegrationer *",
  feedIconUrl: "Välj en ikon för flödet",
  //integrations
  integrationName: "Integrationsnamn",
  apiKey: "Integrations API -nyckel",
  intEndpointMethod: "Integrationsleverantör",
  //Campaigns and ads
  campaignDescription: "Kampanjbeskrivning",
  campaignTitle: "Kampanjens titel",
  campaignStatus: "Markera rutan om du vill att kampanjen ska gå live direkt",
  campaignDuration: "Kampanjens varaktighet",
  //Settings
  settingName: "Inställningsnamn",
  settingValue: "Inställningsvärde",
  //users
  email: "E-post",
  password: "Lösenord",
  repeatpassword: "Repetera lösenord",
  firstName: "Förnamn",
  lastName: "Efternamn",
  phoneNumber: "Puhelinnumero",
  userRole: "Användarroll",
  isAdmin: "Är admin?",
  isActive: "Är aktiv?",

  feedShowInCommComp: 'Show in communication channels component' // todo 
};
const placeholders = {
  enterEmail: "Ange din e-postadress",
  enterPassword: "Ange ditt lösenord",
  enterNewPassword: "Ange nytt lösenord",
  enterRepeatPassword: "Repetera nytt lösenord",
  exampleAppName: "t.ex. fairytale.test.app",
  exampleOwnerName: "t.ex. fairytale",
  feedNamePlaceholder: "Ange flödesnamn",
  feedContentPlaceholder: "Ange flödesinnehåll",
  feedContentTitlePlaceholder: "Ange rubrik för flödesinnehåll",
  feedUrlPlaceholder: "Ange feed-URL",
  integrationNamePlaceholder: "Ange integrationsnamn",
  integrationApiKeyPlaceholder: "Ange integrations-API-nyckel",
  integrationFeedUrlPlaceholder: "Ange webbadress för integrationsflöde",
  //Campaigns and ads
  campaignDescriptionPlaceholder: "Ange en kort beskrivning av kampanjen",
  campaignTitlePlaceholder: "Ange kampanjtitel",
  campaignStatusPlaceholder: "",
  campaignDurationPlaceholder: "Ange varaktigheten för annonserna i denna kampanj",
  //Settings
  settingNamePlaceholder: "t.ex. app_version",
  settingValuePlaceholder: "t.ex. 0.1.1",
  //users
  emailPlaceholder: "E-postadress",
  passwordPlaceholder: "Lösenord",
  firstNamePlaceholder: "Förnamn",
  lastNamePlaceholder: "Efternamn",
  phoneNumberPlaceholder: "Puhelinnumero",
  userRoleSelectPlaceholder: "Välj en roll",
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
  somethingWentWrong: "Något gick fel",
  areYouSureApp: "Är du säker på att du vill ta bort appen?",
  appDeleted: "Appen har raderats!",
  areYouSureUser: "Är du säker på att du vill ta bort användare?",
  userDeleted: "Användaren har raderats!",
  continue: "Fortsätta",
  appCreated: "Appen har skapats framgångsrikt!",
  feedCreateSuccess: "Flödet har skapats",
  fieldIsRequired: "Fältet får inte vara tomt",
  requestError: "Oväntat fel! Försök snart igen.",
  requestErrorHeading: "Oväntat fel",
  fileNotValiidType: "Filtypen är inte giltig",
  allowedFileTypes: "Godkända filtyper: .png, .jpg, .jpeg",
  passwordResetEmailSent:
    "E-postmeddelande om lösenordsåterställning har skickats, vänligen " + "kontrollera din e-post för instruktioner.",
  passwordResetEmailNotSent: "E-postmeddelande om lösenordsåterställning har inte skickats, försök igen snart",
};

const yupMessages = {
  emailMustBeValid: "Måste vara en giltig e-postadress",
  emailIsRequired: "E-post krävs",
  passwordIsRequired: "Lösenord krävs",
  fieldIsRequired: "Fältet är obligatoriskt",
  appNameNotValid: "Appens namn måste sluta med .app",
  passwordMinReq: "Minst 8 tecken krävs",
  passwordMaxReq: "Maximalt 50 tecken krävs",
  passwoordNotmatch: "Lösenorden matchar inte!",
};

const formfields_se = { ...labels, ...placeholders, ...messages, ...yupMessages };

export default formfields_se;
