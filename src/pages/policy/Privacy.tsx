import React from "react";
import { Helmet } from "react-helmet-async";
import { Col, Container, Row } from "react-bootstrap";

const Intro = () => (
  <div className="mb-5">
    <h3>Privacy Policy of the CLUB Facebook app</h3>
    <p className="text-lg">
      In order to receive information about your Personal Data, the purposes and the parties the Data is shared with,
      contact the Owner.
    </p>
    <h4>Owner and Data Controller</h4>
    <p className="text-lg">
      Fairytale Magic Oy, Kärängänkatu 8 B 18, 70840 Kuopio, Finland Owner Owner contact email:{" "}
      <a href="mailto:fairytalemagicltd@gmail.com">fairytalemagicltd@gmail.com</a>
    </p>
  </div>
);

const TypesOfData = () => (
  <div className="mb-5">
    <h3>Types of Data collected</h3>
    <p className="text-lg">
      The owner does not provide a list of Personal Data types collected. Complete details on each type of Personal Data
      collected are provided in the dedicated sections of this privacy policy or by specific explanation texts displayed
      prior to the Data collection. Personal Data may be freely provided by the User, or, in case of Usage Data,
      collected automatically when using this Application. Unless specified otherwise, all Data requested by this
      Application is mandatory and failure to provide this Data may make it impossible for this Application to provide
      its services. In cases where this Application specifically states that some Data is not mandatory, Users are free
      not to communicate this Data without consequences to the availability or the functioning of the Service. Users who
      are uncertain about which Personal Data is mandatory are welcome to contact the Owner. Any use of Cookies – or of
      other tracking tools – by this Application or by the owners of third-party services used by this Application
      serves the purpose of providing the Service required by the User, in addition to any other purposes described in
      the present document and in the Cookie Policy, if available. Users are responsible for any third-party Personal
      Data obtained, published or shared through this Application and confirm that they have the third party's consent
      to provide the Data to the Owner.
    </p>
  </div>
);

