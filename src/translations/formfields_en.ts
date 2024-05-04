const labels = {
  //apps
  emailField: "Email",
  passwordField: "Password",
  rememberMe: "Remember me next time",
  app_store_id: "App Store ID",
  app_title: "App name",
  //feeds
  feedContent: "Feed Content",
  feedName: "Feed name *",
  feedContentTitle: "Feed content title",
  feedUrl: "Feed URL *",
  feedIntegrations: "Feed integrations *",
  feedIconUrl: "Choose an icon for the Feed",
  //integrations
  integrationName: "Integration name",
  apiKey: "Integrations API key",
  intEndpointMethod: "Integration provider",
  //Campaigns and ads
  campaignDescription: "Campaign description",
  campaignTitle: "Campaign title",
  campaignStatus: "Check the box if you'd like the campaign to go live immediately",
  campaignDuration: "Campaign duration",
  //Settings
  settingName: "Setting name",
  settingValue: "Setting value",
  //users
  email: "Email",
  password: "Password",
  repeatpassword: "Repeat Password",
  firstName: "First name",
  lastName: "Last name",
  phoneNumber: "Phone number",
  userRole: "User role",
  isAdmin: "Is admin?",
  isActive: "Is active?",

  // weather
  placeName: 'Place',
  latitudeName: 'Latitude',
  longitudeName: 'Longitude',

  file_upload: "Image",

  feedShowInCommComp: 'Show in communication channels component',
  titleName: 'Title',
  title_enName: 'Title en',
  orderName: 'Order',
  column_countName: 'Count',
  
};
const placeholders = {
  enterEmail: "Enter your email",
  enterPassword: "Enter your password",
  enterNewPassword: "Enter new password",
  enterRepeatPassword: "Repeat password",
  exampleAppName: "e.g fairytale.test.app",
  exampleOwnerName: "e.g fairytale",
  feedNamePlaceholder: "Enter feed name",
  feedContentPlaceholder: "Enter feed content",
  feedContentTitlePlaceholder: "Enter feed content title",
  feedUrlPlaceholder: "Enter feed URL",
  integrationNamePlaceholder: "Enter integration name",
  integrationApiKeyPlaceholder: "Enter integration API key",
  integrationFeedUrlPlaceholder: "Enter integration feed URL",
  //Feeds
  feedIconUrlPlaceholder: "",
  //Campaigns and ads
  campaignDescriptionPlaceholder: "Enter short description for the campaign",
  campaignTitlePlaceholder: "Enter campaign title",
  campaignStatusPlaceholder: "",
  campaignDurationPlaceholder: "Enter the duration for ads in this campaign",
  //Settings
  settingNamePlaceholder: "e.g app_version",
  settingValuePlaceholder: "e.g 0.1.1",
  //users
  emailPlaceholder: "Email address",
  passwordPlaceholder: "Password",
  firstNamePlaceholder: "First name",
  lastNamePlaceholder: "Last name",
  phoneNumberPlaceholder: "Phone number",
  userRoleSelectPlaceholder: "Select a role",
  messageTitlePlaceholder: "Message title",
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
  file_upload: "Image",
  // weather
  placeNamePlaceholder:'',
  latitudeNamePlaceholder: '',
  longitudeNamePlaceholder: '',

  // user group
  userGroupNamePlaceholder: '',
  userGroupName: 'Name',

  feedShowInCommCompPlaceholder: '',
  titleName: 'Title',
  title_enName: 'Title en',
  orderName: 'Order',
  column_countName: 'Count',
};
const messages = {
  somethingWentWrong: "Something went wrong",
  areYouSureApp: "Are you sure you want to delete app?",
  appDeleted: "App deleted successfully!",
  areYouSureUser: "Are you sure you want to delete user?",
  userDeleted: "User deleted successfully!",
  continue: "Continue",
  appCreated: "App created successfully!",
  feedCreateSuccess: "Feed created successfully",
  fieldIsRequired: "Field can not be empty",
  requestError: "Unexpected error! Try again soon.",
  requestErrorHeading: "Unexpected error",
  fileNotValiidType: "File type not valid",
  allowedFileTypes: "Accepted file types : .png, .jpg, .jpeg",
  passwordResetEmailSent: "Password reset email sent, please check you email for instructions.",
  passwordResetEmailNotSent: "Password reset email not sent, please try again soon",
};

const yupMessages = {
  emailMustBeValid: "Must be a valid email",
  emailIsRequired: "Email is required",
  passwordIsRequired: "Password is required",
  fieldIsRequired: "Field can not be empty",
  appNameNotValid: "App name must end with .app",
  passwordMinReq: "Minimum of 8 characters required",
  passwordMaxReq: "Maximum of 50 characters required",
  passwoordNotmatch: "Passwords do not match!",
};

const formfields_en = { ...labels, ...placeholders, ...messages, ...yupMessages };

export default formfields_en;
