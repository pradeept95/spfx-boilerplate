/* eslint-disable */
import {
  ChoiceFieldService,
  type ChoiceFieldOption,
} from "@common/services/ChoiceFieldService";
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
  const [options, setOptions] = useState<ChoiceFieldOption[]>([]);

  useEffect(() => {
    if (listName) {
      const choices = getChoiceListOptions(listName, config);
      choices.then((res) => setOptions(res)).catch((err) => console.log(err));
    }
  }, [listName]);

  return options;
}