const ModeAndPlaceOfDataProcessing = () => (
  <div className="mb-6">
    <h3>Mode and place of processing the Data</h3>
    <h4>Methods of processing</h4>
    <p className="text-lg">
      The Owner takes appropriate security measures to prevent unauthorized access, disclosure, modification, or
      unauthorized destruction of the Data. The Data processing is carried out using computers and/or IT enabled tools,
      following organizational procedures and modes strictly related to the purposes indicated. In addition to the
      Owner, in some cases, the Data may be accessible to certain types of persons in charge, involved with the
      operation of this Application (administration, sales, marketing, legal, system administration) or external parties
      (such as third-party technical service providers, mail carriers, hosting providers, IT companies, communications
      agencies) appointed, if necessary, as Data Processors by the Owner. The updated list of these parties may be
      requested from the Owner at any time.
    </p>
    <h4>Legal basis of processing</h4>
    <p className="text-lg">
      The Owner may process Personal Data relating to Users if one of the following applies:
      <ul>
        <li>
          <p>
            Users have given their consent for one or more specific purposes. Note: Under some legislations the Owner
            may be allowed to process Personal Data until the User objects to such processing (“opt-out”), without
            having to rely on consent or any other of the following legal bases. This, however, does not apply, whenever
            the processing of Personal Data is subject to European data protection law;
          </p>
        </li>
        <li>
          <p>
            provision of Data is necessary for the performance of an agreement with the User and/or for any
            pre-contractual obligations thereof;
          </p>
        </li>
        <li>
          <p>processing is necessary for compliance with a legal obligation to which the Owner is subject;</p>
        </li>
        <li>
          <p>
            processing is related to a task that is carried out in the public interest or in the exercise of official
            authority vested in the Owner;
          </p>
        </li>
        <li>
          <p>
            processing is necessary for the purposes of the legitimate interests pursued by the Owner or by a third
            party.
          </p>
        </li>
      </ul>
      In any case, the Owner will gladly help to clarify the specific legal basis that applies to the processing, and in
      particular whether the provision of Personal Data is a statutory or contractual requirement, or a requirement
      necessary to enter into a contract.
    </p>
    <h4>Place</h4>
    <p className="text-lg">
      The Data is processed at the Owner's operating offices and in any other places where the parties involved in the
      processing are located. <br />
      <br />
      Depending on the User's location, data transfers may involve transferring the User's Data to a country other than
      their own. To find out more about the place of processing of such transferred Data, Users can check the section
      containing details about the processing of Personal Data. Users are also entitled to learn about the legal basis
      of Data transfers to a country outside the European Union or to any international organization governed by public
      international law or set up by two or more countries, such as the UN, and about the security measures taken by the
      Owner to safeguard their Data. <br />
      <br />
      If any such transfer takes place, Users can find out more by checking the relevant sections of this document or
      inquire with the Owner using the information provided in the contact section.
    </p>
    <h4>Retention time</h4>
    <p className="text-lg">
      Personal Data shall be processed and stored for as long as required by the purpose they have been collected for.
      Therefore:
      <ul>
        <li>
          <p>
            Personal Data collected for purposes related to the performance of a contract between the Owner and the User
            shall be retained until such contract has been fully performed.
          </p>
        </li>
        <li>
          <p>
            Personal Data collected for the purposes of the Owner’s legitimate interests shall be retained as long as
            needed to fulfill such purposes. Users may find specific information regarding the legitimate interests
            pursued by the Owner within the relevant sections of this document or by contacting the Owner.
          </p>
        </li>
      </ul>
      The Owner may be allowed to retain Personal Data for a longer period whenever the User has given consent to such
      processing, as long as such consent is not withdrawn. Furthermore, the Owner may be obliged to retain Personal
      Data for a longer period whenever required to do so for the performance of a legal obligation or upon order of an
      authority.
      <br />
      <br />
      Once the retention period expires, Personal Data shall be deleted. Therefore, the right of access, the right to
      erasure, the right to rectification and the right to data portability cannot be enforced after expiration of the
      retention period.
    </p>
  </div>
);

const PurposeOfProcessing = () => (
  <div className="mb-5">
    <h3>The purposes of processing</h3>
    <p className="text-lg">
      For specific information about the Personal Data used for each purpose, the User may refer to the section
      “Detailed information on the processing of Personal Data”.
    </p>
  </div>
);

const PermissionsByFacebook = () => (
  <div className="mb-5">
    <h3>Facebook permissions asked by this Application</h3>
    <p className="text-lg">
      This Application may ask for some Facebook permissions allowing it to perform actions with the User's Facebook
      account and to retrieve information, including Personal Data, from it. This service allows this Application to
      connect with the User's account on the Facebook social network, provided by Facebook Inc.
      <br />
      <br />
      For more information about the following permissions, refer to the{" "}
      <a target="_blank" href="https://developers.facebook.com/docs/facebook-login/permissions" rel="noreferrer">
        Facebook permissions documentation
      </a>{" "}
      and to the{" "}
      <a target="_blank" href="https://www.facebook.com/about/privacy/" rel="noreferrer">
        Facebook privacy policy.
      </a>
      <br />
      <br />
      The permissions asked are the following:
    </p>
    <h4>Basic information</h4>
    <p className="text-lg">
      By default, this includes certain User’s Data such as id, name, picture, gender, and their locale. Certain
      connections of the User, such as the Friends, are also available. If the User has made more of their Data public,
      more information will be available.
    </p>
  </div>
);

