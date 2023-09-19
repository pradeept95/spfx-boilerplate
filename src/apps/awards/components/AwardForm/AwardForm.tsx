/* eslint-disable */
import * as React from "react";
import * as Yup from "yup";
import { Form, Formik, FormikProps } from "formik";
import {
  FocusConnectedError,
  Input,
  Dropdown,
  RadioGroup,
  Textarea,
  RichInput,
} from "@prt-ts/fluent-formik";
import type { DropdownOption } from "@prt-ts/fluent-formik";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableCellLayout,
  TableHeader,
  TableHeaderCell,
  TableRow,
  makeStyles,
  shorthands,
} from "@fluentui/react-components";
import { Save20Filled, DeleteRegular, AddRegular } from "@fluentui/react-icons"; 
import { useAwardStore } from "@app/awards/stores";
import { Nominee } from "@app/awards/shared/types";
import { PeopleInput } from "@common/components/Forms/PeopleInputField";
import AppContext from "@common/root/app-context";
import { UserService } from "@common/services/UserService";
import { UserInfo } from "@common/components/PeoplePicker/PeoplePickerTypes";
import { POMUserService } from "@common/services/POMUserService";
import { InfoLabel } from "@fluentui/react-components/unstable";
import { Col, Row } from "react-grid-system";

// import { unstable_usePrompt as usePrompt } from "react-router-dom";

export type ContractFormType = {
  nominator: any[];
  nominee: Nominee[];

  awardCategory: DropdownOption[];
  awardType: DropdownOption[];
};

export type ContractFormProps = {
  id: number;
  mode: "new" | "edit" | "view";
  onCancel: () => void;
};

const selectArraySchema = Yup.array().of(
  Yup.object({
    value: Yup.string().required("Value is required"),
    label: Yup.string().required("Label is required"),
  })
);

const userSchema = Yup.array().of(
  Yup.object({
    id: Yup.number(),
    title: Yup.string(),
    email: Yup.string(),
    userName: Yup.string(),
  })
);

const validationSchema = Yup.object().shape({
  nominator: userSchema.min(1, "Nominator is required"),
  contractNumber: Yup.string().required("Contract Number is required"),
  name: Yup.string().required("Contract Name is required"),
  awardCategory: selectArraySchema.min(1, "Award Category is required"),
  awardType: selectArraySchema.min(1, "Award Type is required"),
});

const useFormStyle = makeStyles({
  nomineeInputCell: {
    width: "200px",
  },
  rowInput: {
    minWidth: "10px",
    width: "100%",
  },
  actionCell: {
    width: "50px",
  },
  nomineeRowActions: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    ...shorthands.gap("5px"),
  },
});

const currentContext = AppContext.getInstance();
const { getUserDetails } = POMUserService();

