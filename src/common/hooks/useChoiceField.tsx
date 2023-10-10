/* eslint-disable */
import {
  ChoiceFieldService,
  type ChoiceFieldOption,
} from "@common/services/ChoiceFieldService";
import { useState, useEffect } from "react";

const { getChoiceFieldOptions } = ChoiceFieldService();

export default function useChoiceField(listName: string, fieldName: string) {
  const [options, setOptions] = useState<ChoiceFieldOption[]>([]);

  useEffect(() => {
    if (listName && fieldName) {
      const choices = getChoiceFieldOptions(listName, fieldName);
      choices.then((res) => setOptions(res)).catch((err) => console.log(err));
    }
  }, [listName, fieldName]);

  return options;
}