const RightsOfUsers = () => (
  <div className="mb-5">
    <h3>The rights of Users</h3>
    <p className="text-lg">
      Users may exercise certain rights regarding their Data processed by the Owner. In particular, Users have the right
      to do the following:
      <ul>
        <li>
          <p>
            <b>Withdraw their consent at any time.</b> Users have the right to withdraw consent where they have
            previously given their consent to the processing of their Personal Data.
          </p>
        </li>
        <li>
          <p>
            <b>Object to processing of their Data.</b> Users have the right to object to the processing of their Data if
            the processing is carried out on a legal basis other than consent. Further details are provided in the
            dedicated section below.
          </p>
        </li>
        <li>
          <p>
            <b>Access their Data.</b> Users have the right to learn if Data is being processed by the Owner, obtain
            disclosure regarding certain aspects of the processing and obtain a copy of the Data undergoing processing.
          </p>
        </li>
        <li>
          <p>
            <b>Verify and seek rectification.</b> Users have the right to verify the accuracy of their Data and ask for
            it to be updated or corrected.
          </p>
        </li>
        <li>
          <p>
            <b>Restrict the processing of their Data.</b> Users have the right, under certain circumstances, to restrict
            the processing of their Data. In this case, the Owner will not process their Data for any purpose other than
            storing it.
          </p>
        </li>
        <li>
          <p>
            <b>Have their Personal Data deleted or otherwise removed.</b> Users have the right, under certain
            circumstances, to obtain the erasure of their Data from the Owner.
          </p>
        </li>
        <li>
          <p>
            <b>Receive their Data and have it transferred to another controller.</b> Users have the right to receive
            their Data in a structured, commonly used and machine readable format and, if technically feasible, to have
            it transmitted to another controller without any hindrance. This provision is applicable provided that the
            Data is processed by automated means and that the processing is based on the User's consent, on a contract
            which the User is part of or on pre-contractual obligations thereof.
          </p>
        </li>
        <li>
          <p>
            <b>Lodge a complaint.</b> Users have the right to bring a claim before their competent data protection
            authority.
          </p>
        </li>
      </ul>
    </p>
    <h4>Details about the right to object to processing</h4>
    <p className="text-lg">
      Where Personal Data is processed for a public interest, in the exercise of an official authority vested in the
      Owner or for the purposes of the legitimate interests pursued by the Owner, Users may object to such processing by
      providing a ground related to their particular situation to justify the objection. Users must know that, however,
      should their Personal Data be processed for direct marketing purposes, they can object to that processing at any
      time without providing any justification. To learn, whether the Owner is processing Personal Data for direct
      marketing purposes, Users may refer to the relevant sections of this document.
    </p>
    <h4>How to exercise these rights</h4>
    <p className="text-lg">
      Any requests to exercise User rights can be directed to the Owner through the contact details provided in this
      document. These requests can be exercised free of charge and will be addressed by the Owner as early as possible
      and always within one month.
    </p>
  </div>
);

const AdditionalInfo = () => (
  <div className="mb-5">
    <h3>Additional information about Data collection and processing</h3>
    <h4>Legal action</h4>
    <p className="text-lg">
      The User's Personal Data may be used for legal purposes by the Owner in Court or in the stages leading to possible
      legal action arising from improper use of this Application or the related Services. The User declares to be aware
      that the Owner may be required to reveal personal data upon request of public authorities.
    </p>
    <h4>Additional information about User's Personal Data</h4>
    <p className="text-lg">
      In addition to the information contained in this privacy policy, this Application may provide the User with
      additional and contextual information concerning particular Services or the collection and processing of Personal
      Data upon request.
    </p>
    <h4>System logs and maintenance</h4>
    <p className="text-lg">
      For operation and maintenance purposes, this Application and any third-party services may collect files that
      record interaction with this Application (System logs) use other Personal Data (such as the IP Address) for this
      purpose.
    </p>
    <h4>Information not contained in this policy</h4>
    <p className="text-lg">
      More details concerning the collection or processing of Personal Data may be requested from the Owner at any time.
      Please see the contact information at the beginning of this document.
    </p>
    <h4>How “Do Not Track” requests are handled</h4>
    <p className="text-lg">
      This Application does not support “Do Not Track” requests. To determine whether any of the third-party services it
      uses honor the “Do Not Track” requests, please read their privacy policies.
    </p>
    <h4>Changes to this privacy policy</h4>
    <p className="text-lg">
      The Owner reserves the right to make changes to this privacy policy at any time by notifying its Users on this
      page and possibly within this Application and/or - as far as technically and legally feasible - sending a notice
      to Users via any contact information available to the Owner. It is strongly recommended to check this page often,
      referring to the date of the last modification listed at the bottom.
      <br />
      <br />
      Should the changes affect processing activities performed on the basis of the User’s consent, the Owner shall
      collect new consent from the User, where required.
    </p>
  </div>
);

