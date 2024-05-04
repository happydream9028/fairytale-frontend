import React, { MouseEventHandler, useCallback, useEffect, useState } from "react";

import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import FairytaleFormComponent from "../../components/fairytale-form";
import fairytaleYup from "../../yup";
import FairyTaleAlert from "../../components/fairytale-alert"; 
 
import { PARTNER_GROUP_FORM_ATTRIB_DATA } from "./constants"; 
import { t } from "i18next";
import { useGetPartnersGroupByIdQuery, 
  useUpdatePartnersGroupMutation, 
  useUpdatePartnersMutation} from "../../redux/appQuery";
import FairyTaleTable from "../../components/fairytale-table";
import { Column } from "react-table";
import { ArrowDown, ArrowLeftCircle, ArrowUp, Eye, Filter, Trash } from "react-feather";
import FairytaleModal from "../../components/fairytale-modal";
import AddDetailsView from "./AddPartnerView";
import ImagePreview from "../fairytale-messaging/ImagePreview";
import EditDetailsView from "./EditPartnerView";

 
interface ICampaignDetail {
  groupId: string;
  onClickBack: MouseEventHandler<SVGElement>; 
}

const PartnerGroupDetailsView: React.FC<ICampaignDetail> = ({ onClickBack, groupId }) => {
 
  const { data: group, isLoading, error, refetch } = useGetPartnersGroupByIdQuery({groupId: groupId }) 
 
  const { t: tpagetexts } = useTranslation(["pageTexts"]);
  const { t: tcommon } = useTranslation(["common"]);
  const { t: tforms } = useTranslation(["formFields"]);
  const [updatePartnersGroup] = useUpdatePartnersGroupMutation();
  const [updatePartners] = useUpdatePartnersMutation()
  const [showAlert, setShowAlert] = useState(false);
  const [statusSuccess, setStatusSuccess] = useState(true) 
  const [msgError, setMsgError] = useState('error')
  const [modalMessage, setModalMessage] = useState<string>("");
  const [modalHeading, setModalHeading] = useState<string>("");
  const [groupToDelete, setGroupToDelete] = useState<any>();
  const [showSpinner, setShowSpinner] = useState<boolean>(isLoading);  
  const [showModal, setShowModal] = useState<boolean>(false);
  const [modalButtonText, setModalBUttonText] = useState<string>(tcommon("yes"));
  const [modalButtonNegText, setModalButtonNegText] = useState<string>(tcommon("cancel"));
  const [activeRow, setActiveRow] = useState<any>(null);
  const [isDelete, setIsDeleted] = useState(false);
 
  const PARTNER_GROUP_SCHEMA = fairytaleYup.object().shape({ 
    title: fairytaleYup.string(),
    title_en: fairytaleYup.string(), 
    column_count: fairytaleYup.number(),
  });
  
  const _handleSubmit = async (values: any, { setStatus, setErrors, setSubmitting, resetForm }: any) => {
 
    const editData = { 
      app_id: group.app_id,
      title: values.title,
      title_en: values.title_en, 
      order: group.order,  
      column_count: values.column_count ? Number(values.column_count) : 0,
    };

    const { error } = (await updatePartnersGroup({ id: values.id, body: editData})) as {
      data: any;
      error: any
    };
    
    if (!error) {
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 10000);
    } else {
      // @ts-ignore 
      const message = error.data.message.length > 0 ? error.data.message[0] : '' ||  t("somethingWentWrong");
      
      setStatusSuccess(false)
      setShowAlert(true);
      setTimeout(() => {
        setStatusSuccess(true)
        setShowAlert(false)
      }, 10000);
      setErrors({ submit: message });
      setMsgError(message)
      
      return; 
    }
  };

  const handleDeleteRecord = async (record: any) => { 
    try {      
      await updatePartners({ id: record.id, body: {
        ...record,
        partner_group_id: "-1"
      }});

      setShowSpinner(false);
      _handleCloseModal();
      refetch()
    } catch (error) {
      _handleShowModal(tforms("requestError"), tforms("requestErrorHeading"));
    }
  };

 
  const _handleCloseModal = () => {
    setModalMessage("");
    setModalHeading("");
    setShowModal(false);
    refetch()
    if (showSpinner) setShowSpinner(false);
  };

  const _handleShowModal = (message: string, heading: string) => {
    setModalMessage(message);
    setModalHeading(heading);
    setShowModal(true);
  };

  const moveRow = async (direction: 'up' | 'down', id: string, partners: any[]) => {
    if (!partners?.length) {
      console.error('No data available to move.');
      return;
    }
    const oldGroupsData = [...partners];

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
      await updatePartners({ id: currentElement.id, body: {
        ...currentElement,
        partner_group_id: String(groupId)
      } 
      });

      await updatePartners({ id: newTargetElement.id, body: {
        ...newTargetElement,
        partner_group_id: String(groupId)
      } }); 
      refetch()
    } catch (error) {
      console.error('Failed to move row:', error);
      refetch();
    }
  };

  const PARTNER_TABLE_COLUMNS: Column<Record<string, any>>[] = React.useMemo(
    () => [
      {
        Header: "Order",
        id: "key_order",
        disableSortBy: false,
        Cell: ({ row }: { row: any }) => { 
          let { order } = row.original;
          return order;
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
        Header: "Image",
        id: "key_url",
        disableSortBy: false,
        Cell: ({ row }: { row: any }) => {
          let { image_url  } = row.original; 
          return <ImagePreview imageUrl={image_url || ''}  placeholderText='' />;
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
              onClick={() =>
                handleOpenModalForDelete(
                  `${tpagetexts("deleteFor")}${row.original.title} ${row.original.id}?`,
                  `${tpagetexts("deleteFor")}${row.original.title} ${row.original.id}`,
                  row.original
                )
              }
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
              data-cy={`setting-list-actions-delete-${row.index}`}
              onClick={(e) => {
                e.stopPropagation();
                moveRow('up', row.original.id, group.partners)}
              }
            />
            <ArrowDown
              className="align-middle mx-3 cursor-pointer"
              size={18}
              data-cy={`setting-list-actions-delete-${row.index}`}
              onClick={(e) => {
                e.stopPropagation();
                moveRow('down', row.original.id, group.partners)}
              }
            />
          </span>
        ),
      },
    ],
    [group?.partners]
  );

  const handleRowClick = useCallback((row: any,  event: React.MouseEvent) => {
    let isActionCellClick = event.target instanceof HTMLElement &&
              (event.target.className.includes('action-cell') || 
              event.target.closest('.action-cell'));
 
    if (!isActionCellClick) { 
      setActiveRow(row.original);
    }

  }, []);
   

  const handleOpenModalForAdd = async () => {
    setModalMessage('message');
    setModalHeading('Add new partner');  
    setIsDeleted(false)
    setShowModal(true);
    setShowSpinner(true); 

  };


  const handleOpenModalForDelete = (message: string, heading: string, data: any) => { 
    setModalMessage(message);
    setModalHeading(heading); 
    setGroupToDelete(data); 
    setShowModal(true);
    setIsDeleted(true)
    setShowSpinner(true); 
  };

  return (
    <React.Fragment>
      {activeRow === null ? (
        <>
          <Container fluid className="p-0">
            <ArrowLeftCircle className="cursor-pointer mb-3" onClick={onClickBack} />
            <Row>
              <Col>
                <Card>
                  <Card.Header>
                    <Card.Title className="mb-0">Details group</Card.Title>
                  </Card.Header>
                  <Card.Body>
                    <FairyTaleAlert
                      variant={statusSuccess ? "success" : "danger"}
                      message={statusSuccess ? tcommon("updated") : msgError}
                      heading=""
                      show={showAlert}
                      name="message-create"
                    />
                    {!isLoading && (
                      <FairytaleFormComponent
                        formProps={PARTNER_GROUP_FORM_ATTRIB_DATA}
                        editMode={false}
                        onSubmit={_handleSubmit}
                        formSchema={PARTNER_GROUP_SCHEMA}
                        initialFormValues={group}
                      />
                    )}
                    <FairyTaleTable
                      data-cy="partner-table-main"
                      columns={PARTNER_TABLE_COLUMNS}
                      data={isLoading ? [] : group.partners}
                      showHeader={true}
                      mainTitle="Partners"
                      subtitle={`${isLoading ? 0 : group.partners?.length} partners`}
                      useSearchFilter={true}
                      onClickTableRow={handleRowClick}
                      onClickAdd={handleOpenModalForAdd}
                    />
                    {isDelete ? (
                      <FairytaleModal
                        showModal={showModal}
                        onHideModal={_handleCloseModal}
                        modalHeading={modalHeading}
                        modalMessage={modalMessage}
                        onClickNegativeButton={_handleCloseModal}
                        onClickPositveButton={() => handleDeleteRecord(groupToDelete)}
                        modalButtonTextPositive={modalButtonText}
                        modalButtonTextNegative={modalButtonNegText}
                        name="weathers"
                      />
                    ) : (
                      <FairytaleModal
                        showModal={showModal}
                        onHideModal={_handleCloseModal}
                        name="user-details-modal">
                        <AddDetailsView groupId={groupId || ''} onSubmit={_handleCloseModal} />
                      </FairytaleModal>
                    )}
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Container>
        </>
      ) : (
        <EditDetailsView partner={activeRow} groupId={groupId} onClickBack={() => setActiveRow(null)} />
      )}
    </React.Fragment>
  );
  
};

export default PartnerGroupDetailsView;
