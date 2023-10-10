/* eslint-disable  */
import { getSP } from "@common/pnp";

export type ChoiceFieldOption = {
  value: string;
  label: string;
};

export const ChoiceFieldService = () => {
  (async () => {})();

  const getChoiceFieldOptions = async (
    listName: string,
    fieldName: string
  ): Promise<ChoiceFieldOption[]> => {
    return new Promise(async (resolve, reject) => {
      try {
        const sp = await getSP();
        const field = await sp.web.lists
          .getByTitle(listName)
          .fields.getByTitle(fieldName)
          .select("Choices")();
        const choices = field.Choices;
        const options = choices.map((choice) => {
          return {
            value: choice,
            label: choice,
          };
        });
        resolve(options);
      } catch (error) {
        reject(error);
      }
    });
  };

  const getChoiceListOptions = async (
    listName: string,
    config: {
      valueField: string;
      labelField: string;
      filterContext?: string;
    }
  ): Promise<ChoiceFieldOption[]> => {
    return new Promise(async (resolve, reject) => {
      try {
        const sp = await getSP();
        const listItems = await sp.web.lists
          .getByTitle(listName)
          .items.filter(config.filterContext || "")
          .select([config.valueField, config.labelField]?.join(", "))();
        const options = listItems.map((choice) => {
          return {
            value: choice[config.valueField],
            label: choice[config.labelField],
          };
        });
        resolve(options);
      } catch (error) {
        reject(error);
      }
    });
  };

  return {
    getChoiceFieldOptions,
    getChoiceListOptions,
  } as const;
};