const DefinitionsAndLegalRefs = () => (
  <div className="mb-5">
    <h3>Definitions and legal references</h3>
    <h4>Personal Data (or Data)</h4>
    <p className="text-lg">
      Any information that directly, indirectly, or in connection with other information — including a personal
      identification number — allows for the identification or identifiability of a natural person.
    </p>
    <h4>Usage Data</h4>
    <p className="text-lg">
      Information collected automatically through this Application (or third-party services employed in this
      Application), which can include: the IP addresses or domain names of the computers utilized by the Users who use
      this Application, the URI addresses (Uniform Resource Identifier), the time of the request, the method utilized to
      submit the request to the server, the size of the file received in response, the numerical code indicating the
      status of the server's answer (successful outcome, error, etc.), the country of origin, the features of the
      browser and the operating system utilized by the User, the various time details per visit (e.g., the time spent on
      each page within the Application) and the details about the path followed within the Application with special
      reference to the sequence of pages visited, and other parameters about the device operating system and/or the
      User's IT environment.
    </p>
    <h4>User</h4>
    <p className="text-lg">
      The individual using this Application who, unless otherwise specified, coincides with the Data Subject.
    </p>
    <h4>Data Subject</h4>
    <p className="text-lg">The natural person to whom the Personal Data refers.</p>
    <h4>Data Processor (or Data Supervisor)</h4>
    <p className="text-lg">
      The natural or legal person, public authority, agency or other body which processes Personal Data on behalf of the
      Controller, as described in this privacy policy.
    </p>
    <h4>Data Controller (or Owner)</h4>
    <p className="text-lg">
      The natural or legal person, public authority, agency or other body which, alone or jointly with others,
      determines the purposes and means of the processing of Personal Data, including the security measures concerning
      the operation and use of this Application. The Data Controller, unless otherwise specified, is the Owner of this
      Application.
    </p>
    <h4>This Application</h4>
    <p className="text-lg">The means by which the Personal Data of the User is collected and processed.</p>
    <h4>Service</h4>
    <p className="text-lg">
      The service provided by this Application as described in the relative terms (if available) and on this
      site/application. European Union (or EU)
    </p>
    <h4>European Union (or EU)</h4>
    <p className="text-lg">
      Unless otherwise specified, all references made within this document to the European Union include all current
      member states to the European Union and the European Economic Area.
    </p>
    <h4>Legal information</h4>
    <p className="text-lg">
      This privacy statement has been prepared based on provisions of multiple legislations, including Art. 13/14 of
      Regulation (EU) 2016/679 (General Data Protection Regulation).
      <br />
      <br />
      This privacy policy relates solely to this Application, if not stated otherwise within this document.
    </p>
  </div>
);

const Privacy = () => (
  <React.Fragment>
    <Helmet title="Privacy policy" />
    <Container fluid className="p-0">
      <Row>
        <Col>
          <h1>Privacy policy</h1>
          <hr className="my-4" />
          <Intro />
          <TypesOfData />
          <ModeAndPlaceOfDataProcessing />
          <PurposeOfProcessing />
          <PermissionsByFacebook />
          <RightsOfUsers />
          <AdditionalInfo />
          <DefinitionsAndLegalRefs />
        </Col>
      </Row>
    </Container>
  </React.Fragment>
);

export default Privacy;
