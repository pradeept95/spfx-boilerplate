/* eslint-disable */
import {
  ChoiceFieldService, 
} from "@common/services/ChoiceFieldService";
import { DropdownOption } from "@prt-ts/fluent-formik";
import { useState, useEffect } from "react";

const { getChoiceListOptions } = ChoiceFieldService();

export default function useChoiceList(
  listName: string,
  config: {
    valueField: string;
    labelField: string;
    filterContext?: string;
  }
) {
  const [options, setOptions] = useState<DropdownOption[]>([]);

  useEffect(() => {
    if (listName) {
      const choices = getChoiceListOptions(listName, config);
      choices.then((res) => setOptions(res)).catch((err) => console.log(err));
    }
  }, [listName]);

  return options;
}
