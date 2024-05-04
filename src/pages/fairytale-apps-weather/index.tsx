import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Column } from "react-table";
import { IApp } from "../../types/app";
import { Card, Row } from "react-bootstrap";
import FairyTaleTable from "../../components/fairytale-table";
import { 
  useCreateWeatherMutation,
  useDeleteWeatherByAppIdMutation,
  useGetWeatherByAppIdQuery,
} from "../../redux/appQuery";
import { Eye, Trash } from "react-feather";  
import FairytaleModal from "../../components/fairytale-modal";
import { ICreateWeather, IWeather } from "../../types/weather";
import WeatherDetailsView from "./WeatherDetailsView";
import FairytaleFormComponent from "../../components/fairytale-form";
import { WEATHER_CREATE_FORM_ATTRIBUTES } from "./constants";
import FairyTaleAlert from "../../components/fairytale-alert";
import fairytaleYup from "../../yup";

interface IWeatherPageProps {
  app: IApp;
}
const AppWeatherPage: React.FC<IWeatherPageProps> = ({ app }) => {
  const { data: weathers, isLoading, error } = useGetWeatherByAppIdQuery(app.app_id);
  const [deleteWeatherByAppId] = useDeleteWeatherByAppIdMutation();
  const [createWeather] = useCreateWeatherMutation();

  const { t: tforms } = useTranslation(["formFields"]);
  const { t: tcommon } = useTranslation(["common"]);
  const { t: tpagetexts } = useTranslation(["pageTexts"]);

  const [pageTitle, setPageTitle] = useState<string>("Weather");
  const [showSpinner, setShowSpinner] = useState<boolean>(isLoading);  
  const [showModal, setShowModal] = useState<boolean>(false);
  const [modalMessage, setModalMessage] = useState<string>("");
  const [modalHeading, setModalHeading] = useState<string>("");
  const [modalButtonText, setModalBUttonText] = useState<string>(tcommon("yes"));
  const [modalButtonNegText, setModalButtonNegText] = useState<string>(tcommon("cancel"));
  const [weatherToDelete, setWeatherToDelete] = useState<IWeather>();
  const [rowData, setRowData] = useState<IWeather | null>(null);
  const [showDetailModal, setShowDetailModal] = useState<boolean>(false);
  const [alertMessage, setAlertMessage] = useState<string>("");
  const [alertVariant, setAlertVariant] = useState<"light" | "success" | "danger">("light");
  const [showAlert, setShowAlert] = useState<boolean>(false);

  const WEATHER_CREATE_SCHEMA = fairytaleYup.object().shape({
    place: fairytaleYup.string(),
    latitude: fairytaleYup.number(),
    longitude: fairytaleYup.number(),
  });

  const WEATHER_TABLE_COLUMNS: Column<Record<string, any>>[] = React.useMemo(
    () => [
      {
        Header: "weatherPlaceValue",
        id: "key_place",
        Cell: ({ row }: { row: any }) => { 
          let { place } = row.original;
          return place
        },
      },
      {
        Header: "weatherLatitudeValue",
        id: "key_latitude",
        Cell: ({ row }: { row: any }) => {
          let { latitude } = row.original;
          return latitude;
        },
      },
      {
        Header: "weatherLongitudeValue",
        id: "key_longitude",
        Cell: ({ row }: { row: any }) => {
          let { longitude  } = row.original;
          return longitude ;
        },
      },
      {
        Header: tpagetexts("deleteFor"),
        id: "actions",
        Cell: ({ row }: { row: any }) => (
          <span>
             <Eye
              className="align-middle mx-3 cursor-pointer"
              size={18}
              data-cy={`users-list-actions-edit-${row.index}`}
              onClick={() => _handleShowWeather(row.original)}
            />
            <Trash
              className="align-middle mx-2 cursor-pointer"
              size={18}
              data-cy={`setting-list-actions-delete-${row.index}`}
              onClick={() =>
                _handleShowModalAndSetWeatherToDelete(
                  `${tpagetexts("deleteFor")}${row.original.place} ${row.original.id}?`,
                  `${tpagetexts("deleteFor")}${row.original.place} ${row.original.id}`,
                  row.original
                )
              }
            />
          </span>
        ),
      },
    ],
    []
  );

  const _handleShowModalAndSetWeatherToDelete = (message: string, heading: string, data: IWeather) => {
    setModalMessage(message);
    setModalHeading(heading); 
    setWeatherToDelete(data); 
    setShowModal(true);
    setShowSpinner(true); 
    
  };

  const _handleShowWeather = (rowValues: IWeather) => {
    setRowData(rowValues);
    setShowDetailModal(true);
  };

  const _handleShowModal = (message: string, heading: string) => {
    setModalMessage(message);
    setModalHeading(heading);
    setShowModal(true);
  };
  
  const _handleCloseModal = () => {
    setModalMessage("");
    setModalHeading("");
    setShowModal(false);
    if (showSpinner) setShowSpinner(false);
  };

  const _handleClose = () => { 
    setShowDetailModal(false);
  };

  const _handleSubmit = async (values: ICreateWeather, { setStatus, setErrors, setSubmitting, resetForm }: any) => {
  
    const result = (await createWeather({ 
      app_id: app.app_id, 
      ...values, 
      latitude: Number(values.latitude), 
      longitude: Number(values.longitude) 
    })) as { data: any };
    if (result.data === null) {
      setAlertVariant("success");
      setAlertMessage(tforms("weatherCreateSuccess"));
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 5000);
      resetForm();
    } else {
      // @ts-ignore
      const message = result.error.data.message;
      setStatus({ success: false });
      setErrors({ submit: message });
      setSubmitting(false);
      setAlertVariant("danger");
      setAlertMessage(tforms("somethingWentWrong"));
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 5000);
    }
  };


  const _handleDeleteWeather = async (weatherToDeleteData: IWeather) => {
    try {
      await deleteWeatherByAppId(weatherToDeleteData.id);
      setShowSpinner(false);
      _handleCloseModal();
    } catch (error) {
      _handleShowModal(tforms("requestError"), tforms("requestErrorHeading"));
    }
  };
 
  return (
    <>
      <h1 className="h3 mb-3">{pageTitle}</h1>
      <Row>
        <FairyTaleTable
          data-cy="weather-table-main"
          columns={WEATHER_TABLE_COLUMNS}
          data={isLoading ? [] : weathers}
          showHeader={true}
          mainTitle={tpagetexts("weatherFor") + app.app_title}
          subtitle={`${isLoading ? 0 : weathers.length} Weather`}
          useSearchFilter={false}
          selectOptions={[
            {
              value: app.app_title,
              label: app.app_title,
            },
          ]}
          onChangeSelect={null}
        />
      </Row>
      <Row>
        <Card>
          <Card.Title>
            <p className="m-4">{tpagetexts("createWeatherTitle")}</p>
          </Card.Title>
          <Card.Body>
            <FairytaleFormComponent
              formProps={WEATHER_CREATE_FORM_ATTRIBUTES}
              editMode={false}
              onSubmit={_handleSubmit}
              formSchema={WEATHER_CREATE_SCHEMA}
              initialFormValues={{
                place: "",
                latitude: "",
                longitude: ""
              }}
            />,
            <FairyTaleAlert
              variant={alertVariant}
              message={tpagetexts(alertMessage)}
              heading=""
              show={showAlert}
              name="weather-create"
            />
          </Card.Body>
        </Card>
      </Row>
      <FairytaleModal showModal={showDetailModal} onHideModal={_handleClose} name="user-details-modal">
          <WeatherDetailsView weather={rowData as IWeather} app={app} />
        </FairytaleModal>
      <FairytaleModal
        showModal={showModal}
        onHideModal={_handleCloseModal}
        modalHeading={modalHeading}
        modalMessage={modalMessage}
        onClickNegativeButton={_handleCloseModal}
        onClickPositveButton={() => _handleDeleteWeather(weatherToDelete as IWeather)}
        modalButtonTextPositive={modalButtonText}
        modalButtonTextNegative={modalButtonNegText}
        name="weathers"
      />
    </>
  );
};

export default AppWeatherPage;
