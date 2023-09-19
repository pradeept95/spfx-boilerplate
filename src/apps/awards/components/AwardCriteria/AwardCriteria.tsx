/* eslint-disable  */
import * as React from "react";
import { useAwardStore } from "@app/awards/stores";
import { Accordion, AccordionHeader, AccordionItem, AccordionPanel, AccordionToggleEventHandler, Body1Stronger, Divider, Subtitle2Stronger, makeStyles, shorthands } from "@fluentui/react-components";
import { AwardCategory } from "@app/awards/shared/types";

export const AwardCriteria: React.FC = () => {
  const awardCategories = useAwardStore((state) => state.awardCategories);
  const activeCategoryId = useAwardStore((state) => state.activeCategoryId);
  const updateCategory = useAwardStore((state) => state.updateCategory);

  const handleToggle: AccordionToggleEventHandler<string> = (event, data) => {
    console.log("handleToggle", data);
    updateCategory(activeCategoryId === +data.value ? 0 : +data.value);
  };

  const classes = useStyles();

  return (
    <Accordion openItems={[activeCategoryId]} onToggle={handleToggle}>
      {awardCategories.data.map((awardCategory) => (
        <>
          <AccordionItem
            key={awardCategory?.categoryHeader}
            value={awardCategory?.id}
          >
            <AccordionHeader>
              <Subtitle2Stronger>{awardCategory?.title}</Subtitle2Stronger>
            </AccordionHeader>
            <AccordionPanel>
              <div className={classes.details}>
                <AwardCriteriaItem {...awardCategory} />
              </div>
            </AccordionPanel>
          </AccordionItem>
        </>
      ))}
    </Accordion>
  );
};

export const AwardCriteriaItem: React.FC<AwardCategory> = ({
  categoryHeader,
  categoryDetails,
}) => {
  return (
    <>
      <Body1Stronger>{categoryHeader}</Body1Stronger>
      <Divider />
      <span
        dangerouslySetInnerHTML={{
          __html: categoryDetails,
        }}
      ></span>
    </>
  );
};

const useStyles = makeStyles({
  details: {
    ...shorthands.padding("0px", "0px", "0px", "25px")
  },
});
