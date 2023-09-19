/* eslint-disable */
import { TrackService } from "@common/services/TrackService";
import * as React from "react";
import { useLocation } from "react-router-dom"; 

const { trackActivity } = TrackService();
export const useTrackPageActivity = () => {
  const location = useLocation();

  React.useEffect(() => {
    trackActivity("Page Navigation", "page", location);
  }, [location]);

  return trackActivity;
};