const { ensureUser } = UserService();
export const AwardForm: React.FC<ContractFormProps> = (props) => {
  //   const { initialValue, validationSchema } = useContractFormSchema();
  //   const { pageTitle, handleFormSubmit } = useContractForm(props);
  const { id, mode, onCancel } = props;

  console.log("ContractForm: id: ", id);

  const handleFormSubmit = () => {
    console.log("ContractForm: handleFormSubmit");
  };

  const classes = useFormStyle();

  return (
    <>
      <Formik<ContractFormType>
        initialValues={{
          nominator: [],
          awardCategory: [],
          awardType: [],
          nominee: [
            {
              id: 0,
              key: "",
              name: "",
              title: "",
              firstName: "",
              lastName: "",
              email: "",
              userName: "",
              division: "",
              divisionId: 0,
              office: "",
              supervisor: "",
              supervisorEmail: "",
              supervisorId: 0,
              NEDId: "",
              SACCode: "",
              employeeType: "",
              user: [],
            },
          ],
        }}
        validationSchema={validationSchema}
        onSubmit={handleFormSubmit}
        onReset={onCancel}
      >
        {(fProps: FormikProps<ContractFormType>) => {
          const { values, errors, isSubmitting, handleReset, setFieldValue } =
            fProps;

          const awardCategories = useAwardStore(
            (state) => state.awardCategories
          );

          const categoryOptions = React.useMemo(() => {
            return awardCategories?.data?.map(
              (c) =>
                ({
                  value: c.id?.toString(),
                  label: c.title,
                  // meta: c,
                } as DropdownOption)
            );
          }, [awardCategories]);

          React.useEffect(() => {
            const username =
              currentContext?.context?.pageContext?.user?.loginName;

            if (!username) {
              return null;
            }

            (async () => {
              const user = await ensureUser(username);

              const currentUser = {
                id: user.Id,
                title: user.Title,
                email: user.Email,
                userName: user.LoginName,
                type: "user",
              } as UserInfo;

              setFieldValue("nominator", [currentUser]);
            })();
          }, []);

          const handleAddNominee = (index: number) => {
            console.log("handleAddNominee", index);
            setFieldValue(`nominee.[${index}].key`, index.toString());
            setFieldValue(`nominee.[${index}].id`, "");
            setFieldValue(`nominee.[${index}].title`, "");
            setFieldValue(`nominee.[${index}].email`, "");
            setFieldValue(`nominee.[${index}].userName`, "");
            setFieldValue(`nominee.[${index}].supervisor`, "");
          };

          const handleRemoveRemove = (index: number) => {
            console.log("handleRemoveRemove", index);
            const nominee = [...values.nominee];
            nominee.splice(index, 1);
            setFieldValue("nominee", nominee);
          };

          //   const { isValidRequest } = useContractFormFields(fProps, props);
          // usePrompt({
          //   when: dirty,
          //   message:
          //     "You have unsaved changes. Are you sure you want to leave?",
          // });

          const handleSetNomineeDetails = React.useCallback(
            async (users: UserInfo[], index: number) => {
              const user = users[0] as UserInfo;
              if (user) {
                const userDetails = await getUserDetails(
                  user.username?.split("@")[0]
                );

                setFieldValue(`nominee.[${index}]`, {
                  id: user.id,
                  key: userDetails?.NedId,
                  name: user.title,
                  title: userDetails?.Title,
                  firstName: userDetails?.FirstName,
                  lastName: userDetails?.LastName,
                  email: userDetails?.Email,
                  userName: userDetails?.Username,
                  division: userDetails?.Division,

                  divisionId: 0,
                  office: userDetails?.OrganizationPath?.split(" ")?.join("/"),
                  supervisor: [],
                  NEDId: userDetails?.NedId,
                  SACCode: userDetails?.SACCode,
                  employeeType: userDetails?.Classification,
                  userInfo: users,
                });

                const su = await ensureUser(
                  `${userDetails?.Supervisor?.Username}@nih.gov`
                );

                const supervisorUser: UserInfo = {
                  id: su.Id,
                  title: su.Title,
                  email: su.Email,
                  userName: su.LoginName,
                  type: "user",
                } as UserInfo;

                // set supervisor info if available
                if (supervisorUser) {
                  setFieldValue(`nominee.[${index}].supervisor`, [
                    supervisorUser,
                  ]);
                }
              }
            },
            []
          );

          return (
            <Form>
              <FocusConnectedError />

              <Row>
                <Col md={6} sm={12}>
                  <PeopleInput
                    name="nominator"
                    label="Nominator"
                    placeholder="Search Nominator"
                    personSelectionLimit={10}
                    pickerType="user-and-group"
                    required={true}
                  />
                </Col>
                <Col md={6} sm={12}>
                  <Input
                    name="additionalNominator"
                    label="Additional Nominator (If Any)"
                    placeholder="Please specify if there is more than one nominator or a nominee from other IC."
                  />
                </Col>
              </Row>

              <Row>
                <Col md={6} sm={12}>
                  <Dropdown
                    name="awardCategory"
                    label="Award Category"
                    placeholder="Select Award Category"
                    options={categoryOptions}
                  />
                </Col>
                <Col md={6} sm={12}>
                  <Dropdown
                    name="awardType"
                    label="Award Type"
                    placeholder="Select Award Type"
                    options={[
                      {
                        value: "1",
                        label: "Individual",
                      },
                      {
                        value: "2",
                        label: "Group",
                      },
                    ] as DropdownOption[]}
                  />
                </Col>
              </Row>

              <Row>
                <Col>
                  {(values.awardType || [])?.[0]?.value == "2" && (
                    <>
                      <Input
                        name="groupName"
                        label="Group Name"
                        placeholder="Enter Group Name"
                        required={true}
                        hint={<>Enter the name of the group</>}
                      />
                    </>
                  )}
                </Col>
              </Row>

              <Row>
                <Col>
                  <Table
                    size="extra-small"
                    aria-label="Table with extra-small size"
                  >
                    <TableHeader>
                      <TableRow>
                        <TableHeaderCell
                          key={"Nominee"}
                          className={classes.nomineeInputCell}
                        >
                          <InfoLabel required={true} size="small">
                            <strong>Nominee</strong>
                          </InfoLabel>
                        </TableHeaderCell>
                        <TableHeaderCell key={"Title"}>
                          <InfoLabel required={true} size="small">
                            <strong>Job Title</strong>
                          </InfoLabel>
                        </TableHeaderCell>
                        <TableHeaderCell key={"Supervisor"}>
                          <InfoLabel required={true} size="small">
                            <strong>Supervisor</strong>
                          </InfoLabel>
                        </TableHeaderCell>
                        <TableHeaderCell key={"Division"}>
                          <InfoLabel required={true} size="small">
                            <strong>Division</strong>
                          </InfoLabel>
                        </TableHeaderCell>
                        <TableHeaderCell key={"Department"}>
                          <InfoLabel required={true} size="small">
                            <strong>IC-Office/Branch/Lab</strong>
                          </InfoLabel>
                        </TableHeaderCell>
                        <TableHeaderCell key={"EmployeeType"}>
                          <InfoLabel required={true} size="small">
                            <strong>Employee Type </strong>
                          </InfoLabel>
                        </TableHeaderCell>
                        <TableHeaderCell
                          key={"Actions"}
                          className={classes.actionCell}
                        ></TableHeaderCell>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {values.nominee.map((item, index) => (
                        <TableRow key={index}>
                          <TableCell className={classes.nomineeInputCell}>
                            <TableCellLayout>
                              <PeopleInput
                                key={`nominee.[${index}].NEDId`}
                                name={`nominee.[${index}].userInfo`}
                                placeholder="Search Nominee"
                                onChange={(user) =>
                                  handleSetNomineeDetails(user, index)
                                }
                                className={classes.rowInput}
                              />
                            </TableCellLayout>
                          </TableCell>
                          <TableCell>
                            <Input
                              name={`nominee.[${index}].title`}
                              placeholder="Title"
                              className={classes.rowInput}
                            />
                          </TableCell>
                          <TableCell>
                            <PeopleInput
                              name={`nominee.[${index}].supervisor`}
                              placeholder="Search Supervisor"
                              className={classes.rowInput}
                            />
                          </TableCell>
                          <TableCell>
                            <Input
                              name={`nominee.[${index}].division`}
                              placeholder="Division"
                              className={classes.rowInput}
                            />
                          </TableCell>
                          <TableCell>
                            <Input
                              name={`nominee.[${index}].office`}
                              placeholder="office"
                              className={classes.rowInput}
                              readOnly={true}
                            />
                          </TableCell>

                          <TableCell>
                            <Input
                              name={`nominee.[${index}].employeeType`}
                              placeholder="Employee Type"
                              className={classes.rowInput}
                              readOnly={true}
                            />
                          </TableCell>

                          <TableCell role="gridcell">
                            <TableCellLayout>
                              <span className={classes.nomineeRowActions}>
                                <Button
                                  icon={<DeleteRegular />}
                                  aria-label="Delete"
                                  onClick={() =>
                                    index == 0 && values.nominee.length <= 1
                                      ? undefined
                                      : handleRemoveRemove(index)
                                  }
                                  size="small"
                                />
                                {index == values.nominee.length - 1 ? (
                                  <Button
                                    icon={<AddRegular />}
                                    aria-label="Add"
                                    onClick={() => {
                                      handleAddNominee(
                                        values?.nominee?.length ?? 0
                                      );
                                    }}
                                    size="small"
                                    appearance="primary"
                                  />
                                ) : (
                                  <></>
                                )}
                              </span>
                            </TableCellLayout>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </Col>
              </Row>

              <Row>
                <Col>
                  <RadioGroup
                    name="radio"
                    required={true}
                    label="The project/accomplishment has been completed and/or has been implemented within the previous 12 months"
                    layout="horizontal"
                    options={[
                      {
                        value: "1",
                        label: "Yes",
                      },
                      {
                        value: "2",
                        label: "No",
                      },
                      {
                        value: "3",
                        label: "Uncertain",
                      },
                    ]}
                  />
                </Col>
              </Row>

              <RadioGroup
                name="radio2"
                required={true}
                label="The nomination meets the awards criteria for the category selected (see Award Categories & Description above)"
                layout="horizontal"
                options={[
                  {
                    value: "1",
                    label: "Yes",
                  },
                  {
                    value: "2",
                    label: "No",
                  },
                  {
                    value: "3",
                    label: "Uncertain",
                  },
                ]}
              />

              <Input
                name="name"
                label="Award Citation"
                size="medium"
                placeholder="Award Citation"
                required={true}
              />

              <RichInput
                name="justification"
                label="Narrative Justification"
                required={true}
              />

              <Textarea name="comments" label="Comments (Optional)" />

              <Button
                type="submit"
                appearance="primary"
                disabled={mode == "view" || isSubmitting}
                icon={<Save20Filled />}
              >
                {mode === "new" ? "Submit Nomination" : "Update Nomination"}
              </Button>
              <Button
                type="button"
                disabled={mode == "view" || isSubmitting}
                icon={<Save20Filled />}
              >
                {mode === "new" ? "Save as Draft" : "Update Draft"}
              </Button>
              <Button
                type="button"
                appearance="secondary"
                disabled={isSubmitting}
                onClick={handleReset}
              >
                {"Cancel"}
              </Button>

              <pre>{JSON.stringify(values, null, 2)}</pre>
              <pre>{JSON.stringify(errors, null, 2)}</pre>

              {/* {currentContext?.siteSettings?.enableDebugMode ? (
                <pre>{JSON.stringify(values, null, 2)}</pre>
              ) : (
                <></>
              )} */}
            </Form>
          );
        }}
      </Formik>
    </>
  );
};
