/* eslint-disable */
import * as React from "react"; 
import AppContext from "../../../common/config/app-context.config";
import { useAlert } from "../../../common/hooks/useAlert";

const currentContext = AppContext.getInstance();

const NotifyExample: React.FunctionComponent<{}> = (props) => {

    const { success, error, info, warning } = useAlert();
    
    const admins = currentContext.accessGroupUsers?.SomeOtherRole1;  
    console.log(admins);

    const notify = () => {
        success("Hello, I am Success");
        info("I am Info");
        warning("I am Warning");
        error("I am Error");
    };

    return (
        <>
            <section>
                <h3>Notify/Alert Example</h3> <hr />
                <button onClick={notify}>Alert All!</button>
                <button onClick={() => success("Hello, I am Success")}>Alert Success!</button>
                <button onClick={() => error("I am Error")}>Alert Error!</button>
            </section>
        </>
    );
};

export default NotifyExample;
