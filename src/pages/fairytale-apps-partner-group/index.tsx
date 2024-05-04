import React, { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Column } from "react-table";
import { IApp } from "../../types/app";
import { Card, Row } from "react-bootstrap";
import FairyTaleTable from "../../components/fairytale-table";
import {  
  useCreatePartnersGroupMutation,
  useDeletePartnersGroupMutation,
  useGetPartnersGroupQuery,
  useUpdatePartnersGroupMutation,
} from "../../redux/appQuery";
import { ArrowDown, ArrowUp, Eye, Trash } from "react-feather";  
import FairytaleModal from "../../components/fairytale-modal"; 
import FairytaleFormComponent from "../../components/fairytale-form";
import { PARTNER_GROUP_CREATE_FORM_ATTRIBUTES } from "./constants";
import FairyTaleAlert from "../../components/fairytale-alert";
import fairytaleYup from "../../yup";
import { ICreatePartnerGroup, IPartnerGroup } from "../../types/partner.group";
import PartnerGroupDetailsView from "./PartnerGroupDetailsView";


interface IPartnerGroupPageProps {
  app: IApp;
}
const PartnerGroupPage: React.FC<IPartnerGroupPageProps> = ({ app }) => {
  const { data: groups, isLoading, error, refetch } = useGetPartnersGroupQuery({appId: app.app_id});
  const [deletePartnersGroup] = useDeletePartnersGroupMutation();
  const [createPartnersGroup] = useCreatePartnersGroupMutation();
  const [updatePartnersGroup] = useUpdatePartnersGroupMutation()

  const { t: tforms } = useTranslation(["formFields"]);
  const { t: tcommon } = useTranslation(["common"]);
  const { t: tpagetexts } = useTranslation(["pageTexts"]);

  const [pageTitle, setPageTitle] = useState<string>("Partner group");
  const [showSpinner, setShowSpinner] = useState<boolean>(isLoading);  
  const [showModal, setShowModal] = useState<boolean>(false);
  const [modalMessage, setModalMessage] = useState<string>("");
  const [modalHeading, setModalHeading] = useState<string>("");
  const [modalButtonText, setModalBUttonText] = useState<string>(tcommon("yes"));
  const [modalButtonNegText, setModalButtonNegText] = useState<string>(tcommon("cancel"));
  const [groupToDelete, setGroupToDelete] = useState<IPartnerGroup>();
  const [rowData, setRowData] = useState<IPartnerGroup | null>(null);
  const [showDetailModal, setShowDetailModal] = useState<boolean>(false);
  const [alertMessage, setAlertMessage] = useState<string>("");
  const [alertVariant, setAlertVariant] = useState<"light" | "success" | "danger">("light");
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [groupsData, setGroupData] = useState<IPartnerGroup[]>([])
  const [activeRow, setActiveRow] = useState<IPartnerGroup | null>(null);
 
  useEffect(() => {
    if (!isLoading && groups) { 
      setGroupData(groups);
    }
  }, [groups, isLoading]);

  const PARTNER_GROUP_CREATE_SCHEMA = fairytaleYup.object().shape({
    title: fairytaleYup.string(),
    title_en: fairytaleYup.string(),
    order: fairytaleYup.number(),
    column_count: fairytaleYup.number(),
  });

  const moveRow = async (direction: 'up' | 'down', id: string) => {
    if (!groups.length) {
      console.error('No data available to move.');
      return;
    }
    const oldGroupsData = [...groups];

    oldGroupsData.sort((a:any, b:any) => a.order - b.order)

    const currentIndex = oldGroupsData.findIndex(element => element.id === id);
    if (currentIndex === -1) {
      console.error(`No element found with id ${id}.`);
      return;
    }
  
    let newIndex;
    if (direction === 'up') { 
      newIndex = currentIndex === 0 ? oldGroupsData.length - 1 : currentIndex - 1;
    } else { 
      newIndex = currentIndex === oldGroupsData.length - 1 ? 0 : currentIndex + 1;
    }
  
    const targetElement = oldGroupsData[newIndex];

    let orderTarget = targetElement.order;

    if(orderTarget === oldGroupsData[currentIndex].order) {
      orderTarget += 1
    } 
    
    const currentElement = { ...oldGroupsData[currentIndex], order: orderTarget };
    const newTargetElement = { ...targetElement, order: oldGroupsData[currentIndex].order };
  
    const newGroupsData = [...oldGroupsData];
    newGroupsData[currentIndex] = currentElement;
    newGroupsData[newIndex] = newTargetElement;
  
    try {
      await updatePartnersGroup({ id: currentElement.id, body: currentElement });
      await updatePartnersGroup({ id: newTargetElement.id, body: newTargetElement });
  
      setGroupData(newGroupsData.sort((a:any, b:any) => a.order - b.order));
    } catch (error) {
      console.error('Failed to move row:', error);
      refetch();
    }
  };

  const PARTNER_GROUP_TABLE_COLUMNS: Column<Record<string, any>>[] = React.useMemo(
    () => [
      {
        Header: "Order",
        id: "key_order",
        disableSortBy: false, 
        Cell: ({ row }: { row: any }) => {
          let { order } = row.original;
          return String(order);
        },

      },
      {
        Header: "Title",
        id: "key_title",
        disableSortBy: false, 
        Cell: ({ row }: { row: any }) => { 
          let { title } = row.original;
          return title
        },
      },
      {
        Header: "Title en",
        id: "key_title_en",
        disableSortBy: false, 
        Cell: ({ row }: { row: any }) => {
          let { title_en  } = row.original;
          return title_en;
        },
      },
      {
        Header: "Count",
        id: "key_column_count",
        disableSortBy: false,
        Cell: ({ row }: { row: any }) => {
          let { column_count  } = row.original;
          return column_count;
        },
      },
      {
        Header: tpagetexts("deleteFor"),
        id: "actions",
        disableSortBy: false,
        Cell: ({ row }: { row: any }) => (
          <span> 
            <Trash
              className="align-middle mx-2 cursor-pointer"
              size={18}
              data-cy={`setting-list-actions-delete-${row.index}`}
      
              onClick={(e) => {
                e.stopPropagation();
                _handleShowModalAndSetWeatherToDelete(
                  `${tpagetexts("deleteFor")}${row.original.title} ${row.original.id}?`,
                  `${tpagetexts("deleteFor")}${row.original.title} ${row.original.id}`,
                  row.original
                );
              }}
            />
          </span>
        ),
      },
      {
        Header: "Actions",
        id: "actions_move", 
        disableSortBy: false,
        Cell: ({ row }: { row: any }) => (
          <span>
             <ArrowUp
              className="align-middle mx-3 cursor-pointer"
              size={18}
              data-cy={`group-partners-list-actions-edit-${row.index}`} 
              onClick={(e) => {
                e.stopPropagation();
                moveRow('up', row.original.id);
              }}
            />
            <ArrowDown
              className="align-middle mx-3 cursor-pointer"
              size={18}
              data-cy={`group-partners-list-actions-edit-${row.index}`} 
              onClick={(e) => {
                e.stopPropagation();
                moveRow('down', row.original.id);
              }}
            />
          </span>
        ),
      },
    ],
    [groups]
  );

  const _handleShowModalAndSetWeatherToDelete = (message: string, heading: string, data: IPartnerGroup) => {
      setModalMessage(message);
      setModalHeading(heading); 
      setGroupToDelete(data); 
      setShowModal(true);
      setShowSpinner(true); 
    
  };

  const handleRowClick = useCallback((row: any,  event: React.MouseEvent) => {
    let isActionCellClick = event.target instanceof HTMLElement &&
              (event.target.className.includes('action-cell') || 
              event.target.closest('.action-cell'));
 
    if (!isActionCellClick) { 
      setActiveRow(row.original);
    }

  }, []);

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

  const _handleSubmit = async (values: ICreatePartnerGroup, 
    { setStatus, setErrors, setSubmitting, resetForm }: any) => {
 
    const result = (await createPartnersGroup({ 
      body: {
        app_id: app.app_id, 
        ...values,  
        order:  groupsData.length + 1,
        column_count: values.column_count ? Number(values.column_count) : 0,
      }
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


  const _handleDeleteWeather = async (data: IPartnerGroup) => {
    try {
      await deletePartnersGroup({id: data.id});
      setShowSpinner(false); 
      const recordsToUpdate = groupsData
        .filter(group => group.order > data.order)
        .map(group => ({
          ...group,
          order: Number(group.order) - 1
        }));

      const updatePromises = recordsToUpdate.map(group =>
        updatePartnersGroup({
          id: group.id,
          body: group
        })
      );

      await Promise.all(updatePromises);
        
      _handleCloseModal();
    } catch (error) {
      _handleShowModal(tforms("requestError"), tforms("requestErrorHeading"));
    }
  };
 
  return (
    activeRow === null ? (
      <>
        <h1 className="h3 mb-3">{pageTitle}</h1>
        <Row>
          <FairyTaleTable
            data-cy="partner-group-table-main"
            columns={PARTNER_GROUP_TABLE_COLUMNS}
            data={isLoading ? [] : groupsData}
            showHeader={true}
            mainTitle={tpagetexts("partnerGroupFor") + app.app_title}
            subtitle={`${isLoading ? 0 : groupsData?.length} Group`}
            onClickTableRow={handleRowClick}
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
              <p className="m-4">{tpagetexts("createPartnerGroupTitle")}</p>
            </Card.Title>
            <Card.Body>
              <FairytaleFormComponent
                formProps={PARTNER_GROUP_CREATE_FORM_ATTRIBUTES}
                editMode={false}
                onSubmit={_handleSubmit}
                formSchema={PARTNER_GROUP_CREATE_SCHEMA}
                initialFormValues={{
                  title: "",
                  title_en: "",
                  column_count: ""
                }}
              />
              <FairyTaleAlert
                variant={alertVariant}
                message={tpagetexts(alertMessage)}
                heading=""
                show={showAlert}
                name="partner-group-create"
              />
            </Card.Body>
          </Card>
        </Row>
        <FairytaleModal
          showModal={showModal}
          onHideModal={_handleCloseModal}
          modalHeading={modalHeading}
          modalMessage={modalMessage}
          onClickNegativeButton={_handleCloseModal}
          onClickPositveButton={() => _handleDeleteWeather(groupToDelete as IPartnerGroup)}
          modalButtonTextPositive={modalButtonText}
          modalButtonTextNegative={modalButtonNegText}
          name="weathers"
        />
      </>
    ) : (
      <PartnerGroupDetailsView groupId={activeRow.id} onClickBack={() => setActiveRow(null)} />
    )
  );  
};

export default PartnerGroupPage;
