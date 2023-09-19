/* eslint-disable */
import {
  ChoiceFieldService, 
} from "@common/services/ChoiceFieldService";
import { DropdownOption } from "@prt-ts/fluent-formik";
import { useState, useEffect } from "react";

const { getChoiceFieldOptions } = ChoiceFieldService();

export default function useChoiceField(listName: string, fieldName: string) {
  const [options, setOptions] = useState<DropdownOption[]>([]);

  useEffect(() => {
    if (listName && fieldName) {
      const choices = getChoiceFieldOptions(listName, fieldName);
      choices.then((res) => setOptions(res)).catch((err) => console.log(err));
    }
  }, [listName, fieldName]);

  return options;
}
