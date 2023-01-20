/* eslint-disable */
import { IPersonaProps } from "@fluentui/react";
import * as React from "react"; 
import { PeoplePicker, PrincipalType } from "../../../common/components/PeoplePicker";
import AppContext from "../../../common/config/app-context.config";

const PeoplePickerExample: React.FunctionComponent<{}> = (props) => {

    const [defaultUsers, setDefaultUser] = React.useState<IPersonaProps[]>([]);

    React.useEffect(() => {
        const currrentContext = AppContext.getInstance();
        const user = currrentContext.context.pageContext.user;
        setDefaultUser([{
            text: user.displayName,
            secondaryText: user.email,
            tertiaryText: user.loginName
        } as IPersonaProps]); 
    }, []);

    return (
        <>
            <section>
                <h3>People Picker Examples</h3> <hr />
                <PeoplePicker
                    label="People Picker (Normal Type)"
                    principalTypes={[PrincipalType.User]}
                    peoplePickerType="Normal"
                    placeholder="Enter Last Name, First Name to filter the user"
                    required={true}
                    showSecondaryText={false}
                    personSelectionLimit={5}
                    disabled={false}
                    readOnly={false}
                    onPeopleSelectChange={async (users) => {
                        console.log(users);
                    }}
                ></PeoplePicker>

                {/* Default User */}
                <PeoplePicker
                    label="People Picker (Normal Type, Default Value)"
                    principalTypes={[PrincipalType.User]}
                    defaultSelectedUsers={defaultUsers}
                    peoplePickerType="Normal"
                    placeholder="Enter Last Name, First Name to filter the user"
                    required={true}
                    showSecondaryText={false} 
                    disabled={false}
                    readOnly={false}
                    onPeopleSelectChange={async (users) => {
                        console.log(users);
                    }}
                ></PeoplePicker>

                  {/* With Secondary text */}
                  <PeoplePicker
                    label="People Picker (Compact Type, Default Value, with Secondary text)" 
                    defaultSelectedUsers={defaultUsers}  
                    showSecondaryText={true}  
                    onPeopleSelectChange={async (users) => {
                        console.log(users);
                    }}
                ></PeoplePicker>
            </section>
        </>
    );
};

export default PeoplePickerExample;
